import toastMessageTypes from './message.types';

const INITIAL_STATE = {
    toastMessage: ''
};

const toastMessageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case toastMessageTypes.SHOW_TOAST_MESSAGE:
            return {
                ...state,
                toastMessage: action.payload
            }
        default:
            return state;    
    }
}

export default toastMessageReducer;