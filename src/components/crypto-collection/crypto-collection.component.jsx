import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CryptoCollectionItem from '../crypto-collection-item/crypto-collection-item.component';

import { fetchCoinsStartAsync } from '../../redux/coins/coins.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectUserCoins } from '../../redux/coins/coins.selectors';
import { selectUserCoinsShowRemove } from '../../redux/coins/coins.selectors'
 
class CryptoCollection extends React.Component {
    componentDidMount() {
        const { fetchCoinsStartAsync, currentUser } = this.props;

        fetchCoinsStartAsync(currentUser)
    }

    render() {
        const { userCoins, showRemoveButton } = this.props;

        return(
            <>
                {userCoins !== null ? userCoins.map(({ id, coin, displayName, selected, ...otherCoinProps }) => (
                    <CryptoCollectionItem key={coin} id={id} coin={coin} displayName={displayName} primary={selected} 
                                          showRemoveButton = {showRemoveButton}/>
                )) : null}
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCoinsStartAsync: (user) => dispatch(fetchCoinsStartAsync(user))
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userCoins: selectUserCoins,
    showRemoveButton: selectUserCoinsShowRemove
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoCollection);