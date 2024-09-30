import { useCallback, useMemo } from 'react';

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/soundscape`;


export default function useSoundscape(startTime?: string, endTime?: string) {
    const queryParams = useMemo(() => {
        const params = new URLSearchParams();

        if (startTime) {
            params.append('startTime', startTime);
        }

        if (endTime) {
            params.append('endTime', endTime);
        }

        params.append('action', 'start');

        return params.toString();
    }, [startTime, endTime]);

    const startSoundscape = useCallback(async () => {
        const res = await fetch(`${ENDPOINT}${!!queryParams ? ('?' + queryParams) : ''}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
    }, [queryParams]);

    const stopSoundscape = async () => {

        const res = await fetch(`${ENDPOINT}?action=stop`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
    };

    return { startSoundscape, stopSoundscape };
}