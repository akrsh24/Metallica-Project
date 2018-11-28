const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

var schema = mongoose.Schema;

var tradeSchema = new schema({
    
    tdate: {
        type: Date,
        required: true,
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

tradeSchema.plugin(AutoIncrement, {inc_field: 'id'});
var Model = mongoose.model('Trade', tradeSchema);
export default Model;