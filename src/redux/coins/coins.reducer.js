import CoinsActionTypes from './coins.types';

const INITIAL_STATE = {
    showRemoveButton: false,
    userCoins: null,
    errorMessage: undefined
}

const coinsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CoinsActionTypes.SELECT_COIN:
            return{
                ...state,
                userCoins: state.userCoins.map(
                     coin => coin.coin !== action.payload ? 
                        { ...coin, selected: false } : { ...coin, selected: true } 
                )
            };
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
        case CoinsActionTypes.SHOW_REMOVE_BUTTON:
            return {
                ...state,
                showRemoveButton: action.payload
            }
        case CoinsActionTypes.REMOVE_COINS_START:
            return state;
        case CoinsActionTypes.REMOVE_COINS_SUCCESS:
            return state;
        case CoinsActionTypes.REMOVE_COINS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            }                              
        default:
            return state;    
    }
};

export default coinsReducer;