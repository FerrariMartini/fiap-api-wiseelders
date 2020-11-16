const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  kalacheCapital: {
    type: String,
    required: true,
  },
  lifeAspect: {
    type: String,
    required: true,
  },
  totalInvest: {
    type: Number,
    required: true,
  },
  enrollQuantity: {
    type: Number,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  cycleQuantity: {
    type: Number,
    required: true,
  },
  attendantQuantity: {
    type: Number,
    required: false,
  },
  allActivityEngaje: {
    type: Number,
    required: false,
  },
  cycles: [
    {
      cycleNumber: {
        type: Number,
        required: true,
      },
      attendantQuantity: {
        type: Number,
        required: true,
      },
      unitaryInvest: {
        type: Number,
        required: true,
      },
      cycleEngaje: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Activity", activitySchema);
