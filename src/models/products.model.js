import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema ({
    nameProduct:{ type: String, require:true},
    idProduct:{ type: String, require:true},
    currentCost:{ type: Number, require:true},
    description:{ type: String, require:true},
    stock:{ type: Number, require:true},
});

export default mongoose.model('Products', ProductsSchema);