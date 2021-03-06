const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    title: String,
    shortDescription: String,
    description: String,
    icon: String,
    date: String,
    visible: {
        type: Boolean,
        default: true
    },
    order: Number
});

const Category = mongoose.model('zorocategory', schema);

module.exports = Category;
