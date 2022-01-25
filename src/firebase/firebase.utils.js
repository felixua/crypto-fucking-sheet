import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDRKzzQhhbVIHqiqss6_afnaWDDO2VM32g",
    authDomain: "api-project-731522552432.firebaseapp.com",
    projectId: "api-project-731522552432",
    storageBucket: "api-project-731522552432.appspot.com",
    messagingSenderId: "731522552432",
    appId: "1:731522552432:web:8a49309b106bed257f1ab5"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const convertUserCoinsSnapshotToMap = coins => {
    return coins.docs.map(doc => {
        const {user, coin, displayName} = doc.data();

        return {
            user: user,
            coin: coin,
            displayName: displayName,
            selected: false
        };
    });
};

export const convertTransactionListSnapshotToMap = transaction => {
    return transaction.docs.map(doc => {
        const {user, coin, transactionType, dateTime, amount, priceARS, spendARS, priceUSD, spendUSD, wallet, comments} = doc.data();

        return {
            id: doc.id,
            user: user,
            coin: coin,
            transactionType: transactionType,
            dateTime: dateTime,
            amount: amount,
            priceARS: priceARS,
            spendARS: spendARS,
            priceUSD: priceUSD,
            spendUSD: spendUSD,
            wallet: wallet,
            comments: comments
        };
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;