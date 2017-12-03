const harvestController = require('HarvestController')();

module.exports.loop = function () {
    harvestController.run();
}