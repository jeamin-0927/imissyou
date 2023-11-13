const colors = {
  gray000: "#FEFEFF",
  gray100: "#F6F7FA",
  gray200: "#EBECF5",
  gray300: "#D8DAE5",
  gray400: "#BFC3D4",
  gray500: "#AAAEC1",
  gray600: "#8C90A0",
  gray700: "#72768A",
  gray800: "#545869",
  gray900: "#202128",
  red: "#EB5757",
  green: "#26AD60",
  blue: "#115FFF",
};

export const opacity = (color: string, op = 1) => {
  return `${color}${Math.round(op * 255).toString(16)}`;
};

export default colors;
export type Colors = typeof colors;
