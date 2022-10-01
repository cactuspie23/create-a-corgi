import mongoose from "mongoose"

const Schema = mongoose.Schema

const corgiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    enum: ['Pembroke', 'Cargdigan'],
  },
  color: {
    type: String,
    enum: ['Red and White', 'Black and White', 'Tri', 'Blue Merle'],
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
}, {
  timestamps: true
})

const Corgi = mongoose.model('Corgi', corgiSchema)

export {
  Corgi
}