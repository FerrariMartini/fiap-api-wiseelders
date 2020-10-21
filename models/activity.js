const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    kalacheCapital: {
        type: String,
        required: true
    },    
    lifeAspect: {
        type: String,
        required: true
    },
    totalInvest: {
        type: Number,
        required: true
    },
    enrollQuantity: {
        type: Number,
        required: true
    },
    cycle: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model('Activity', activitySchema);