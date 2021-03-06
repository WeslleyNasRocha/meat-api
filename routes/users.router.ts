import * as restify from 'restify';
import { ModelRouter } from '../common/model-router';
import { User } from '../models/users.model';

class UsersRouter extends ModelRouter<User> {
  constructor() {
    super(User);
    this.on('beforeRender', document => {
      document.password = undefined;
    });
  }

  public applyRoutes(application: restify.Server) {
    application.get('/users', this.findAll);

    application.get('/users/:id', [this.validateId, this.findById]);

    application.post('/users', this.save);

    application.put('/users/:id', [this.validateId, this.replace]);

    application.patch('/users/:id', [this.validateId, this.update]);

    application.del('/users/:id', [this.validateId, this.delete]);
  }
}

export const usersRouter = new UsersRouter();
