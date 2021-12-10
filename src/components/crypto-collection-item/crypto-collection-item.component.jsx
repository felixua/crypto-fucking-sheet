import React from 'react';

import './crypto-collection-item.styles.scss';

import {Badge} from 'react-bootstrap';

const CryptoCollectionItem = ({coin, displayName, primary}) => (
    <>
    <li class="nav-item">
        <a class={`nav-link ${primary ? 'active' : ''}`} aria-current="page" href="#">
            <Badge pill bg={`${primary ? 'primary' : ''}`} text={`${primary ? 'light' : ''}`}>{coin}</Badge>&nbsp;                    
            {displayName}
        </a>
    </li>
    </>
); 

export default CryptoCollectionItem;