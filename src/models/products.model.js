import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema ({
    nameProduct:{ type: String, require:true},
    idProduct:{ type: Number, require:true},
    currentCost:{ type: Number, require:true},
    description:{ type: String, require:true}
});

export default mongoose.model('Products', ProductsSchema);