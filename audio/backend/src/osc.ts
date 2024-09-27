import { UDPPort } from 'osc';

enum OSC_CONTROLS {
    TEMPO = 0,
    RESET = 1,
    POLY_1 = 2,
    POLY_2 = 3,
    POLY_3 = 4,
    POLY_4 = 5,
    POLY_5 = 6,
    POLY_6 = 7,
    POLY_7 = 8,
    POLY_8 = 9,
    PITCH_1 = 10,
    PITCH_2 = 11,
    PITCH_3 = 12,
    PITCH_4 = 13,
    PITCH_5 = 14,
    PITCH_6 = 15,
    PITCH_7 = 16,
    PITCH_8 = 17,
    TIMBRE_1 = 18,
    TIMBRE_2 = 19,
    TIMBRE_3 = 20,
    TIMBRE_4 = 21,
    TIMBRE_5 = 22,
    TIMBRE_6 = 23,
    TIMBRE_7 = 24,
    TIMBRE_8 = 25,
}

const osc_map = {
    'tempo': OSC_CONTROLS.TEMPO,
    'reset': OSC_CONTROLS.RESET,
    'poly_1': OSC_CONTROLS.POLY_1,
    'poly_2': OSC_CONTROLS.POLY_2,
    'poly_3': OSC_CONTROLS.POLY_3,
    'poly_4': OSC_CONTROLS.POLY_4,
    'poly_5': OSC_CONTROLS.POLY_5,
    'poly_6': OSC_CONTROLS.POLY_6,
    'poly_7': OSC_CONTROLS.POLY_7,
    'poly_8': OSC_CONTROLS.POLY_8,
    'pitch_1': OSC_CONTROLS.PITCH_1,
    'pitch_2': OSC_CONTROLS.PITCH_2,
    'pitch_3': OSC_CONTROLS.PITCH_3,
    'pitch_4': OSC_CONTROLS.PITCH_4,
    'pitch_5': OSC_CONTROLS.PITCH_5,
    'pitch_6': OSC_CONTROLS.PITCH_6,
    'pitch_7': OSC_CONTROLS.PITCH_7,
    'pitch_8': OSC_CONTROLS.PITCH_8,
    'timbre_1': OSC_CONTROLS.TIMBRE_1,
    'timbre_2': OSC_CONTROLS.TIMBRE_2,
    'timbre_3': OSC_CONTROLS.TIMBRE_3,
    'timbre_4': OSC_CONTROLS.TIMBRE_4,
    'timbre_5': OSC_CONTROLS.TIMBRE_5,
    'timbre_6': OSC_CONTROLS.TIMBRE_6,
    'timbre_7': OSC_CONTROLS.TIMBRE_7,
    'timbre_8': OSC_CONTROLS.TIMBRE_8,
};

const client = new UDPPort({
                               remotedAddress: 'localhost',
                               remotePort: 2228,
                           });
client.open();

// const args = process.argv.slice(2);
// if (args.length) {
//     // setup osc mappings
//     const osc_key = args[0];
//     client.send('/host-param', [osc_key, 1], () => {
//         client.close();
//     });
// }
async function main() {

    let i = 0;
    let increasing = true;
    while (true) {
        const msg = {
            address: '/host-param',
            args: [
                {
                    type: 'i',
                    value: OSC_CONTROLS.TEMPO.valueOf(),
                },
                {
                    type: 'f',
                    value: i,
                },
            ],
        };
        client.send(msg);
        // sleep for 1 second
        await new Promise(r => setTimeout(r, 500));
        if (i >= 10) {
            increasing = false;
        } else if (i <= 0) {
            increasing = true;
        }
        if (increasing) {
            i += 0.1;
        } else {
            i -= 0.1;
        }
    }
}

main().then(() => {
    console.log('done');
});