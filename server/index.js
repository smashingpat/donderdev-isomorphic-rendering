import express from 'express';

const server = express();

server.listen(3000, () => {
    console.log('server running: http://localhost:3000');
});
