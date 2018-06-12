"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
const validators_1 = require("../common/validators");
const enviroment_1 = require("../common/enviroment");
const userSchema = new mongoose_1.Schema({
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
        enum: ['Masculino', 'Feminino', 'Outro']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid cpf ({VALUE})'
        }
    }
});
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        bcrypt
            .hash(user.password.toString(), enviroment_1.env.security.saltRounds)
            .then(hash => {
            user.password = hash;
            next();
        })
            .catch(err => next(err));
    }
});
exports.User = mongoose_1.model('User', userSchema);
//# sourceMappingURL=users.model.js.map