import toastMessageTypes from './message.types';

export const showToastMessage = (message) => ({
    type: toastMessageTypes.SHOW_TOAST_MESSAGE,
    payload: message
});