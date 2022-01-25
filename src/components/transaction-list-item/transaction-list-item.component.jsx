import React, {useContext} from 'react';

import { FaBtc, FaExchangeAlt, FaArrowUp, FaPercent, FaRegMinusSquare } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectSelectedCoin } from '../../redux/coins/coins.selectors';

import { Context } from '../../context/transactionListContext';

const yyyymmdd = date => {
    const dat = new Date(Date(date));
    var mm = dat.getMonth() + 1;
    var dd = dat.getDate();

    return [dat.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
};

const hhmm = date => {
    const dat = new Date(Date(date));
    return dat.toLocaleTimeString().slice(0, -3);
}

const printDateTime = date => {
    return(
        <>
        {yyyymmdd(date)}{' '}{hhmm(date)}
        </>
    );
};

const printTransactionType = type => {
    switch (type) {
        case '-1':
            return (<FaRegMinusSquare/>);
        case '0':
            return (<FaExchangeAlt/>);
        case '1':
            return (<FaBtc/>);
        case '2':
            return (<FaArrowUp/>);
        case '3':
            return (<FaPercent/>);
        default:
            break;
    }
};

const TransactionListItem = ({ currentUser, selectedCoin, transaction, reduxDispatcher }) => {
    const {removeTransaction} = useContext(Context);
    return (
        <>
            <tr>
                <td>{printTransactionType(transaction.transactionType)}</td>
                <td>{printDateTime(transaction.dateTime)}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.price}</td>
                <td>{transaction.spend}</td>
                <td>{transaction.priceUSD}</td>
                <td>{transaction.spendUSD}</td>
                <td>{transaction.wallet}</td>
                <td>{transaction.comments}</td>
                <td><a href="#" onClick={() => removeTransaction({currentUser, selectedCoin, id: transaction.id, reduxDispatcher})}><AiOutlineDelete /></a></td>
            </tr>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    selectedCoin: selectSelectedCoin
});

const mapDispatchToProps = dispatch => ({
    reduxDispatcher: (reduxDispatcher) => dispatch(reduxDispatcher)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TransactionListItem);

