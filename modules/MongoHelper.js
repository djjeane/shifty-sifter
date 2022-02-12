const Points = require('../models/Points.js');
const WheelCooldowns = require('../models/WheelCooldown.js')
const Event = require('../models/Event')
module.exports = {
	async GetAllPoints() {
		var pointsList = [];

		await Points.find({}).then(function (docs) {
			console.log(`${docs}`);
			if (docs == null) {
				console.log('doc was null')
			}
			docs.forEach(doc => {
				pointsList.push({ 'points': doc.points, 'userID': doc.userID });
			});

		});
		return pointsList;
	},
	async GetPoints(id) {

		let pointsVal = 0;
		await Points.findOne({ userID: id }).then(function (doc) {
			if (doc == null) {
				module.exports.CreatePointRecord(id);
				return 0;
			}
			pointsVal = doc.points;

		});
		return pointsVal;
	},
	async CreatePointRecord(id) {
		var newPoints = Points({
			userID: id,
			points: 0
		});

		newPoints.save(function (err) {
			if (err) throw err;

			console.log('Point Record created!');
		});
	},
	async CreatePointRecordAndUpdate(id, AmountToSet) {
		var newPoints = Points({
			userID: id,
			points: Math.abs(AmountToSet)
		});

		newPoints.save(function (err) {
			if (err) throw err;

			console.log('Point Record created and updated!');
		});
	},
	 async GetWheelCooldown(userID2)
	{
		let canSpinTime = Date.now();
		await WheelCooldowns.findOne({ userID: userID2 }).then(function (doc) {
			if (doc == null) {
				client.CreateCooldownRecord(userID2);
				return new Date(canSpinTime);
			}
			canSpinTime = doc.canSpinTime;


		});
		return canSpinTime;
	},
	async CreateCooldownRecord(userID2) {
		var newcooldown = WheelCooldowns({
			userID: userID2,
			canSpinTime: Date.now() + 3600000
		});

		newcooldown.save(function (err) {
			if (err) throw err;

			console.log('New Cooldown Added created!');
		});
	},
	async UpdateCooldown(userID2) {
		await WheelCooldowns.findOne({
			userID: userID2
		}).then(function (doc) {
			if (!doc) 
			{
				client.CreateCooldownRecord(userID2)
				return;
			}
			var newCooldown = Date.now() + 3600000;

			doc.canSpinTime = newCooldown;

			doc.save(function (err) {
				if (err) throw err;;
			});
			console.log('Cooldown record successfully updated!');
		});
	},
	async UpdatePoints(userID2, pointsAdded)
    {
        let pointsVal = -1;
        await Points.findOne({
          userID: userID2
        }).then(function (doc)
        {
          if(!doc)
          {
            client.CreatePointRecordAndUpdate(userID2, pointsAdded)
            return;
          }
          var newTotal = doc.points + pointsAdded;
          if(newTotal < 0) newTotal = 0;
          doc.points = newTotal;
          // console.log(doc.points)
          // console.log(pointsRecord)
          doc.save(function (err)
          {
            if (err) throw err;;
          });
          

          console.log('Point record successfully updated!');
        });}

};