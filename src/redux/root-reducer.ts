import { combineReducers } from 'redux';
import { hotelsReducer } from './hotels';

const rootReducer = combineReducers({
  hotels: hotelsReducer,
});

export default rootReducer;
