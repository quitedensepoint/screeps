const HarvestSource = function(sourceArg) {
    const source = sourceArg;

    const closestSpawn = (function(source, spawns) {
        return spawns.filter(function(spawn) {
            return spawn.room.name === source.room.name;
        }).sort(function(spawnA, spawnB) {
            const nextCloser = PathFinder.search(source, spawnA).cost > PathFinder.search(source, closestSpawn).cost;
            if (nextCloser) {
                return 1;
            }
            return 0; 
        })[0];
    })(source, Object.values(Game.spawns));

    const dropoffZone = (function(source) {
        // Nearest dropoff zone
        // TODO: Optimize this since there could be up to 5 storage structures in room.
        return source.room.controller;
    })(source);

    const dropoffDistance = (function(source, dropoffZone) {
        // Calculate distance to nearest dropoff zone
        return PathFinder.search(source.pos, { pos: dropoffZone.pos, range: 1 }).cost;
    })(source, dropoffZone);

    return {
        source,
        closestSpawn,
        dropoffZone,
        dropoffDistance
    }
}

module.exports = HarvestSource;