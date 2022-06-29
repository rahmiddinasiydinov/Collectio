import { io } from "socket.io-client";
import { createContext } from "react";

export const socketContext = createContext();
export const SocketProvider = ({children}) => {
    const socket = io("http://localhost:7007");
    return (
        <socketContext.Provider value={socket}>
            { children}
        </socketContext.Provider>
    )
}