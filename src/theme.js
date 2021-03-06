import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff7f00",
    },
    secondary: {
      main: "#1576d4",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: "Neucha, Ubuntu, Roboto, sans-serif",
  },
});

export default theme;
