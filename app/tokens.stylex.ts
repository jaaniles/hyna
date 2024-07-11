import stylex from "@stylexjs/stylex";

export const colors = stylex.defineVars({
  red1: "#0f0b0b",
  red2: "#1b1616",
  red3: "#2d1d1f",
  red4: "#3c2327",
  red5: "#492b30",
  red6: "#58353b",
  red7: "#6e444b",
  red8: "#8f5761",
  red9: "#f4acb7",
  red10: "#e9a2ad",
  red11: "#eca5b0",
  red12: "#f5dade",

  gray1: "#0a0c0f",
  gray2: "#16181b",
  gray3: "#1f2226",
  gray4: "#252a2f",
  gray5: "#2c3137",
  gray6: "#343a42",
  gray7: "#404851",
  gray8: "#56626f",
  gray9: "#646f7c",
  gray10: "#727c89",
  gray11: "#acb4be",
  gray12: "#eceef1",

  slate: "#000ccc04",
  slate2: "#acccfc10",
  slate3: "#bad5f91c",
  slate4: "#b9dbfe25",
  slate5: "#bedafb2e",
  slate6: "#bfdafe39",
  slate7: "#c1ddfd49",
  slate8: "#c2dfff68",
  slate9: "#cbe2ff76",
  slate10: "#d1e4fe84",
  slate11: "#e7f2ffbb",
  slate12: "#f9fbfef1",

  background: "#0c0c0c",
  black: "#000000",
  white: "#ffffff",
});

export const spacing = stylex.defineVars({
  _0: "0px",
  _4: "4px",
  _8: "8px",
  _16: "16px",
  _24: "24px",
  _32: "32px",
  _48: "48px",
  _72: "72px",
  _98: "98px",
});

export const borderRadius = stylex.defineVars({
  small: "4px",
  input: "8px",
  button: "4px",
  container: "8px",
  full: "100%",
});

export const border = stylex.defineVars({
  default: `2px solid ${colors.gray10}`,
  container: `2px solid ${colors.gray5}`,

  input: `2px solid ${colors.gray5}`,
  inputHover: `2px solid ${colors.gray6}`,
  inputFocus: `2px solid ${colors.red8}`,

  button: `2px solid ${colors.gray5}`,
  buttonHover: `2px solid ${colors.gray6}`,
  buttonFocus: `2px solid ${colors.gray6}`,

  transparent: `2px solid transparent`,
});

export const fontSize = stylex.defineVars({
  bodyLarge: "16px",
  bodyMedium: "14px",
  bodySmall: "12px",

  headlineLarge: "31px",
  headlineMedium: "25px",
  headlineSmall: "20px",

  input: "16px",
});
