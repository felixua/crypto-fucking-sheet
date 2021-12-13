import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { removeCoinsStartAsync } from '../../redux/coins/coins.actions';

import './crypto-collection-item.styles.scss';

import {Badge} from 'react-bootstrap';
import {AiOutlineDelete} from 'react-icons/ai';

const CryptoCollectionItem = ({coin, displayName, primary, currentUser, removeCoinsStartAsync, showRemoveButton}) => {
    return (
    <>
    <li class="nav-item">
        { showRemoveButton 
            ? <div className="remove-link" coin={coin} onClick={() => removeCoinsStartAsync(currentUser, coin)}><AiOutlineDelete /></div>
            : null
        }
        <a class={`nav-link ${primary ? 'active' : ''}`} aria-current="page" href="#">
            <Badge pill bg={`${primary ? 'primary' : ''}`} text={`${primary ? 'light' : ''}`}>{coin}</Badge>&nbsp;                    
            {displayName}
        </a>
    </li>
    </>);
}; 

const mapDispatchToProps = dispatch => ({
    removeCoinsStartAsync: (currentUser, coin) => dispatch(removeCoinsStartAsync(currentUser, coin))
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
}); 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoCollectionItem);