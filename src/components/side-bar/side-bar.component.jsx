import React from 'react';

import {Container} from 'react-bootstrap';
import CryptoCollection from '../crypto-collection/crypto-collection.component';
import CryptoCollectionAddItem from '../crypto-collection-add-item/crypto-collection-add-item.component';
import CryptoCollectionRemoveItem from '../crypto-collection-remove-item/crypto-collection-remove-item.component';

import './side-bar.styles.scss';

const SideBar = () => (
    <Container id="sidebarMenu" as="nav">
        <Container className="position-sticky pt-3">
            <ul class="nav flex-column">
                <CryptoCollection/>               
                <li>
                   <CryptoCollectionAddItem/> 
                   <CryptoCollectionRemoveItem/>
                </li>
            </ul>
        </Container>
    </Container>
);

export default SideBar;

