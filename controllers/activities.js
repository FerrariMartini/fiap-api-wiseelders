const Actitity = require("../models/activity");

exports.getActivity = (req, res, next) => {
  const { id } = req.params;
  Actitity.findById(id)
    .then((activity) => {
      if (activity) {
        res.status(200).json(activity);
      } else {
        res.status(404).send("Resource not found");
      }
    })
    .catch((err) => res.status(400));
};

exports.getAllActivities = async (req, res, next) => {
  try {
    const activities = await Actitity.find();

    //Qtd. total de presentes
    activities.forEach((activity) => {
      let allActivityAttendants = 0;
      activity.cycles.forEach((cycle) => {
        allActivityAttendants += cycle.attendantQuantity;
      });
      activity.attendantQuantity = allActivityAttendants;
    });

    //Engajamento Total (Qtd. Total de presentes / (Qtd. Inscricoes * numenro de ciclos))
    activities.forEach((activity) => {
      activity.allActivityEngaje =
        (activity.attendantQuantity /
          (activity.enrollQuantity * activity.cycleQuantity)) *
        100;
    });

    //Engajamento por ciclo da Atvidade
    activities.forEach((activity) => {
      activity.cycles.forEach((cycle) => {
        cycle.cycleEngaje =
          (cycle.attendantQuantity / activity.enrollQuantity) * 100;
      });
    });

    res.status(200).send(activities);
  } catch (error) {
    console.log(">> Error", error);
    res.status(500).send();
  }
};

exports.createActivity = (req, res, next) => {
  const { body: data } = req;
  if (!data) {
    res.status(400).send("Bad request");
  }

  const { cycleQuantity } = req.body;

  let cycles = [];
  for (let i = 0; i < cycleQuantity; i++) {
    cycles.push({
      cycleNumber: i + 1,
      attendantQuantity: 0,
      unitaryInvest: 0,
      cycleEngaje: 0,
    });
  }

  const activityToSave = {
    ...req.body,
    cycles,
  };

  const activity = new Actitity(activityToSave);
  activity
    .save()
    .then((result) => {
      console.log(`Activity ${result.id} created`);
      res.status(201).location(`/activities/${result._id}`).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Bad request");
    });
};

exports.updateActivity = (req, res, next) => {
  const { id } = req.params;
  const { body: data } = req;
  if (!data) {
    res.status(400).send("Bad request");
  }

  let listCycleUpdated = [];

  Object.entries(data.cyclesUpdated).forEach(([k, v]) => {
    listCycleUpdated.push(v);
  });

  const cycleUpdatedParsed = listCycleUpdated.map((item) => {
    return {
      cycleNumber: parseInt(item.cycleNumber),
      attendantQuantity: parseInt(item.attendantQuantity),
      unitaryInvest: parseFloat(item.unitaryInvest),
    };
  });

  delete data.activity.cycles;

  const dataToSave = {
    ...data.activity,
    cycles: cycleUpdatedParsed,
  };
  Actitity.findByIdAndUpdate(id, dataToSave)
    .then((result) => {
      console.log(`Activity ${result.id} updated`);
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Bad request");
    });
};

exports.deleteActivity = (req, res, next) => {
  const { id } = req.params;
  Actitity.findByIdAndDelete(id)
    .then(() => {
      console.log(`Activity ${id} deleted`);
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Resource not found");
    });
};