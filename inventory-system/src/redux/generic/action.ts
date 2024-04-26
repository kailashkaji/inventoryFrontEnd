import { actionTypes } from "./constant";

export const requestHelloWorld = () => {
  return {
      type: actionTypes.REQUEST_HELLO_WORLD
  };
};
export const receiveHelloWorld = (data: string) => {
  return {
      type: actionTypes.RECEIVE_HELLO_WORLD,
      data
  };
};