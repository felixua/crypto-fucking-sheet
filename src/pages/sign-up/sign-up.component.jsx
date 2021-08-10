import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Form, Navbar, Button } from 'react-bootstrap';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';
import { ReactComponent as Logo } from '../../assets/brand/crypto-fucking-logo.svg';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        } 
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            }); 
        } catch (error) {
            console.error(error);
        }
    } 

    handleChange = async event => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;

        return(
            <Container as="div" className="signup-page">
                <Navbar as="header" bg="dark" variant="dark" fixed="top" expand="lg" className="navbar p-0 shadow flex-md-nowrap">
                </Navbar>
                <Container as="main" className="form-signup">
                    <Form onSubmit={this.handleSubmit}>
                        <Logo className="mb-4" alt="" width="72" height="57"/>
                        <h1 class="h3 mb-3 fw-normal">Please sign up with email and password</h1>
                        <Form.Control as="input" type="text" id="inputDisplayName" 
                                      name="displayName"
                                      className="form-control" placeholder="User name" 
                                      value={displayName} onChange={this.handleChange}
                                      required autoFocus />
                        <Form.Control as="input" type="email" id="inputEmail" 
                                      name="email"
                                      className="form-control" placeholder="Email address" 
                                      value={email} onChange={this.handleChange}
                                      required />
                        <Form.Control as="input" type="password" id="inputPassword"
                                      name="password" 
                                      className="form-control" placeholder="Password" 
                                      value={password} onChange={this.handleChange}
                                      required />
                        <Form.Control as="input" type="password" id="inputConfirmPassword"
                                      name="confirmPassword" 
                                      className="form-control" placeholder="Confirm password" 
                                      value={confirmPassword} onChange={this.handleChange}
                                      required />
                        <Button className="btn btn-lg btn-primary" size="lg" type="submit">Sign up</Button>
                        <p><Link to="/sign-in">Back to login page</Link></p>
                    </Form>  
                </Container>      
            </Container>            
        );
    }
};

export default withRouter(SignUp);