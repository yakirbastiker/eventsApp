const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    info: {type: String, required: true},
    category: {type: String, required: true},
    imgURL: {type: String, required: true},
    id: {type: String}
});

module.exports = mongoose.model('Event', eventSchema);