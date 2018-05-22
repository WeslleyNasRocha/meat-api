"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
});
exports.Location = mongoose_1.model('Location', locationSchema);
//# sourceMappingURL=location.model.js.map