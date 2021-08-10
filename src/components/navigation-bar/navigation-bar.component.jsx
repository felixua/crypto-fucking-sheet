import React from 'react';

import { Nav, Navbar, Form } from 'react-bootstrap';
import { auth } from '../../firebase/firebase.utils';

import './navigation-bar.styles.scss';

const NavigationBar = () => (
    <Navbar as="header" bg="dark" variant="dark" fixed="top" expand="lg" className="navbar p-0 shadow flex-md-nowrap">
        <Navbar.Brand href="#home" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Crypto Fucking Sheet</Navbar.Brand>
        <Navbar.Toggle as="button" className="navbar-toggler position-absolute d-md-none collapsed" aria-controls="sidebarMenu" as="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-expanded="false" aria-label="Toggle navigation" />
        <Form.Control as="input" type="text" className="form-control form-control-dark w-100" placeholder="Search" aria-label="Search" />
        <Nav className="navbar-nav px-3">
            <Nav.Item className="text-nowrap">
                <Nav.Link onClick={() => auth.signOut()}>Sign Out</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
);

export default NavigationBar;