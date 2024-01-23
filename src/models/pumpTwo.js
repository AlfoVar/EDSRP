const mongoose = require('mongoose');
const {Schema} = mongoose;

const PumpTwoSchema = new Schema ({
    currentGallonCost:{ type: Number, require:true},
    previousRecordGallon:{ type: Number, require:true},
    currentRecordGallon:{type:Number, require:true},
    gallonsSold:{type:Number, require:true},
    saleDay:{type:Number, require:true},
    date:{type:date, require:true}
});

module.exports = mongoose.model('PumpTwo', PumpTwoSchema);