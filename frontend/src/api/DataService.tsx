import useData from './useData';
import { createContext, PropsWithChildren } from 'react';
import { SensorData } from '../types';

type IDataContext = {
    data: SensorData[] | undefined,
    isLoading: boolean,
    isError: boolean,
};

export const DataContext = createContext<IDataContext>({
    data: undefined,
    isLoading: false,
    isError: false,
});


function DataService({children}: PropsWithChildren) {
    const { data, isLoading, isError } = useData();

    return (
        <DataContext.Provider value={{data, isLoading, isError}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataService;