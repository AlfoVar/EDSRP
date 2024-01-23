import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema ({
    title:{ type: String, require:true},
    description:{ type: String, require:true}
});

export default mongoose.model('Products', ProductsSchema);