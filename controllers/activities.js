const Actitity = require('../models/activity');

exports.getActivity = (req, res, next) => {
  const { id } = req.params;
  Actitity.findById(id)
    .then((activity) => {
      if (activity) {
        res.status(200).json(activity);
      } else {
        res.status(404).send('Resource not found');
      }
    })
    .catch((err) => res.status(400));
};

exports.getAllActivities = (req, res, next) => {  
  Actitity.find()
    .then((activities) => res.status(200).json(activities))
    .catch((err) => res.status(400));
};

exports.createActivity = (req, res, next) => {
  const { body: data } = req;
  if (!data) {
    res.status(400).send('Bad request');
  }
  const activity = new Actitity(req.body);
  activity
    .save()
    .then((result) => {
      console.log(`Activity ${result.id} created`);
      res.status(201).location(`/activities/${result._id}`).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Bad request');
    });
};

exports.updateActivity = (req, res, next) => {
  const { id } = req.params;
  const { body: data } = req;
  if (!data) {
    res.status(400).send('Bad request');
  }
  Actitity.findByIdAndUpdate(id, data)
    .then((result) => {
      console.log(`Activity ${result.id} updated`);
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Bad request');
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
      res.status(404).send('Resource not found');
    });
};
