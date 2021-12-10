import React from 'react';
import {Popover, Overlay, Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors'; 
import { addCoinsStartAsync } from '../../redux/coins/coins.actions';
import { FiPlus } from 'react-icons/fi';
import { FcAddRow } from 'react-icons/fc';

import './crypto-collection-add-item.styles.scss';

class CryptoCollectionAddItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            target: null,
            ref: React.createRef(),
            inputCoinName: "",
            inputCoinDescription: ""
        };
    }

    setShow(bShow) {
        this.setState({ show: bShow} );
    }

    setTarget(bTarget) {
        this.setState({ target: bTarget });
    }

    handleClick = (event) => {
        this.setShow(!this.state.show);
        this.setTarget(event.target);
    }

    handleAddCoin = (event) => {
        const {addCoinsStartAsync, currentUser} = this.props;
        const {inputCoinName, inputCoinDescription} = this.state;

        addCoinsStartAsync(currentUser,inputCoinName,inputCoinDescription);

        this.setState({
            show: false,
            inputCoinName: "",
            inputCoinDescription: ""           
        });
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const {show, target, ref, inputCoinName, inputCoinDescription} = this.state;
        
        return (
            <div ref={ref}>
                <Button variant="light" onClick={this.handleClick}><FiPlus /></Button>
                <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref}
                    containerPadding={20} >
                        <Popover id="popover-contained">
                            <Popover.Header as="h3">Add coin</Popover.Header>
                            <Popover.Body>
                                <Form onSubmit={this.handleAddCoin}>
                                    <Form.Control as="input" type="text" id="inputCoinName" 
                                        name="inputCoinName"
                                        className="input-coin-name" placeholder="Coin" 
                                        value={inputCoinName} onChange={this.handleChange}
                                        required autoFocus />
                                    <Form.Control as="input" type="text" id="inputCoinDescription" 
                                        name="inputCoinDescription"
                                        className="input-coin-description" placeholder="Description" 
                                        value={inputCoinDescription} onChange={this.handleChange}
                                        required />
                                    <Button variant="light" className="add-btn" onClick={this.handleAddCoin}><FcAddRow /></Button>        
                                </Form>
                            </Popover.Body>
                        </Popover>
                </Overlay>
            </div>
        );
    }    
}

const mapDispatchToProps = dispatch => ({
    addCoinsStartAsync: (currentUser,inputCoinName,inputCoinDescription) => dispatch(addCoinsStartAsync(currentUser,inputCoinName,inputCoinDescription))
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
}); 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoCollectionAddItem);