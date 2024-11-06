import { io } from "socket.io-client"

const url = import.meta.env.VITE_ENDPOINT_DEV
export const socket = io(url, {
    transports: ["websocket", "polling"],
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
})
