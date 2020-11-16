const Actitity = require("../models/activity");

exports.getExecutiveSummary = async (req, res, next) => {
  try {
    const activities = await Actitity.find();

    const allActivitiesInvest = activities.reduce(function (total, actitity) {
      return (total += actitity.totalInvest);
    }, 0);

    const allActivitiesEnroll = activities.reduce((total, actitity) => {
      return (total += actitity.enrollQuantity);
    }, 0);

    let allCycleAttendant = 0;
    activities.forEach((activity) => {
      activity.cycles.forEach((cycle) => {
        allCycleAttendant += cycle.attendantQuantity;
      });
    });

    const dataSend = {
      allActivitiesEnroll,
      allActivitiesInvest,
      allCycleAttendant,
      allEngaje: (allCycleAttendant / allActivitiesEnroll) * 100,
    };

    res.status(200).send(dataSend);
  } catch (error) {
    res.status(500).send();
    console.log(">>>>> ERROR", error);
  }
};
