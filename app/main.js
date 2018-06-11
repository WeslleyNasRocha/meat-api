"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const routes_1 = require("./routes");
const server = new server_1.Server();
server
    .bootstrap([routes_1.usersRouter, routes_1.locationRouter])
    .then(server => {
    console.log(`Server is listening on: `, server.application.address());
})
    .catch(error => {
    console.log('Server error');
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map