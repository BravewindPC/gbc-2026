"use client"
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';


export default function Home() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>("Hello, RiseTech");
    const [inbox, setInbox] = useState<string[]>([]);
    const [roomName, setRoomName] = useState<string>('');

    const rooms = ['Room1', 'Room2', 'Room3', 'Room4', 'Room5', 'Room6'];

    const handleJoinRoom = (newRoom: string) => {
        if (roomName) {
            socket?.emit("leave-room", roomName);
        }
        socket?.emit("join-room", newRoom);
        setRoomName(newRoom);
    };

    const handleSendMessage = () => {
        socket?.emit("send-message", message, roomName);
        setMessage('');
    };

    console.log(roomName)

    useEffect(() => {
        const socket = io("ws://localhost:8080");
        setSocket(socket);

        socket.on("receive-message", (data: string) => {
            setInbox((prevInbox) => [...prevInbox, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
      <div>
          <div className="flex flex-col gap-4 mt-20 mx-auto w-96">
              {/* Buttons to join rooms */}
              {rooms.map((room) => (
                  <button key={room} onClick={() => handleJoinRoom(room)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Join {room}
                  </button>
              ))}

              {/* Showing the messages */}
              <div className="max-w-full h-60 bg-gray-100 border-2 border-indigo-600 rounded-lg p-4 overflow-auto">
                  {inbox.map((message, index) => (
                      <div key={index} className="border rounded p-4 my-2">{message}</div>
                  ))}
              </div>

              {/* Message input and send button */}
              <div className="flex gap-2 align-center justify-center">
                  <input 
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      type="text" 
                      name="message" 
                      className="flex-1 border rounded px-2 py-1" 
                  />
                  <button className="w-40" onClick={handleSendMessage}>Send message</button>
              </div>
          </div>
      </div>
  );
}