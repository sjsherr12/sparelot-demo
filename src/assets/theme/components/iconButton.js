import colors from "assets/theme/base/colors";
import rgba from "../functions/rgba";

const { transparent } = colors;

export default {
  styleOverrides: {
    root: {
      "&:hover": {
        backgroundColor: rgba(0, 0, 0, 0),
      },
    },
  },
};
