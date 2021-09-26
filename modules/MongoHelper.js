const Points = require('../models/Points.js');
const WheelCooldowns = require('../models/WheelCooldown.js')

module.exports = {
    async GetAllPoints() {
        var pointsList = [];
        
        await Points.find({}).then(function (docs) {
        if (docs == null) {
            console.log('doc was null')
        }
        docs.forEach(doc => {
            pointsList.push({'points': doc.points, 'userID':doc.userID});
        });

        });
        return pointsList;
    }
};