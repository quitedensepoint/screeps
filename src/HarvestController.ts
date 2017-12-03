import Harvester from "./Harvester";
import HarvestSource from "./HarvestSource";

const HarvestController = function() {
    /*
    Track harvest operations here.
    We want a record of all energy sources in the room as well as the harvesters assigned to them.
    */

    const harvesters = [];

    const harvestSources = Object.values(Game.rooms).filter((room) => {
        return room.controller.my === true;
    }).map((room) => {
        return Object.values(room.find(FIND_SOURCES)).map((source) => {
            return new HarvestSource(source);
        });
    });

    const constructHarvester = (harvestSource) => {
        // Calculate body parts required
        // energy cost = 50(3W + 2ceil(w/50))
        const desiredWorkerParts = Math.ceil(harvestSource.source.energyCapacity / (600 - 2 * harvestSource.dropoffDistance));
        const affordableWorkerParts = Math.floor(harvestSource.source.room.energyAvailable / 152);

        const workerPartsToUse = desiredWorkerParts;

        if (affordableWorkerParts < desiredWorkerParts) {
            workerPartsToUse = affordableWorkerParts;
        }

        const workerParts = Array(workerPartsToUse).fill(WORK);
        const carryParts = Array(Math.ceil(workerParts.length / 50)).fill(CARRY);
        const moveParts = Array(workerParts.length + carryParts.length).fill(MOVE);

        const creep = harvestSource.closestSpawn.spawnCreep([].concat(workerParts, carryParts, moveParts), 'Harvester_'.concat(Date.now().toString()));

        if (typeof(creep) !== "Number") {
            return new Harvester(creep, harvestSource);
        } else {
            return null;
        }
    }

    const run = (function(harvesters, harvestSources) {
        // Find the largest underharvested extraction point and create a new harvester if possible
        const bestSource = harvestSources.sort(function(harvestSourceA, harvestSourceB) {
            if (harvestSourceA.source.energyCapacity > harvestSourceB.source.energyCapacity) {
                return -1;
            } else if (harvestSourceA.source.energyCapacity < harvestSourceB.source.energyCapacity) {
                return 1;
            } else {
                return 0;
            }
        })[0][0];

        const newHarvester = constructHarvester(bestSource);
        
        if(newHarvester !== null) {
            harvesters.push(newHarvester);
        }

        // Run each harvester
        harvesters = harvesters.filter(function(harvester) {
            return typeof(harvester) !== "Number";
        });
        
        harvesters.each(function(harvester) {
            harvester.run();
        });

        return this;
    })(harvesters, harvestSources).bind(this);

    return {
        run
    }
}

export default { HarvestController };