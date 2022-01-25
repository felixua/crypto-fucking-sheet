import React, { useContext } from 'react';

import {Badge} from 'react-bootstrap';
import {AiOutlineDelete} from 'react-icons/ai';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { removeCoinsStartAsync, selectCoin } from '../../redux/coins/coins.actions';
import { Context } from '../../context/transactionListContext';

import './crypto-collection-item.styles.scss';


const handleCoinClick = ({event, dispatchSelectCoin, fetchTransactionsList, currentUser, coin}) => {
    event.preventDefault();
    dispatchSelectCoin(coin);
    fetchTransactionsList({currentUser: currentUser, selectedCoin: coin});
}

const CryptoCollectionItem = ({coin, displayName, primary, currentUser, removeCoinsStartAsync, showRemoveButton, dispatchSelectCoin}) => {
    const { fetchTransactionsList } = useContext(Context); 
    
    return (
    <>
    <li class="nav-item">
        { showRemoveButton 
            ? <div className="remove-link" coin={coin} onClick={() => removeCoinsStartAsync(currentUser, coin)}><AiOutlineDelete /></div>
            : null
        }
        <a class={`nav-link ${primary ? 'active' : ''}`} aria-current="page" href="#" 
           onClick={(event) => handleCoinClick({event, dispatchSelectCoin, fetchTransactionsList, currentUser, coin})}>
            <Badge pill bg={`${primary ? 'primary' : 'secondary'}`} text={`${primary ? 'light' : ''}`}>{coin}</Badge>&nbsp;                    
            {displayName}
        </a>
    </li>
    </>);
}; 

const mapDispatchToProps = dispatch => ({
    removeCoinsStartAsync: (currentUser, coin) => dispatch(removeCoinsStartAsync(currentUser, coin)),
    dispatchSelectCoin: (coin) => dispatch(selectCoin(coin))
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
}); 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoCollectionItem);