import { createSelector } from 'reselect';

const selectCoins = state => state.coins;

export const selectUserCoins = createSelector(
    [selectCoins],
    coins => coins.userCoins
);

export const selectSelectedCoin = createSelector(
    [selectCoins],
    coins => {
        return coins.userCoins !== undefined ? coins.userCoins.find(coin => coin.selected === true) : 
        {
            coin: "", 
            displayName: "",
            user: ""
        };
    }
);

export const selectUserCoinsShowRemove = createSelector(
    [selectCoins],
    coins => coins.showRemoveButton
);


