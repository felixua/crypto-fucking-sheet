import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from '../../context/transactionListContext';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectSelectedCoin } from '../../redux/coins/coins.selectors';

const yyyymmdd = date => {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
};

const hhmm = date => {
    return date.toLocaleTimeString().slice(0, -3);
}

const submit = ({event, submitBuyDialogBox, closeBuyDialogBox, reduxDispatcher, currentUser, selectedCoin, buyData}) => {
    event.preventDefault();
    submitBuyDialogBox({currentUser, selectedCoin, buyData, reduxDispatcher});

    closeBuyDialogBox();
}

const BuyCryptoDialogBox = ({ currentUser, selectedCoin, show, reduxDispatcher}) => {
    const { closeBuyDialogBox, submitBuyDialogBox } = useContext(Context);
    const [buyDate, setBuyDate] = useState(yyyymmdd(new Date()));
    const [buyTime, setBuyTime] = useState(hhmm(new Date()));
    const [buyAmount, setBuyAmount] = useState('0.00000000');
    const [buyPrice, setBuyPrice] = useState('0.00');
    const [buySpend, setBuySpend] = useState('0.00');
    const [buyPriceUSD, setBuyPriceUSD] = useState('0.00');
    const [buySpendUSD, setBuySpendUSD] = useState('0.00');
    const [buyWallet, setBuyWallet] = useState('default');
    const [buyComments, setBuyComments] = useState('');

    const buyData = {
        date: buyDate,
        time: buyTime,
        amount: buyAmount,
        price: buyPrice,
        spend: buySpend,
        priceUSD: buyPriceUSD,
        spendUSD: buySpendUSD,
        wallet: buyWallet,
        comments: buyComments
    };

    return (
        <Modal show={show} onHide={closeBuyDialogBox} reduxDispatcher={reduxDispatcher}> 
            <Form onSubmit={(event) => 
                submit({event, 
                        submitBuyDialogBox, 
                        closeBuyDialogBox,
                        reduxDispatcher,
                        currentUser,
                        selectedCoin, 
                        buyData})}>
                <Modal.Header closeButton>
                    <Modal.Title>Buy crypto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Form.Label htmlFor="buyDate">Date:</Form.Label>
                                    <Form.Control as="input" type="date" id="buyDate"
                                        name="buyDate"
                                        defaultValue={buyDate} onChange={(event) => setBuyDate(event.target.value)}
                                        required autoFocus />
                                </td>
                                <td>
                                    <Form.Label htmlFor="buyTime">Time:</Form.Label>
                                    <Form.Control as="input" type="time" id="buyTime"
                                        name="buyTime"
                                        defaultValue={buyTime} onChange={(event) => setBuyTime(event.target.value)}
                                        required />
                                </td>
                            </tr>
                            <tr><td>
                                <Form.Label htmlFor="buyAmount">Amount:</Form.Label>
                                <Form.Control as="input" type="number" id="buyAmount"
                                    name="buyAmount" step=".00000001"
                                    defaultValue={buyAmount} onChange={(event) => setBuyAmount(event.target.value)}
                                    required />
                            </td></tr>
                            <tr>
                                <td>
                                    <Form.Label htmlFor="buyPrice">Price, ARS:</Form.Label>
                                    <Form.Control as="input" type="number" id="buyPrice"
                                        name="buyPrice"
                                        defaultValue={buyPrice} onChange={(event) => setBuyPrice(event.target.value)}
                                        required />
                                </td>
                                <td>
                                    <Form.Label htmlFor="buySpend">Spend, ARS:</Form.Label>
                                    <Form.Control as="input" type="number" id="buySpend"
                                        name="buySpend"
                                        defaultValue={buySpend} onChange={(event) => setBuySpend(event.target.value)}
                                        required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Label htmlFor="buyPriceUSD">Price, USD:</Form.Label>
                                    <Form.Control as="input" type="number" id="buyPriceUSD"
                                        name="buyPriceUSD"
                                        defaultValue={buyPriceUSD} onChange={(event) => setBuyPriceUSD(event.target.value)}
                                        required />
                                </td>
                                <td>
                                    <Form.Label htmlFor="buySpendUSD">Spend, USD:</Form.Label>
                                    <Form.Control as="input" type="number" id="buySpendUSD"
                                        name="buySpendUSD"
                                        defaultValue={buySpendUSD} onChange={(event) => setBuySpendUSD(event.target.value)}
                                        required />
                                </td>
                            </tr>
                            <tr><td>
                                <Form.Label htmlFor="buyWallet">Wallet:</Form.Label>
                                <Form.Control as="input" type="text" id="buyWallet"
                                    name="buyWallet"
                                    defaultValue={buyWallet} onChange={(event) => setBuyWallet(event.target.value)}
                                    required />
                            </td></tr>
                            <tr><td>
                                <Form.Label htmlFor="buyComments">Comments:</Form.Label>
                                <Form.Control as="input" type="text" id="buyComments"
                                    name="buyComments"
                                    defaultValue={buyComments} onChange={(event) => setBuyComments(event.target.value)}
                                    required />
                            </td></tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeBuyDialogBox}>
                        Close
          </Button>
                    <Button variant="primary" type="submit">
                        Buy
          </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    selectedCoin: selectSelectedCoin
});

const mapDispatchToProps = dispatch => ({
    reduxDispatcher: (reduxDispatcher) => dispatch(reduxDispatcher)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyCryptoDialogBox);


