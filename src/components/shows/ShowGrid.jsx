import { useReducer, useEffect } from 'react';
import ShowCard from './ShowCard';

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

const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarred] = usePersistedReducer(
    starredShowsReducer,
    [],
    'starredShows'
  );

  console.log({ starredShows });

  const onStarMeClick = showID => {
    const isStarred = starredShows.includes(showID);

    if (isStarred) {
      dispatchStarred({ type: 'UNSTAR', showID });
    } else {
      dispatchStarred({ type: 'STAR', showID });
    }
  };
  return (
    <div>
      {shows.map(data => (
        <ShowCard
          key={data.show.id}
          id={data.show.id}
          name={data.show.name}
          image={
            data.show.image ? data.show.image.medium : '/not-found-image.png'
          }
          summary={data.show.summary}
          onStarMeClick={onStarMeClick}
        />
      ))}
    </div>
  );
};
export default ShowGrid;
