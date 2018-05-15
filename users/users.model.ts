import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  name: String;
  email: String;
  password: String;
}

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  }
});

export const User = model<User>('User', userSchema);
