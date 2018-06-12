"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("../models/users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get('/users', this.findAll);
        application.get('/users/:id', this.findById);
        application.post('/users', this.save);
        application.put('/users/:id', this.replace);
        application.patch('/users/:id', this.update);
        application.del('/users/:id', this.delete);
    }
}
exports.usersRouter = new UsersRouter();
//# sourceMappingURL=users.router.js.map