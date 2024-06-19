export type SensorData = {
    sensor_id: number
    sensor_name: string
    sensor_value: number
    timestamp: string
}

export type DataView = {
    data: SensorData[] | undefined
    isError: boolean
    isLoading: boolean
}

const a = [
    {
        sensor_id: 1,
        sensor_name: 'ph',
        sensor_value: 7,
        timestamp: '2021-01-01T00:00:00',
    },
    {
        sensor_id: 2,
        sensor_name: 'ph',
        sensor_value: 6,
        timestamp: '2021-01-01T00:00:00',
    },
    {
        sensor_id: 1,
        sensor_name: 'ph',
        sensor_value: 8,
        timestamp: '2021-01-02T00:00:00',
    },
    {
        sensor_id: 2,
        sensor_name: 'ph',
        sensor_value: 5,
        timestamp: '2021-01-02T00:00:00',
    },
    {
        sensor_id: 1,
        sensor_name: 'temperature',
        sensor_value: 20,
        timestamp: '2021-01-01T00:00:00',
    },
    {
        sensor_id: 2,
        sensor_name: 'temperature',
        sensor_value: 21,
        timestamp: '2021-01-01T00:00:00',
    },
    {
        sensor_id: 1,
        sensor_name: 'temperature',
        sensor_value: 22,
        timestamp: '2021-01-02T00:00:00',
    },
    {
        sensor_id: 2,
        sensor_name: 'temperature',
        sensor_value: 23,
        timestamp: '2021-01-02T00:00:00',
    },
];

const b = {
    ph: [
        {
            name: 'sensor 1',
            data: [[new Date('2021-01-01T00:00:00').getTime(), 7], [new Date('2021-01-02T00:00:00').getTime(), 8]],
            colour: '#000000',
        },
        {
            name: 'sensor 2',
            data:
                [[new Date('2021-01-01T00:00:00').getTime(), 6], [new Date('2021-01-02T00:00:00').getTime(), 5]],
            colour:
                '#000000',
        },
    ],
    temperature: [
        {
            name: 'sensor 1',
            data: [[new Date('2021-01-01T00:00:00').getTime(), 20], [new Date('2021-01-02T00:00:00').getTime(), 22]],
            colour: '#a60016',
        },
        {
            name: 'sensor 2',
            data: [[new Date('2021-01-01T00:00:00').getTime(), 21], [new Date('2021-01-02T00:00:00').getTime(), 23]],
            colour: '#a60016',
        },
    ],
};