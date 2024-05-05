import useSWR, { Fetcher } from 'swr';
import { SensorData } from '../types';

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/data`;

const fetcher: Fetcher<SensorData[], string> = (...args) => fetch(...args).then(res => res.json());

export default function useData(sensorName?: string) {
    const { data, error, isLoading } = useSWR(`${ENDPOINT}${!!sensorName ? ('/' + sensorName) : ''}`, fetcher);

    return {
        data,
        isLoading,
        isError: error,
    };
}