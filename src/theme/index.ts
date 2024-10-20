import { createTheme } from "@mui/material";
import { blue, lightGreen } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: lightGreen[500],
        },
    },
    typography: {
        fontFamily: 'Noto Sans JP',
    },
});

export default theme;