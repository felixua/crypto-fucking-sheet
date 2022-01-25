import React, { useContext, useEffect } from 'react';

import { FaBtc, FaExchangeAlt, FaArrowUp, FaPercent } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import TransactionListItem  from '../transaction-list-item/transaction-list-item.component';
import { Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import BuyCryptoDialogBox from '../buy-crypto-dialogbox/buy-crypto-dialogbox.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectSelectedCoin } from '../../redux/coins/coins.selectors';

import { Context } from '../../context/transactionListContext';

import './transaction-list.styles.scss';

const TransactionList = ({currentUser, selectedCoin}) => {
    const { state, showBuyDialogBox, fetchTransactionsList} = useContext(Context);

    useEffect(() => {
        fetchTransactionsList({currentUser, selectedCoin: selectedCoin.coin});
    }, []);

    return (
        <>
            <Container as="div" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                <h2>{selectedCoin && selectedCoin.coin} ({selectedCoin && selectedCoin.displayName})</h2>
                <ButtonToolbar class="mb-2 mb-md-0">
                    <ButtonGroup>
                        <Button variant="light" title="Buy" onClick={showBuyDialogBox}><FaBtc /></Button>
                        <Button variant="light" title="Convert"><FaExchangeAlt /></Button>
                        <Button variant="light" title="Withdraw"><FaArrowUp /></Button>
                        <Button variant="light" title="Get Interest"><FaPercent /></Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Container>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Date and Time</th>
                            <th>Amount</th>
                            <th>Price ARS</th>
                            <th>Spend ARS</th>
                            <th>Price USD</th>
                            <th>Spend USD</th>
                            <th>Wallet</th>
                            <th>Comments</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.transactions && state.transactions.length !== 0 ? state.transactions.map(trx => (
                            <TransactionListItem key={trx.id} transaction={trx}/>
                        )) : <tr><td colspan="10" align="center">No registered transactions</td></tr>}
                    </tbody>
                </table>
            </div>
            <BuyCryptoDialogBox show={state.showBuyCryptoDialogBox}/>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    selectedCoin: selectSelectedCoin
}); 

export default connect(
    mapStateToProps,
    null
)(TransactionList);