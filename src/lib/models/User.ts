import mongoose from 'mongoose';

// Check if the model is already defined to prevent overwriting
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use mongoose.models if it exists, otherwise create new model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;