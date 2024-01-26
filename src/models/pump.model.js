import mongoose from 'mongoose';

const PumpSchema = mongoose.Schema({
    type:{type:Number, require:true},
    currentGallonCost:{ type: Number, require:true},
    previousRecordGallon:{ type: Number, require:true},
    currentRecordGallon:{type:Number, require:true},
    gallonsSold:{type:Number, require:true},
    saleDay:{type:Number, require:true},
    date:{type:Date, require:true}
},
{
    timestamps:true
});

export default mongoose.model('Pumps', PumpSchema);