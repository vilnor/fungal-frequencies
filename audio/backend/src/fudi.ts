import * as net from 'net';
import { Request, Response } from 'express';

const host: string = 'localhost';
const port: number = 1174;
const client = new net.Socket();
client.connect(port, host, () => {
    console.log('Connected to server');
});

function sendSrcPosMessage(src: number, pos: { x: number, y: number }) {
    const message = `src ${src} pos ${pos.x / 100} ${pos.y / 100};`;
    console.log(`Sending message: ${message}`);
    client.write(message);
}

type PosBody = {
    srcList: { src: number, pos: { x: number, y: number } }[];
}

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
export async function postRot(req: Request<any, any, RotBody>, res: Response) {
    const { rotation } = req.body;
    const message = `ref rot ${rotation} 0 0;`;
    console.log(`Sending message: ${message}`);
    client.write(message);
    res.send('ok');
}