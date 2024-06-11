import ShowCard from './ShowCard';
import { useStarredShows } from '../../lib/useStarredShows';

const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarred] = useStarredShows();

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
          isStarred={starredShows.includes(data.show.id)}
        />
      ))}
    </div>
  );
};
export default ShowGrid;
