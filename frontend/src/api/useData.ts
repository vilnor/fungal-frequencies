import useSWR from 'swr';
import { SensorData } from '../types';
import { useMemo } from 'react';
import { FetcherResponse } from 'swr/_internal';

console.log(process.env.REACT_APP_API_URL);

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/data`;
const MONITORING_ENDPOINT = `${process.env.REACT_APP_API_URL}/api/monitoring_data`;

function fetcher<T>(...args: any[]): FetcherResponse<T> {
    // @ts-ignore
    return fetch(...args).then(res => res.json());
}

export default function useData<T = SensorData[]>(isMonitoring: boolean, sensorName?: string, startTime?: string, endTime?: string, format?: string) {
    const queryParams = useMemo(() => {
        const params = new URLSearchParams();

        if (startTime) {
            params.append('startTime', startTime);
        }

        if (endTime) {
            params.append('endTime', endTime);
        }

        if (format) {
            params.append('format', format);
        }

        return params.toString();
    }, [startTime, endTime, format]);

    const {
        data,
        error,
        isLoading,
    } = useSWR(`${isMonitoring ? MONITORING_ENDPOINT : ENDPOINT}${!!sensorName ? ('/' + sensorName) : ''}${!!queryParams ? ('?' + queryParams) : ''}`, fetcher<T>);

    return {
        data,
        isLoading,
        isError: error,
    };
}