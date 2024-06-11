import { useReducer, useEffect } from 'react';
const usePersistedReducer = (reducer, initialState, localStorageKey) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persistedValue = localStorage.getItem(localStorageKey);
    return persistedValue ? JSON.parse(persistedValue) : initial;
  });
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);
  return [state, dispatch];
};

const starredShowsReducer = (currentStarred, action) => {
  switch (action.type) {
    case 'STAR':
      return currentStarred.concat(action.showID);
    case 'UNSTAR':
      return currentStarred.filter(showID => showID !== action.showID);
    default:
      return currentStarred;
  }
};
export const useStarredShows = () => {
  return usePersistedReducer(starredShowsReducer, [], 'starredShows');
};
