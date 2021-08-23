import React from 'react';

import { FiPlus } from 'react-icons/fi';
import {Container, Button} from 'react-bootstrap';
import SideBarItem from '../side-bar-item/side-bar-item.component';

import './side-bar.styles.scss';

const SideBar = () => (
    <Container id="sidebarMenu" as="nav">
        <Container className="position-sticky pt-3">
            <ul class="nav flex-column">
                <SideBarItem id="BTC" coin="BTC" displayName="Bitcoin" primary={true} />
                <SideBarItem id="ETH" coin="ETH" displayName="Ethereum" primary={false} />                
                <li>
                    <Button variant="light" ><FiPlus /></Button>
                </li>
            </ul>
        </Container>
    </Container>
);

export default SideBar;

