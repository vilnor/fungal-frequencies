import { createTheme, PaletteMode } from '@mui/material';
import { useMemo } from 'react';

export function useTheme(mode: PaletteMode) {
    return useMemo(
        () => createTheme({
            palette: {
                mode,
                primary: {
                    main: '#047900',
                },
                secondary: {
                    main: '#bd5f00',
                },
            },
        }),
        [mode],
    );
}