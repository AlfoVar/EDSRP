import mongoose from 'mongoose';
const {Schema} = mongoose;

const closingProductSchema = new Schema ({
    product:{ type: Schema.Types.ObjectId, ref: 'Products'},
    stockBefore:{ type: Number, require:true},
    soldProducts:{type:Number, require:true},
    stockAfter:{type:Number, require:true},
});

export default mongoose.model('closingProduct', closingProductSchema);