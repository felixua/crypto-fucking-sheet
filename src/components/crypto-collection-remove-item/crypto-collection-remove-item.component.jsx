import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showRemoveButton } from '../../redux/coins/coins.actions';
import { selectUserCoinsShowRemove } from '../../redux/coins/coins.selectors';
import { Button } from 'react-bootstrap';
import { FiMinus } from 'react-icons/fi';

import './crypto-collection-remove-item.styles.scss';

const CryptoCollectionRemoveItem = ({bShow, showRemoveButton}) => {
    return (
        <Button variant="light" className="remove-item-btn" onClick={() => showRemoveButton(bShow)}><FiMinus /></Button>
    )
}

const mapDispatchToProps = dispatch => ({
    showRemoveButton: (bShow) => dispatch(showRemoveButton(bShow))
});

const mapStateToProps = createStructuredSelector({
    bShow: selectUserCoinsShowRemove
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoCollectionRemoveItem);

