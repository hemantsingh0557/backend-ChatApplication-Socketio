
import { Server } from "socket.io" ;

export const setupSocket = async(server) => {
    const io = new Server(server) ;
    io.on( "connection" , () => {
        console.log( "a user connected" ) ;
    } );
};