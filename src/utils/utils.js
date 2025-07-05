// utils/socket.js or utils.js

import { io } from 'socket.io-client';

// Use environment variable for Socket.IO URL
const SOCKET_URL = process.env.mode === 'prod' ? [process.env.REACT_APP_PROD_SOCKET_UR] : 
        [process.env.REACT_APP_LOCAL_SOCKET_URL];
        
// Export socket instance with options
export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ['websocket'], // prefer websockets over polling
});

// Custom loader style used in components
export const overrideStyle = {
  display: 'flex',
  margin: '0 auto',
  height: '24px',
  justifyContent: 'center',
  alignItems: 'center',
};
