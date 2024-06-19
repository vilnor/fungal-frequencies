import {createTheme, PaletteMode} from "@mui/material";
import {useMemo} from "react";

export function useTheme(mode: PaletteMode) {
    return useMemo(
        () => createTheme({
            palette: {
                mode,
                primary: {
                    main: '#ab5b00',
                },
                secondary: {
                    main: '#7e57c2',
                },
            },
        }),
        [mode]
    );
}