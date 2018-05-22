"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
        enum: ['Masculino', 'Feminino', 'Não Binario', 'Outro']
    },
    cpf: {
        type: String,
        required: false
    }
});
exports.User = mongoose_1.model('User', userSchema);
//# sourceMappingURL=users.model.js.map