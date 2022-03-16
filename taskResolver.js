const PROTO_PATH = "./task.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const Service = require('./taskService');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
    defaults: true
});
const taskProto = grpc.loadPackageDefinition(packageDefinition);

function configureTaskResolver (server) {
    server.addService(taskProto.TaskService.service, {
        getAll: async (call, callback) => {
            let svc = new Service();
            let result = await svc.getTasks();
            callback(null,  {tasks: result.data} );
        },
    
        get: async (call, callback) => {
            let svc = new Service();
            let result = await svc.getTask(call.request.id);
    
            if (result) {
                callback(null, result.data);
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            }
        },
    
        insert: async (call, callback) => {
            let task = call.request;
            let svc = new Service();
            let result = await svc.addTask(task);

            if (result) {
                callback(null, result.data);
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            }
        },
    
        update: async (call, callback) => {    
            let task = call.request;
            let svc = new Service();
            let result = await svc.updateTask(task);

            if (result) {
                callback(null, result.data);
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            }           
        },
    
        remove: async (call, callback) => {
            let task = call.request;
            let svc = new Service();
            let result = await svc.deleteTask(task.id);

            if (result) {
                callback(null, result.data);
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                });
            }  
        }
    });
}  



module.exports =  { configureTaskResolver }