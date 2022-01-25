import createDataContext from './createDataContext';
import { firestore } from '../firebase/firebase.utils';
import { showToastMessage } from '../redux/message/message.actions';
import { convertTransactionListSnapshotToMap } from '../firebase/firebase.utils';

const transactionListActionTypes = {
    SHOW_BUY_CRYPTO_DIALOGBOX: 'SHOW_BUY_CRYPTO_DIALOGBOX',
    CLOSE_BUY_CRYPTO_DIALOGBOX: 'CLOSE_BUY_CRYPTO_DIALOGBOX',
    SHOW_CONVERT_CRYPTO_DIALOGBOX: 'SHOW_CONVERT_CRYPTO_DIALOGBOX',
    SHOW_WITHDRAW_CRYPTO_DIALOGBOX: 'SHOW_WITHDRAW_CRYPTO_DIALOGBOX',
    SHOW_INTEREST_CRYPTO_DIALOGBOX: 'SHOW_INTEREST_CRYPTO_DIALOGBOX',
    FETCH_TRANSACTIONS_LIST_SUCCESS: 'FETCH_TRANSACTIONS_LIST_SUCCESS'
};

const transactionListReducer = (state, action) => {
    switch (action.type) {
        case transactionListActionTypes.SHOW_BUY_CRYPTO_DIALOGBOX:
            return { ...state, showBuyCryptoDialogBox: true };
        case transactionListActionTypes.CLOSE_BUY_CRYPTO_DIALOGBOX:
            return { ...state, showBuyCryptoDialogBox: false };
        case transactionListActionTypes.FETCH_TRANSACTIONS_LIST_SUCCESS:
            return { ...state, transactions: action.payload }
        default:
            return state;
    }
}

const fetchTransactionsList = dispatch => ({ currentUser, selectedCoin }) => {
    const trxRef = firestore.collection("transactions");

    trxRef
        .where("user", "==", currentUser.email)
        .where("coin", "==", selectedCoin)
        .get()
        .then(snapshot => {
            const transformedSnapshot = convertTransactionListSnapshotToMap(snapshot);
            dispatch({ type: transactionListActionTypes.FETCH_TRANSACTIONS_LIST_SUCCESS, payload: transformedSnapshot });
        })
        .catch(error => dispatch(console.log(error.message)));
}

const showBuyDialogBox = dispatch => () => {
    dispatch({ type: transactionListActionTypes.SHOW_BUY_CRYPTO_DIALOGBOX });
}

const closeBuyDialogBox = dispatch => () => {
    dispatch({ type: transactionListActionTypes.CLOSE_BUY_CRYPTO_DIALOGBOX });
}

const submitBuyDialogBox = dispatch => ({ currentUser, selectedCoin, buyData, reduxDispatcher }) => {
    const trxRef = firestore.collection("transactions");

    try {
        trxRef.add({
            user: currentUser.email,
            coin: selectedCoin.coin,
            transactionType: "1",
            dateTime: new Date(`${buyData.date}T${buyData.time}:00Z`),
            amount: buyData.amount,
            price: buyData.price,
            spend: buyData.spend,
            priceUSD: buyData.priceUSD,
            spendUSD: buyData.spendUSD,
            wallet: buyData.wallet,
            comments: buyData.comments
        })
            .then(snapshot => {
                reduxDispatcher(showToastMessage(`Buy ${buyData.amount}${selectedCoin.coin} is succefull!`));
                fetchTransactionsList(dispatch)({ currentUser, selectedCoin: selectedCoin.coin }); //Get txs here!
            });
    } catch (error) {
        console.log('error adding transaction', error.message);
        reduxDispatcher(showToastMessage(`Error when add transaction: ${buyData.amount}BTC`));
    }
};

const removeTransaction = dispatch => ({ currentUser, selectedCoin, id, reduxDispatcher }) => {
    firestore.collection("transactions")
        .doc(id)
        .get().then(snapshot => {
            try {
                snapshot.ref.delete().then(() => {
                    reduxDispatcher(showToastMessage(`Transaction removed succefully!`));
                    fetchTransactionsList(dispatch)({ currentUser, selectedCoin: selectedCoin.coin });
                });
            } catch (error) {
                console.log("Error removing transaction id #" + id);
                reduxDispatcher(showToastMessage(`Error removing transaction id #${id}`));
            }
        });
};

export const { Provider, Context } = createDataContext(
    transactionListReducer,
    {
        showBuyDialogBox,
        closeBuyDialogBox,
        submitBuyDialogBox,
        fetchTransactionsList,
        removeTransaction
    },
    {
        showBuyCryptoDialogBox: false
    }
)
