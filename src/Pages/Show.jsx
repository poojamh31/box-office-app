import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowByID } from '../api/tvmaze';
const Show = () => {
  const { showId } = useParams();

  const [showData, setShowdata] = useState(null);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getShowByID(showId);
        setShowdata(data);
      } catch (err) {
        setShowError(err);
      }
    }
    fetchData();
  }, [showId]);

  if (showError) {
    return <div>We have an error : {showError.message}</div>;
  }
  if (showData) {
    return <div>Got show data : {showData.name}</div>;
  }
  return <div>Data id loading</div>;
};

export default Show;
