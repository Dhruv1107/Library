const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    year: { type: Number, required: true },
    rentedCount:  { type: Number, default: 0 }, 
    rentedBy: { type: Array, default:[]},
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Catalog', schema);
