export enum SensorName {
    HUMIDITY = 'humidity',
    TEMPERATURE = 'temperature',
    CONDUCTIVITY = 'conductivity',
    PH = 'ph',
    NITROGEN = 'nitrogen',
    PHOSPHORUS = 'phosphorus',
    POTASSIUM = 'potassium',
    SALINITY = 'salinity',
    TDS = 'tds',
}

export enum SensorId {
    SENSOR_1 = 1,
    SENSOR_2 = 2,
    SENSOR_3 = 3,
    SENSOR_4 = 4,
    SENSOR_5 = 5,
}

export type SensorDataBody = {
    timestamp?: string // time data was recorded in ISO format
    sensor_name?: string // type of sensor, e.g. temperature, humidity
    sensor_id?: number // which physical sensor the data came from
    sensor_value?: number // the value of the sensor reading
};

export type SensorDataQueryParams = {
    startTime?: string // start time of the query in ISO format
    endTime?: string // end time of the query in ISO format
}