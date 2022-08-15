const KEY = "redux";

export const loadSessionState = (key=KEY) => {
  try {
    const serializedState = sessionStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export const saveSessionState = async (state: any, key=KEY) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(key, serializedState);
  } catch (e) {
    // Ignore
  }
}