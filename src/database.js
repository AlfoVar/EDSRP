import mongoose from 'mongoose';

const URI = 'mongodb://127.0.0.1/EDSRP';

mongoose.connect(URI)
    .then(db => console.log('DB conectada'))
    .catch(err => console.error(err));


export default mongoose;