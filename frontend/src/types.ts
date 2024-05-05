export type SensorData = {
    sensor_name: string
    sensor_value: number
    timestamp: string
}

export type DataView = {
    data: SensorData[] | undefined
    isError: boolean
    isLoading: boolean
}