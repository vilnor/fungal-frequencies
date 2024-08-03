import useSWR, { Fetcher } from 'swr';
import { SensorData } from '../types';
import { useMemo } from 'react';

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/data`;
const MONITORING_ENDPOINT = `${process.env.REACT_APP_API_URL}/api/monitoring_data`;

const fetcher: Fetcher<SensorData[], string> = (...args) => fetch(...args).then(res => res.json());

export default function useData(isMonitoring: boolean, sensorName?: string, startTime?: string, endTime?: string) {
    const queryParams = useMemo(() => {
        const params = new URLSearchParams();

        if (startTime) {
            params.append('startTime', startTime);
        }

        if (endTime) {
            params.append('endTime', endTime);
        }

        return params.toString();
    }, [startTime, endTime]);

    const {
        data,
        error,
        isLoading,
    } = useSWR(`${isMonitoring ? MONITORING_ENDPOINT : ENDPOINT}${!!sensorName ? ('/' + sensorName) : ''}${!!queryParams ? ('?' + queryParams) : ''}`, fetcher);

    return {
        data,
        isLoading,
        isError: error,
    };
}