import React from 'react';

import { FiPlus } from 'react-icons/fi';
import {Container, Button} from 'react-bootstrap';
import CryptoCollection from '../crypto-collection/crypto-collection.component';
import CryptoCollectionAddItem from '../crypto-collection-add-item/crypto-collection-add-item.component';

import './side-bar.styles.scss';

const SideBar = () => (
    <Container id="sidebarMenu" as="nav">
        <Container className="position-sticky pt-3">
            <ul class="nav flex-column">
                <CryptoCollection/>               
                <li>
                   <CryptoCollectionAddItem/> 
                </li>
            </ul>
        </Container>
    </Container>
);

export default SideBar;

