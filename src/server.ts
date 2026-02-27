import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";
let server:Server;


const startServer=async ()=>{
   try{
     await mongoose.connect(envVars.MONGO_URI)
    console.log("connected to db");
    server=app.listen(5000,()=>{
        console.log("server is listening in port 5000");
    })
   }catch(err){
    console.log(err)
   }
};
startServer();

//server error handling
process.on("unhandlesRejection",(err)=>{
    console.log("unhandled rejection detected ... server shutting down");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
});

//uncaught exception detection
process.on("uncaughtException",(err)=>{
    console.log("uncaught exception detected ... server shutting down");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
});

//signal termination
process.on("SIGINT",()=>{
    console.log("unhandled rejection detected ... server shutting down");
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
});
