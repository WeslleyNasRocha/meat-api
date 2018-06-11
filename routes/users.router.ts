import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';
import { User } from '../models/users.model';
import { Router } from '../common/router';

class UsersRouter extends Router {
  constructor() {
    super();
    this.on('beforeRender', document => {
      document.password = undefined;
    });
  }

  applyRoutes(application: restify.Server) {
    application.get('/users', (req, res, next) => {
      User.find()
        .then(this.render(res, next))
        .catch(next);
    });

    application.get('/users/:id', (req, res, next) => {
      User.findById(req.params.id)
        .then(this.render(res, next))
        .catch(next);
    });

    application.post('/users', (req, res, next) => {
      let user = new User(req.body);
      user
        .save()
        .then(this.render(res, next))
        .catch(next);
    });

    application.put('/users/:id', (req, res, next) => {
      User.update({ _id: req.params.id }, req.body, { overwrite: true })
        .exec()
        .then(result => {
          if (result.n) {
            return User.findById(req.params.id);
          } else {
            throw new NotFoundError('Documento não encontrado');
          }
        })
        .then(this.render(res, next))
        .catch(next);
    });

    application.patch('/users/:id', (req, res, next) => {
      User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .exec()
        .then(this.render(res, next))
        .catch(next);
    });

    application.del('/users/:id', (req, res, next) => {
      User.remove({ _id: req.params.id })
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
    });
  }
}

export const usersRouter = new UsersRouter();
