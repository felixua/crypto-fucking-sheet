import React, { useEffect, useContext } from 'react';

import { Nav, Navbar, Form } from 'react-bootstrap';
import { auth } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchCoinsStartAsync } from '../../redux/coins/coins.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectUserCoins } from '../../redux/coins/coins.selectors';

import { selectCoin } from '../../redux/coins/coins.actions';

import { Context } from '../../context/transactionListContext';

import './navigation-bar.styles.scss';

const handleCoinClick = ({ event, userCoins, dispatchSelectCoin, fetchTransactionsList, currentUser }) => {
    event.preventDefault();
    const { value } = event.target;

    if (userCoins && userCoins.some(coin => coin.coin === value)) {
        dispatchSelectCoin(value);
        fetchTransactionsList({ currentUser: currentUser, selectedCoin: value });
    }
};

const NavigationBar = ({ currentUser, userCoins, dispatchSelectCoin }) => {
    const { fetchTransactionsList } = useContext(Context);

    useEffect(() => {
        fetchCoinsStartAsync(currentUser);
    }, []);

    return (
        <Navbar as="header" bg="dark" variant="dark" fixed="top" expand="lg" className="navbar p-0 shadow flex-md-nowrap">
            <Navbar.Brand href="#home" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Crypto Fucking Sheet</Navbar.Brand>
            <Navbar.Toggle as="button" className="navbar-toggler position-absolute d-md-none collapsed" aria-controls="sidebarMenu" as="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-expanded="false" aria-label="Toggle navigation" />
            <Form.Control as="input" type="text" list="cryptolist"
                className="form-control form-control-dark w-100"
                placeholder="Search" aria-label="Search"
                onChange={(event) => handleCoinClick({ event, userCoins, dispatchSelectCoin, fetchTransactionsList, currentUser })} />
            <datalist id="cryptolist">
                {userCoins !== null ? userCoins.map(({ coin, displayName }) => (
                    <option value={coin}>{displayName}</option>
                )) : null}
            </datalist>
            <Nav className="navbar-nav px-3">
                <Nav.Item className="text-nowrap">
                    <Nav.Link onClick={() => auth.signOut()}>Sign Out</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};
const mapDispatchToProps = dispatch => ({
    fetchCoinsStartAsync: (user) => dispatch(fetchCoinsStartAsync(user)),
    dispatchSelectCoin: (coin) => dispatch(selectCoin(coin))
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userCoins: selectUserCoins
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);