
const config = require('./config');
const grpc = require("@grpc/grpc-js");
const resolver = require('./taskResolver');

const server = new grpc.Server();
resolver.configureTaskResolver(server);

server.bindAsync(`${config.api.host}:${config.api.port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Running a Node gRPC server listening on port ${config.api.port}`)
    server.start();
});
