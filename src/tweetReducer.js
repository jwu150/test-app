import {
  FETCH_TWEETS_BEGIN,
  FETCH_TWEETS_SUCCESS,
  FETCH_TWEETS_FAILURE
} from './tweetActions';

const initialState = {
  items: [],
  searchTerm: '',
  language: '',
  loading: false,
  error: null
};

export default function tweetReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_TWEETS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TWEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.tweets
      };

    case FETCH_TWEETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}