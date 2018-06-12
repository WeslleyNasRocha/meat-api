import { Document, model, Schema } from 'mongoose';

// tslint:disable-next-line:interface-name
export interface Location extends Document {
  latitude: string;
  longitude: string;
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
