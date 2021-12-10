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

        coinsRef.where("user", "==", currentUser.email);
        coinsRef.where("coin", "==", coin);

        const snapshot = coinsRef.get();

        if (!snapshot.exists) {
            dispatch(addCoinsStart());
            try {
                coinsRef.add({
                    user: currentUser.email,
                    coin: coin,
                    displayName: displayName
                })
                .then(snapshot => {
                    dispatch(addCoinsSuccess());
                    dispatch(showToastMessage(displayName+" "+"added succefully!"));
                    dispatch(fetchCoinsStartAsync(currentUser));
                });
            } catch (error) {
                console.log('error catching coins', error.message);
                dispatch(addCoinsFailure());
                dispatch(showToastMessage("Error when add new coin: "+displayName));
            }    
        }
    }    
};

