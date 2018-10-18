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

/**
 * Retrieve tweets using sequential Fetch (first github projects, then tweets of each project)
 *
 * @param {string} searchTerm - search term to look for particular github projects (i.e., framework)
 * @param {string} language - language interested (i.e., C, Java, JavaScript)
 * @param {string} totalProjects - total number of projects to fetch tweets 
 * @public
 */
export function fetchTweets(searchTerm, language, totalProjects) {
  return dispatch => {
    dispatch(fetchTweetsBegin());

    const proxyUrl = 'https://dry-everglades-15949.herokuapp.com/';
    // const url = 'https://api.github.com/search/repositories?q=language:' + searchTerm + '&sort=stars&order=desc';
    const twitterUrl = proxyUrl + 'https://api.twitter.com/1.1/search/tweets.json?q=' + searchTerm;

    return fetch(twitterUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/json',
        'Authorization': 'Bearer ' + process.env.REACT_APP_BEARER_TOKEN
      }
      })
      .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((tweets) => {
      // tweets = tweets.filter(tweets => tweets.statuses.length > 0);
      dispatch(fetchTweetsSuccess(tweets));
      return tweets;
    })
    .catch(error => {
      dispatch(fetchTweetsError(error));
      console.log('failed to get tweets', error)
    });
  };
}
