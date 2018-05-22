import { Schema, model, Document } from 'mongoose';

export interface Location extends Document {
  latitude: String;
  longitude: String;
}

const locationSchema = new Schema({
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  }
});

export const Location = model<Location>('Location', locationSchema);
