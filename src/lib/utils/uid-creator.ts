export const createUId = () => {
  return Math.random().toString(16).split(".")[1];
};
