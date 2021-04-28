import * as mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  carname: String,
  name: String,
  bookdate: String
});

const Car = mongoose.model('Car', carSchema);

export default Car;
