import * as net from 'net';
import { Request, Response } from 'express';

const host: string = 'localhost';
const port: number = 1174;
const client = new net.Socket();
client.connect(port, host, () => {
    console.log('Connected to server');
});

// This function sends a message to the server to update the position of a source.
function sendSrcPosMessage(src: number, pos: { x: number, y: number }) {
    const message = `src ${src} pos ${(pos.x / 100) * 1.5} ${(pos.y / 100) * 1.5};`;
    client.write(message);
}

type PosBody = {
    srcList: { src: number, pos: { x: number, y: number } }[];
}

// This function is a POST request handler that sends the position of the user node to the server.
export async function postPos(req: Request<any, any, PosBody>, res: Response) {
    const { srcList } = req.body;
    srcList.forEach(({ src, pos }) => {
        sendSrcPosMessage(src, pos);
    });
    res.send('ok');
}

type RotBody = {
    rotation: number;
}

// This function is a POST request handler that sends the rotation of the user node to the server.
export async function postRot(req: Request<any, any, RotBody>, res: Response) {
    const { rotation } = req.body;
    const message = `ref rot ${rotation} 0 0;`;
    client.write(message);
    res.send('ok');
}