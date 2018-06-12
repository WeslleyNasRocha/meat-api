import { locationRouter, usersRouter } from './routes';
import { Server } from './server/server';

const server = new Server();
server
  .bootstrap([usersRouter, locationRouter])
  .then(serverApp => {
    console.log(`Server is listening on: `, serverApp.application.address());
  })
  .catch(error => {
    console.log('Server error');
    console.error(error);
    process.exit(1);
  });
