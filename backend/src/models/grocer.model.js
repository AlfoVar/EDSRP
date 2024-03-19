import mongoose from 'mongoose';

const GrocerSchema = new mongoose.Schema ({
    nameGrocer:{ type: String, require:true},
    ccGrocer:{ type: Number, require:true},
});

export default mongoose.model('Grocer', GrocerSchema);