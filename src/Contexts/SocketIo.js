import { io } from "socket.io-client";
import { createContext } from "react";

export const socketContext = createContext();



export const SocketProvider = ({children}) => {
    const socket = io("https://collectios.herokuapp.com/");
    return (
        <socketContext.Provider value={socket}>
            { children}
        </socketContext.Provider>
    )
}