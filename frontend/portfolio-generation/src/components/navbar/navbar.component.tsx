import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
function NavbarComponent() {
    return <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand>CEEZER challenge</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link>
                        <Link style={{ textDecoration: 'none' }} to={'/'}>Projects</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link style={{ textDecoration: 'none' }} to={'/generatePortfolio'}>Generate Portofolio</Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavbarComponent