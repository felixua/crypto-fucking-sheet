import { createSelector } from 'reselect';

const selectCoins = state => state.coins;

export const selectUserCoins = createSelector(
    [selectCoins],
    coins => coins.userCoins
);