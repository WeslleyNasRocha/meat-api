"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const router_1 = require("./router");
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.findAll = (req, res, next) => {
            this.model
                .find()
                .then(this.render(res, next))
                .catch(next);
        };
        this.findById = (req, res, next) => {
            this.model
                .findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        };
        this.save = (req, res, next) => {
            const model = new this.model(req.body);
            model
                .save()
                .then(this.render(res, next))
                .catch(next);
        };
        this.replace = (req, res, next) => {
            this.model
                .update({ _id: req.params.id }, req.body, { overwrite: true })
                .exec()
                .then(result => {
                if (result.n) {
                    return this.model.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            })
                .then(this.render(res, next))
                .catch(next);
        };
        this.update = (req, res, next) => {
            this.model
                .findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
                .exec()
                .then(this.render(res, next))
                .catch(next);
        };
        this.delete = (req, res, next) => {
            this.model
                .remove({ _id: req.params.id })
                .exec()
                .then((cmdResult) => {
                if (cmdResult.result.n) {
                    res.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
                return next();
            })
                .catch(next);
        };
    }
}
exports.ModelRouter = ModelRouter;
//# sourceMappingURL=model-router.js.map