import CoinsActionTypes from './coins.types';

const INITIAL_STATE = {
    userCoins: null,
    errorMessage: undefined
}

const coinsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CoinsActionTypes.FETCH_COINS_START:
            return state;    
        case CoinsActionTypes.FETCH_COINS_SUCCESS:
            return{
                ...state,
                userCoins: action.payload
            };
        case CoinsActionTypes.FETCH_COINS_FAILURE:
            return{
                ...state,
                errorMessage: action.payload
            }; 
        case CoinsActionTypes.ADD_COINS_START:
            return state;
        case CoinsActionTypes.ADD_COINS_SUCCESS:
            return state;
        case CoinsActionTypes.ADD_COINS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            }               
        default:
            return state;    
    }
};

export default coinsReducer;