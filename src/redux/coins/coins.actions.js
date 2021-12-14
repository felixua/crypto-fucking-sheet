import { convertUserCoinsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { showToastMessage } from '../../redux/message/message.actions';
import CoinsActionTypes from './coins.types';

export const fetchCoinsStart = () => ({
    type: CoinsActionTypes.FETCH_COINS_START
});

export const fetchCoinsSuccess = coins => ({
    type: CoinsActionTypes.FETCH_COINS_SUCCESS,
    payload: coins
});

export const fetchCoinsFailure = errorMessage => ({
    type: CoinsActionTypes.FETCH_COINS_FAILURE,
    payload: errorMessage
});

export const fetchCoinsStartAsync = currentUser => {
    return dispatch => {
        const coinsRef = firestore.collection("coins");
        dispatch(fetchCoinsStart());

        coinsRef
          .where("user","==", currentUser.email)
          .get()
          .then(snapshot => {
              const transformedSnapshot = convertUserCoinsSnapshotToMap(snapshot);
              dispatch(fetchCoinsSuccess(transformedSnapshot));
          })
          .catch(error => dispatch(fetchCoinsFailure(error.message)));
    }
};

export const addCoinsStart = () => ({
    type: CoinsActionTypes.ADD_COINS_START
});

export const addCoinsSuccess = () => ({
    type: CoinsActionTypes.ADD_COINS_SUCCESS
});

export const addCoinsFailure = errorMessage => ({
    type: CoinsActionTypes.ADD_COINS_FAILURE,
    payload: errorMessage
});

export const addCoinsStartAsync = (currentUser, coin, displayName) => {
    return dispatch => {
        const coinsRef = firestore.collection("coins");

        coinsRef
            .where("user", "==", currentUser.email)
            .where("coin", "==", coin)
            .get().then( snapshot => {
                if (snapshot.empty) {
                    dispatch(addCoinsStart());
                    try {
                        coinsRef.add({
                            user: currentUser.email,
                            coin: coin,
                            displayName: displayName
                        })
                        .then(snapshot => {
                            dispatch(addCoinsSuccess());
                            dispatch(showToastMessage(displayName + " " + "added succefully!"));
                            dispatch(fetchCoinsStartAsync(currentUser));
                        });
                    } catch (error) {
                        console.log('error catching coins', error.message);
                        dispatch(addCoinsFailure(error.message));
                        dispatch(showToastMessage("Error when add new coin: " + displayName));
                    }    
                } else {
                    dispatch(showToastMessage("Coin is already listed: " + displayName));
                }    
            }); 
    }    
};

export const removeCoinsStart = () => ({
    type: CoinsActionTypes.REMOVE_COINS_START
});

export const removeCoinsSuccess = () => ({
    type: CoinsActionTypes.REMOVE_COINS_SUCCESS
});

export const removeCoinsFailure = errorMessage => ({
    type: CoinsActionTypes.REMOVE_COINS_FAILURE,
    payload: errorMessage
});

export const removeCoinsStartAsync = (currentUser, coin) => {
    return dispatch => {
        firestore.collection("coins")
            .where("user", "==", currentUser.email)
            .where("coin", "==", coin)
            .get().then(snapshot => {
            dispatch(removeCoinsStart());
                try { 
                    snapshot.forEach(doc => {
                        doc.ref.delete().then(() => {
                            dispatch(removeCoinsSuccess());
                            dispatch(showToastMessage(coin + " " + "removed succefully!"));
                            dispatch(fetchCoinsStartAsync(currentUser)); 
                        }); 
                    });    
                } catch (error) {
                    console.log("Error delete coin " + coin);
                    dispatch(removeCoinsFailure(error.message));
                    dispatch(showToastMessage("Error when remove coin: " + coin));
                }
            });    
    }    
};

export const showRemoveButton = bShow => ({
    type: CoinsActionTypes.SHOW_REMOVE_BUTTON,
    payload: !bShow
});

