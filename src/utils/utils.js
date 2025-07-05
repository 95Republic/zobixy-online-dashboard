// utils/socket.js or utils.js

import { io } from 'socket.io-client';

// Use environment variable for Socket.IO URL
const SOCKET_URL = process.env.REACT_APP_MODE === 'prod' ? process.env.REACT_APP_PROD_SOCKET_URL : 
        process.env.REACT_APP_LOCAL_SOCKET_URL;

// Custom loader style used in components
export const overrideStyle = {
  display: 'flex',
  margin: '0 auto',
  height: '24px',
  justifyContent: 'center',
  alignItems: 'center',
}

export const socket = io(SOCKET_URL)
