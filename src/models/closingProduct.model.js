import mongoose from 'mongoose';
const {Schema} = mongoose;

const closingProductSchema = new Schema ({
    idProduct:{ type: Schema.Types.ObjectId, ref: 'Products'},
    stockBefore:{ type: Number, require:true},
    soldProducts:{type:Number, require:true},
    stockAfter:{type:Number, require:true},
    cashInBox:{type:Number, require:true}
});

module.exports = mongoose.model('closingProduct', closingProductSchema);