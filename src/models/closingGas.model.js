import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const closingGas = new Schema ({
    currentCostGallon:{ type: Number, require:true},
    Pumps: [{ type: Schema.Types.ObjectId, ref: 'Pumps'}],
    stockBeforeGas:{ type: Number, require:true},
    totalGallonsSoldDay:{ type: Number, require:true},
    stockAfterGas:{ type: Number, require:true},
    cashInBoxGas:{ type: Number, require:true}
});

export default mongoose.model('closingGas', closingGas);