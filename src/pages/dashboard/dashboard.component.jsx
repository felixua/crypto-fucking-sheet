import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

//import './dashboard';
import { Container, Row, Col} from 'react-bootstrap';

import NavigationBar from '../../components/navigation-bar/navigation-bar.component';
import SideBar from '../../components/side-bar/side-bar.component';
import TransactionList from '../../components/transaction-list/transaction-list.component';

import './dashboard.styles.scss';


const Dashboard = () => (
    <Fragment>
        <NavigationBar/>
        <Container as="div" fluid={true}>
            <Row>
                <Col as="div" lg={2} md={3} className="d-md-block bg-light sidebar collapse">
                    <SideBar/>
                </Col>
                <Col as="main" lg={10} md={9} className="px-md-4 main main-sm">
                    <TransactionList/>
                </Col>
            </Row>
        </Container>
    </Fragment>
);

export default withRouter(Dashboard);