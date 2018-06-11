import * as restify from 'restify';
import * as mongoose from 'mongoose';
import { env } from '../common/enviroment';
import { Router } from '../common/router';
import { handleError } from './error.handler';

import { mergePatchBodyParser } from './merge-patch.parser';

export class Server {
  private initDB() {
    (<any>mongoose).Promise = global.Promise;
    return mongoose.connect(env.db.url, { useMongoClient: true });
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
        this.application.use(restify.plugins.bodyParser());
        this.application.use(mergePatchBodyParser);

        // routes
        routers.forEach(router => {
          router.applyRoutes(this.application);
        });

        this.application.listen(env.server.port, () => {
          resolve(this.application);
        });

        this.application.on('restifyError', handleError);
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initDB().then(() => this.initRoutes(routers).then(() => this));
  }
}
