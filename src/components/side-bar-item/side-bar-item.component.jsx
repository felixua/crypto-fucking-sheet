import React from 'react';

import './side-bar-item.styles.scss';

import {Badge} from 'react-bootstrap';

const SideBarItem = ({coin, displayName, primary}) => (
    <>
    <li class="nav-item">
        <a class={`nav-link ${primary ? 'active' : ''}`} aria-current="page" href="#">                    
            <Badge pill bg={`${primary ? 'primary' : ''}`}>{coin}</Badge>
            {displayName}
        </a>
    </li>
    </>
); 

export default SideBarItem;