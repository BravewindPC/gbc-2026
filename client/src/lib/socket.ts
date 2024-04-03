import { io } from "socket.io-client";

// Type extension for globalThis to recognize our custom property
type GlobalWithSocket = typeof globalThis & { socket?: SocketIOClient.Socket };

const globalSocket = globalThis as GlobalWithSocket;

// Initialize or reuse the socket
export const socket = globalSocket.socket ?? io("ws://localhost:8080", {
  // Socket.IO client options here
});

// Optionally, attach the socket to the global object in development mode
if (process.env.NODE_ENV !== 'production') {
  globalSocket.socket = socket;
}