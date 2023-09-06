export const toSnake = (s: string) => {
  return s.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
};
