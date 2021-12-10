import {createSelector} from 'reselect';

const selectMessage = state => {
    return state.message;
}    

export const selectToastMessage = createSelector(
    [selectMessage],
    message => {
        return message.toastMessage
    }    
);