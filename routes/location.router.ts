import * as restify from 'restify';
import { Router } from '../common/router';
import { Location } from '../models/location.model';

class LocationRouter extends Router {
  public applyRoutes(application: restify.Server) {
    application.post('/location', (req, res, next) => {
      const location = new Location(req.body);
      location
        .save()
        .then(this.render(res, next))
        .catch(next);
    });
  }
}

export const locationRouter = new LocationRouter();
