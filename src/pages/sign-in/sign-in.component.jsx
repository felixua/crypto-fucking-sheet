import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Form, Nav, Navbar, FormLabel, Button } from 'react-bootstrap';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/brand/crypto-fucking-logo.svg';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(
               this.state.email, 
               this.state.password
            );
            this.setState({ email: '', password: '' }); 
            this.props.history.push("/");
        } catch (error) {
            console.log(error); 
        }
        
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const {email, password} = this.state;

        return (
            <Container as="div" className="signin-page">
                <Navbar as="header" bg="dark" variant="dark" fixed="top" expand="lg" className="navbar p-0 shadow flex-md-nowrap">
                    <Nav className="navbar-nav justify-content-end px-3">
                        <Nav.Item className="text-nowrap">
                            <Nav.Link href="#">SIGN UP</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                <Container as="main" className="form-signin">
                    <Form onSubmit={this.handleSubmit}>
                        <Logo className="mb-4" alt="" width="72" height="57"/>
                        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                        <Form.Control as="input" type="email" id="inputEmail" 
                                      name="email"
                                      className="form-control" placeholder="Email address"
                                      value={email} onChange={this.handleChange}
                                      required autoFocus />
                        <Form.Control as="input" type="password" id="inputPassword" 
                                      name="password"
                                      className="form-control" placeholder="Password" 
                                      value={password} onChange={this.handleChange}
                                      required />
                        <Container as="div" className="checkbox mb-3">
                            <Form.Check value="remember-me" label="Remember me"/> 
                        </Container>
                        <Button className="btn btn-lg btn-primary" size="sm" type="submit">Sign in</Button>
                        <Button className="btn btn-lg btn-primary" size="sm" onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</Button>
                        <p>Also you can <Link to="/sign-up">sign up here</Link></p>
                        <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
                    </Form>
                </Container>
            </Container>
        );
    }
};

export default withRouter(SignIn);