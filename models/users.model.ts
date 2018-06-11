import { Schema, model, Document } from 'mongoose';
import { validateCPF } from "../common/validators";

export interface User extends Document {
  name: String;
  email: String;
  password: String;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    select: false,
    required: true,
    maxlength: 30,
    minlength: 6
  },
  gender: {
    type: String,
    required: false,
    enum: ['Masculino', 'Feminino', 'Não Binario', 'Outro']
  },
  cpf:{
    type: String,
    required: false,
    validate:{
      validator: validateCPF,
      message: '{PATH}: Invalid CPF ({VALUE})'
    }
  }
});

export const User = model<User>('User', userSchema);
