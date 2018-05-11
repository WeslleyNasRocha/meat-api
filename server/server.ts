import * as restify from 'restify';
import { env } from '../common/enviroment';
import { Router } from '../common/router';

export class Server {
  initDB(): any {
    throw new Error('Method not implemented.');
  }
  application: restify.Server;

  initRoutes(routers: Router[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: 'meat-api',
          version: '1.0.0'
        });

        this.application.use(restify.plugins.queryParser());

        // routes
        routers.forEach(router => {
          router.applyRoutes(this.application);
        });

        this.application.listen(env.server.port, () => {
          resolve(this.application);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initDB().then(() => this.initRoutes(routers).then(() => this));
  }
}
