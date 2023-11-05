import { scaleColor } from "./scale-color";

const primary = {
  50: "#123123",
  500: "#ff00ff",
};

export default {
  font: {
    size: {
      sm: {
        xs: "10px",
        sm: "14px",
        md: "16px",
      },
      md: {
        xs: "12px",
        sm: "16px",
        md: "20px",
      },
    },
    weight: {
      md: {
        sm: 400,
        md: 500,
        lg: 600,
      },
    },
  },
  color: {
    primary: {
      default: primary[500],
      ring: scaleColor(primary[500], { lightness: 50 }),
    },
  },
  radius: {
    checkbox: "6px",
    default: "12px",
  },
};
