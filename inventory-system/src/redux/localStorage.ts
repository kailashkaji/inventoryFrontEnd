export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const tokens = {
  token: localStorage.token ? localStorage.token : "",
};

export const saveState = (state: unknown) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    return undefined;
  }
};
