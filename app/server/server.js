"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const enviroment_1 = require("../common/enviroment");
const error_handler_1 = require("./error.handler");
const merge_patch_parser_1 = require("./merge-patch.parser");
class Server {
    initDB() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(enviroment_1.env.db.url, { useMongoClient: true });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                // routes
                routers.forEach(router => {
                    router.applyRoutes(this.application);
                });
                this.application.listen(enviroment_1.env.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', error_handler_1.handleError);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initDB().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map