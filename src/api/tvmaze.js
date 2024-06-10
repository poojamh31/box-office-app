const BASE_URL = 'https://api.tvmaze.com';

const apiGet = async queryString => {
  //throw new Error("something bad happened");
  const response = await fetch(`${BASE_URL}${queryString}`);

  const body = await response.json();

  return body;
};

export const searchForShows = query => apiGet(`/search/shows?q=${query}`);

export const searchForPeople = query => apiGet(`/search/people?q=${query}`);

export const getShowByID = showId => apiGet(`/shows/${showId}`);

//const response = await fetch(
//   `https://api.tvmaze.com/search/shows?q=${searchStr}`
// );
// const body = await response.json();
