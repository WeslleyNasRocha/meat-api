"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = {
    db: {
        url: process.env.DB_URL ||
            'mongodb://admin:admin@ds117590.mlab.com:17590/meat-api'
    },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10
    },
    server: {
        port: process.env.PORT || 3000
    }
};
//# sourceMappingURL=enviroment.js.map