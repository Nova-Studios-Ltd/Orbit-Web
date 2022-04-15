import { createTheme } from "@mui/material";

export const DarkTheme_Default = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#292B2E",
      paper: "#212121",
    }
  },
  customPalette: {
    customActions: {
      messageHover: "#8A8F94",
    },
    formBackground: "#212121E9",
    messageBackground: "#3C3E42",
    messageInputBackground: "#3C3E42"
  }
});

export const LightTheme_Default = createTheme({
  // TODO: Actually change these colors to light theme colors
  palette: {
    mode: "light",
    background: {
      default: "",
      paper: "",
    }
  },
  customPalette: {
    customActions: {
      messageHover: ""
    },
    formBackground: "",
    messageBackground: "",
    messageInputBackground: ""
  }
});

declare module "@mui/material/styles" {
  interface Theme {
    customPalette: {
      customActions: {
        messageHover: string
      },
      formBackground: string,
      messageBackground: string,
      messageInputBackground: string,
    }
  }

  interface ThemeOptions {
    customPalette: {
      customActions: {
        messageHover: string
      },
      formBackground: string,
      messageBackground: string,
      messageInputBackground: string,
    },
  }
}
