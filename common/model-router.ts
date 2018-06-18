import { Document, Model, Types } from 'mongoose';
import { NotFoundError } from 'restify-errors';
import { Router } from './router';

export abstract class ModelRouter<D extends Document> extends Router {
  constructor(protected model: Model<D>) {
    super();
  }

  validateId = (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
      next(new NotFoundError('Document not found'));
    } else {
      next();
    }
  };

  protected findAll = (req, res, next) => {
    this.model
      .find()
      .then(this.renderAll(res, next))
      .catch(next);
  };

  protected findById = (req, res, next) => {
    this.model
      .findById(req.params.id)
      .then(this.render(res, next))
      .catch(next);
  };

  protected save = (req, res, next) => {
    const model = new this.model(req.body);
    model
      .save()
      .then(this.render(res, next))
      .catch(next);
  };

  protected replace = (req, res, next) => {
    this.model
      .update({ _id: req.params.id }, req.body, { overwrite: true })
      .exec()
      .then(result => {
        if (result.n) {
          return this.model.findById(req.params.id);
        } else {
          throw new NotFoundError('Documento não encontrado');
        }
      })
      .then(this.render(res, next))
      .catch(next);
  };

  protected update = (req, res, next) => {
    this.model
      .findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .exec()
      .then(this.render(res, next))
      .catch(next);
  };

  protected delete = (req, res, next) => {
    this.model
      .remove({ _id: req.params.id })
      .exec()
      .then((cmdResult: any) => {
        if (cmdResult.result.n) {
          res.send(204);
        } else {
          throw new NotFoundError('Documento não encontrado');
        }
        return next();
      })
      .catch(next);
  };
}
