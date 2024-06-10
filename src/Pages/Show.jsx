import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getShowByID } from '../api/tvmaze';

const Show = () => {
  const { showId } = useParams();
  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId],
    queryFn: () => getShowByID(showId),
  });
  if (showError) {
    return <div>We have an error : {showError.message}</div>;
  }
  if (showData) {
    return <div>Got show data : {showData.name}</div>;
  }
  return <div>Data id loading</div>;
};

export default Show;
