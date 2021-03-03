import React from 'react';

import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import {Container} from 'react-bootstrap';

import './side-bar.styles.scss';

const SideBar = () => (
    <Container id="sidebarMenu" as="nav">
        <Container className="position-sticky pt-3">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                        <FaBitcoin className="feather" />
                        Bitcoin
                     </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <FaEthereum className="feather" />
                        Ethereum
                    </a>
                </li>
            </ul>
        </Container>
    </Container>
);

export default SideBar;

