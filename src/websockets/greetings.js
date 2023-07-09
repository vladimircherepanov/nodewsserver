// Display WebSocket parameters

export const greetings = (ws) => {
    console.log('WebSocket URL:', ws.url);
    console.log('WebSocket readyState:', ws.readyState);
    console.log('WebSocket protocol version:', ws.protocol);
    console.log('WebSocket extensions:', ws.extensions);
    console.log('WebSocket remote IP address:', ws._socket.remoteAddress);
    console.log('WebSocket remote port:', ws._socket.remotePort);
};