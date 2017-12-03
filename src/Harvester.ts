const Harvester = function(creepArg, targetHarvestSourceArg) {
    const creep = creepArg;
    const targetHarvestSource = targetHarvestSourceArg;

    // Just use the room controller for storage for now. TODO: Be smart about this.
    const storage = targetHarvestSource;
    const states = {
        IDLE: 0,
        HARVESTING: 1,
        GOING_TO_SOURCE: 2,
        GOING_TO_STORAGE: 3,
        STORING: 4,
        SPAWNING: 5
    };

    const getState = function(states, creep, targetHarvestStorage, storage) {
        if (creep.spawning === true) {
            return states.SPAWNING;
        }

        const availableSpace = creep.carryCapacity - _.sum(creep.carry);
        // If creep carry is not full and the creep is not next to a harvest point, go to a harvest point
        if (creep.availableSpace > 0 && !creep.pos.inRangeTo(targetHarvestSource.pos, 1) === true) {
            return states.GOING_TO_SOURCE;
        }
        // If creep carry is not full and creep is next to harvest point, harvest
        if (creep.availableSpace > 0 && creep.pos.inRangeTo(targetHarvestSource.pos, 1) === true) {
            return states.HARVESTING;
        }
        // If creep carry is not empty and creep is next to storage point, store energy
        if (creep.availableSpace !== creep.carryCapacity && creep.pos.inRangeTo(storage.pos, 1) === true) {
            return states.STORING;
        }
        // If creep carry is full, go to storage point
        if (availableSpace === 0) {
            return states.GOING_TO_STORAGE
        }

        return states.IDLE;
    }

    const run = (function(states, creep, targetHarvestSource, storage) {
        // Update harvester state
        const currentState = getState(states, creep, targetHarvestSource, storage);

        console.log(JSON.stringify(creep));

        switch(currentState) {
            case(states.SPAWNING):
                break;
            case(states.GOING_TO_SOURCE):
                creep.moveTo(targetHarvestSource)
                break
            case(states.GOING_TO_STORAGE):
                creep.moveTo(storage);
                break;
            case(states.HARVESTING):
                creep.harvest(targetHarvestSource);
                break;
            case(states.STORING):
                creep.transfer(storage, RESOURCE_ENERGY);
                break;
            case(states.IDLE):
                creep.moveTo(targetHarvestSource);
        }

        return this;
    })(states, creep, targetHarvestSource, storage).bind(this);

    return {
        run
    }
}

module.exports = Harvester;