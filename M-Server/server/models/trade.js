import mongoose from 'mongoose';

var schema = mongoose.Schema;

var tradeSchema = new schema({
    idd: {
        type: Number,
        required: true
    },
    commodity: {
        type: String,
        required: true
    },
    side: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    counterparty: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    }
});
var Model = mongoose.model('Trade', tradeSchema);
export default Model;