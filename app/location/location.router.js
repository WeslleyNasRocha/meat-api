"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const location_model_1 = require("./location.model");
class LocationRouter extends router_1.Router {
    applyRoutes(application) {
        application.post('/location', (req, res, next) => {
            let location = new location_model_1.Location(req.body);
            location
                .save()
                .then(this.render(res, next))
                .catch(next);
        });
    }
}
exports.locationRouter = new LocationRouter();
//# sourceMappingURL=location.router.js.map