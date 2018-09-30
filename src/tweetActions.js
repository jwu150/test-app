export const FETCH_TWEETS_BEGIN   = 'FETCH_TWEETS_BEGIN';
export const FETCH_TWEETS_SUCCESS = 'FETCH_TWEETS_SUCCESS';
export const FETCH_TWEETS_FAILURE = 'FETCH_TWEETS_FAILURE';

export const fetchTweetsBegin = () => ({
  type: FETCH_TWEETS_BEGIN
});

export const fetchTweetsSuccess = tweets => ({
  type: FETCH_TWEETS_SUCCESS,
  payload: { tweets }
});

export const fetchTweetsError = error => ({
  type: FETCH_TWEETS_FAILURE,
  payload: { error }
});

export function fetchTweets(searchTerm, language, totalProjects) {
  return dispatch => {
    dispatch(fetchTweetsBegin());
    const url = 'https://api.github.com/search/repositories?q=' + searchTerm + '+language:' + language + '&sort=stars&order=desc';
    const twitterUrl = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=';
    const reposNames = [];
    let total = totalProjects;

    return fetch(url)
    .then(response => response.json())
    .then((data) => {
      total = Math.min(totalProjects, data.items.length);
      for (let i = 0; i < total; i++) {
        reposNames.push(data.items[i].html_url.replace(/(^\w+:|^)\/\//, ''));  //trimmed http://
      }
    })
    .then(() => {
      let urls = [];
      for (let i = 0; i < total; i++) {
        urls.push(twitterUrl + encodeURI(reposNames[i]));
      }
      
      let fetches = urls.map((url) => {
        let request = new Request(url, {
            headers: new Headers({
              'Content-Type': 'text/json',
              'Authorization': 'Bearer ' + process.env.REACT_APP_BEARER_TOKEN
            }), 
            method: 'GET'
        });
        return request;
      });

      Promise.all(fetches.map((request) => {
        return fetch(request).then((response) => {
            return response.json();
        }).then((data) => {
            return data;
        });
      })).then((values) => {
          dispatch(fetchTweetsSuccess(values));
          return values;
        });
    })
    .catch(function(error) {
      dispatch(fetchTweetsError(error));
      console.log('failed to get github projects', error)
    });
  };
}

// TODO: Handle HTTP errors since fetch won't.
// function handleErrors(response) {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   return response;
// }