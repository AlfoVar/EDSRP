import mongoose from 'mongoose';
const {Schema} = mongoose;

const closingSchema = new Schema ({
    grocer:{ type: Schema.Types.ObjectId, ref: 'Grocer'},
    date:{type:date, require:true},
    gas:{ type: Schema.Types.ObjectId, ref: 'closingGas'},
    closingProducts:[{ type: Schema.Types.ObjectId, ref: 'closingProduct'}],
    closingTotalDay:{type:Number, require:true},
    cashValueToday:{type:Number, require:true},
    surplusOfDay:{type:Number, require:true},
});

module.exports = mongoose.model('Closing', closingSchema);