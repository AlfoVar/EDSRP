import mongoose from 'mongoose';

const closingGas = new mongoose.Schema ({
    currentCostGallon:{ type: Number, require:true},
    pump: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pump'}],
    stockBeforeGas:{ type: Number, require:true},
    totalGallonsSoldDay:{ type: Number, require:true},
    stockAfterGas:{ type: Number, require:true},
    cashInBoxGas:{ type: Number, require:true}
});

export default mongoose.model('closingGas', closingGas);