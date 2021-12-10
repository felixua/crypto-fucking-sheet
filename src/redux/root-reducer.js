import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import coinsReducer from './coins/coins.reducer';
import messageReducer from './message/message.reducer';

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['coins']
 };

const rootReducer = combineReducers({
    user: userReducer,
    coins: coinsReducer,
    message: messageReducer
 });

 export default persistReducer(persistConfig, rootReducer);