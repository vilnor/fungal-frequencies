import { UDPPort } from 'osc';
import { Request, Response } from 'express';

enum OSC_CONTROLS {
    RESET = 1,
    S1_TEMP = 2,
    S1_HUMID = 3,
    S1_PH = 4,
    S1_NITRO = 5,
    S1_PHOS = 6,
    S1_POT = 7,
    S2_TEMP = 8,
    S2_HUMID = 9,
    S2_PH = 10,
    S2_NITRO = 11,
    S2_PHOS = 12,
    S2_POT = 13,
    S3_TEMP = 14,
    S3_HUMID = 15,
    S3_PH = 16,
    S3_NITRO = 17,
    S3_PHOS = 18,
    S3_POT = 19,
    S4_TEMP = 20,
    S4_HUMID = 21,
    S4_PH = 22,
    S4_NITRO = 23,
    S4_PHOS = 24,
    S4_POT = 25,
    S5_TEMP = 26,
    S5_HUMID = 27,
    S5_PH = 28,
    S5_NITRO = 29,
    S5_PHOS = 30,
    S5_POT = 31,
}

type SensorData = {
    timestamp: string // time data was recorded in ISO format
    sensor_name: string // type of sensor, e.g. temperature, humidity
    sensor_id: number // which physical sensor the data came from
    sensor_value: number // the value of the sensor reading
    units?: string // the units of the sensor reading
};

type OSCMessage = {
    address: string,
    args: {
        type: 'i' | 'f',
        value: number,
    }[]
}

const MS_IN_THREE_MINUTES = 180000;

const MIN_TEMPERATURE = 19;
const MAX_TEMPERATURE = 24;
const MIN_HUMIDITY = 10;
const MAX_HUMIDITY = 25;
const MIN_PH = 3;
const MAX_PH = 9;
const MIN_NITROGEN = 0;
const MAX_NITROGEN = 25;
const MIN_PHOSPHORUS = 50;
const MAX_PHOSPHORUS = 110;
const MIN_POTASSIUM = 40;
const MAX_POTASSIUM = 100;


const client = new UDPPort({
                               remotedAddress: 'localhost',
                               remotePort: 8881,
                           });

client.open();

function normalizeValue(value: number, min: number, max: number) {
    return ((value - min) / (max - min));
}

function createOSCMessage(oscParameter: number, oscValue: number): OSCMessage {
    return {
        address: '/fader',
        args: [
            {
                type: 'i',
                value: oscParameter,
            },
            {
                type: 'f',
                value: oscValue,
            },
        ],
    };
}

function mapSensorValueToOSCMessage(sensorId: number, sensorName: string, sensorValue: number): OSCMessage | null {
    switch (sensorId) {
        case 1:
            switch (sensorName) {
                case 'temperature':
                    return createOSCMessage(OSC_CONTROLS.S1_TEMP, normalizeValue(sensorValue, MIN_TEMPERATURE, MAX_TEMPERATURE));
                case 'humidity':
                    return createOSCMessage(OSC_CONTROLS.S1_HUMID, normalizeValue(sensorValue, MIN_HUMIDITY, MAX_HUMIDITY));
                case 'ph':
                    return createOSCMessage(OSC_CONTROLS.S1_PH, normalizeValue(sensorValue, MIN_PH, MAX_PH));
                case 'nitrogen':
                    return createOSCMessage(OSC_CONTROLS.S1_NITRO, normalizeValue(sensorValue, MIN_NITROGEN, MAX_NITROGEN));
                case 'phosphorus':
                    return createOSCMessage(OSC_CONTROLS.S1_PHOS, normalizeValue(sensorValue, MIN_PHOSPHORUS, MAX_PHOSPHORUS));
                case 'potassium':
                    return createOSCMessage(OSC_CONTROLS.S1_POT, normalizeValue(sensorValue, MIN_POTASSIUM, MAX_POTASSIUM));
                default:
                    return null;
            }
        case 2:
            switch (sensorName) {
                case 'temperature':
                    return createOSCMessage(OSC_CONTROLS.S2_TEMP, normalizeValue(sensorValue, MIN_TEMPERATURE, MAX_TEMPERATURE));
                case 'humidity':
                    return createOSCMessage(OSC_CONTROLS.S2_HUMID, normalizeValue(sensorValue, MIN_HUMIDITY, MAX_HUMIDITY));
                case 'ph':
                    return createOSCMessage(OSC_CONTROLS.S2_PH, normalizeValue(sensorValue, MIN_PH, MAX_PH));
                case 'nitrogen':
                    return createOSCMessage(OSC_CONTROLS.S2_NITRO, normalizeValue(sensorValue, MIN_NITROGEN, MAX_NITROGEN));
                case 'phosphorus':
                    return createOSCMessage(OSC_CONTROLS.S2_PHOS, normalizeValue(sensorValue, MIN_PHOSPHORUS, MAX_PHOSPHORUS));
                case 'potassium':
                    return createOSCMessage(OSC_CONTROLS.S2_POT, normalizeValue(sensorValue, MIN_POTASSIUM, MAX_POTASSIUM));
                default:
                    return null;
            }
        case 3:
            switch (sensorName) {
                case 'temperature':
                    return createOSCMessage(OSC_CONTROLS.S3_TEMP, normalizeValue(sensorValue, MIN_TEMPERATURE, MAX_TEMPERATURE));
                case 'humidity':
                    return createOSCMessage(OSC_CONTROLS.S3_HUMID, normalizeValue(sensorValue, MIN_HUMIDITY, MAX_HUMIDITY));
                case 'ph':
                    return createOSCMessage(OSC_CONTROLS.S3_PH, normalizeValue(sensorValue, MIN_PH, MAX_PH));
                case 'nitrogen':
                    return createOSCMessage(OSC_CONTROLS.S3_NITRO, normalizeValue(sensorValue, MIN_NITROGEN, MAX_NITROGEN));
                case 'phosphorus':
                    return createOSCMessage(OSC_CONTROLS.S3_PHOS, normalizeValue(sensorValue, MIN_PHOSPHORUS, MAX_PHOSPHORUS));
                case 'potassium':
                    return createOSCMessage(OSC_CONTROLS.S3_POT, normalizeValue(sensorValue, MIN_POTASSIUM, MAX_POTASSIUM));
                default:
                    return null;
            }
        case 4:
            switch (sensorName) {
                case 'temperature':
                    return createOSCMessage(OSC_CONTROLS.S4_TEMP, normalizeValue(sensorValue, MIN_TEMPERATURE, MAX_TEMPERATURE));
                case 'humidity':
                    return createOSCMessage(OSC_CONTROLS.S4_HUMID, normalizeValue(sensorValue, MIN_HUMIDITY, MAX_HUMIDITY));
                case 'ph':
                    return createOSCMessage(OSC_CONTROLS.S4_PH, normalizeValue(sensorValue, MIN_PH, MAX_PH));
                case 'nitrogen':
                    return createOSCMessage(OSC_CONTROLS.S4_NITRO, normalizeValue(sensorValue, MIN_NITROGEN, MAX_NITROGEN));
                case 'phosphorus':
                    return createOSCMessage(OSC_CONTROLS.S4_PHOS, normalizeValue(sensorValue, MIN_PHOSPHORUS, MAX_PHOSPHORUS));
                case 'potassium':
                    return createOSCMessage(OSC_CONTROLS.S4_POT, normalizeValue(sensorValue, MIN_POTASSIUM, MAX_POTASSIUM));
                default:
                    return null;
            }
        case 5:
            switch (sensorName) {
                case 'temperature':
                    return createOSCMessage(OSC_CONTROLS.S5_TEMP, normalizeValue(sensorValue, MIN_TEMPERATURE, MAX_TEMPERATURE));
                case 'humidity':
                    return createOSCMessage(OSC_CONTROLS.S5_HUMID, normalizeValue(sensorValue, MIN_HUMIDITY, MAX_HUMIDITY));
                case 'ph':
                    return createOSCMessage(OSC_CONTROLS.S5_PH, normalizeValue(sensorValue, MIN_PH, MAX_PH));
                case 'nitrogen':
                    return createOSCMessage(OSC_CONTROLS.S5_NITRO, normalizeValue(sensorValue, MIN_NITROGEN, MAX_NITROGEN));
                case 'phosphorus':
                    return createOSCMessage(OSC_CONTROLS.S5_PHOS, normalizeValue(sensorValue, MIN_PHOSPHORUS, MAX_PHOSPHORUS));
                case 'potassium':
                    return createOSCMessage(OSC_CONTROLS.S5_POT, normalizeValue(sensorValue, MIN_POTASSIUM, MAX_POTASSIUM));
                default:
                    return null;
            }
        default:
            return null;
    }
}

let playingSoundscape = false;

async function generateSoundscapeForData(data: SensorData[]) {

    const transformedData: { [timestamp: string]: OSCMessage[] } = {};

    data.forEach(({ sensor_id, sensor_name, sensor_value, timestamp }) => {
        const oscMessage = mapSensorValueToOSCMessage(sensor_id, sensor_name, sensor_value);
        if (!oscMessage) return;

        if (!transformedData[timestamp]) {
            transformedData[timestamp] = [];
        }
        transformedData[timestamp].push(oscMessage);
    });

    const numTimestamps = Object.keys(transformedData).length;
    const delay = MS_IN_THREE_MINUTES / numTimestamps;

    for (const messages of Object.values(transformedData)) {
        if (!playingSoundscape) {
            return;
        }

        messages.forEach((message) => {
            client.send(message);
        });

        await new Promise(r => setTimeout(r, delay));
    }
    console.log('done');
}


type SoundscapeQueryParams = {
    startTime?: string // start time of the query in ISO format
    endTime?: string // end time of the query in ISO format
    action?: 'start' | 'stop'
}

export async function getSoundscape(req: Request<any, any, any, SoundscapeQueryParams>, res: Response) {
    const { startTime, endTime, action } = req.query;
    if (action === 'start' && playingSoundscape) {
        res.send('already playing soundscape');
        return;
    }
    if (action === 'stop' && !playingSoundscape) {
        res.send('no soundscape playing');
        return;
    }
    if (action === 'stop') {
        playingSoundscape = false;
        res.send('stopping soundscape');
        return;
    }

    playingSoundscape = true;
    const data = await fetch(`http://biome-iot.uqcloud.net/api/data?startTime=${startTime}&endTime=${endTime}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
    const json = await data.json();
    res.send('got data, generating soundscape');
    await generateSoundscapeForData(json);
}

function isNumber(x: any): x is number {
    return typeof x === 'number';
}

export function initialiseOscMappings(req: Request, res: Response) {
    const messages = Object.values(OSC_CONTROLS).filter(isNumber).map((control) => createOSCMessage(control, 1));
    messages.forEach((message) => {
        client.send(message);
    });
    res.send('sent osc mapping initialisation');
}