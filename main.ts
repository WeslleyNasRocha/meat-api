import { Server } from './server/server';
import { usersRouter, locationRouter } from './routes';

const server = new Server();
server
  .bootstrap([usersRouter, locationRouter])
  .then(server => {
    console.log(`Server is listening on: `, server.application.address());
  })
  .catch(error => {
    console.log('Server error');
    console.error(error);
    process.exit(1);
  });
