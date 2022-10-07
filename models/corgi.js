import mongoose from "mongoose"

const Schema = mongoose.Schema

const accessorySchema = new Schema({
  name: String,
})

const corgiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    enum: ['Pembroke', 'Cardigan'],
  },
  color: {
    type: String,
    enum: ['Red and White', 'Black and White', 'Tricolor', 'Sable'],
  },
  age: {
    type: Number,
    min: 1,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  accessories: [accessorySchema],
  bio: {
    type: String,
  },
}, {
  timestamps: true
})

const Corgi = mongoose.model('Corgi', corgiSchema)

export {
  Corgi
}