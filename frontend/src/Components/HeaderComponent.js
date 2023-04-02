import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';

const HeaderComponent = () => {
    const currentUrl = useLocation();

    const logoutAndClearData = () => {
        deleteCookie('access_token');
        deleteLocalStorage('access_token');
    };

    const deleteLocalStorage = (name) => {
        localStorage.removeItem(name);
    };

    localStorage.removeItem('mytime');

    const deleteCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    const logout = () => {
        logoutAndClearData();
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand href="/">BEST ONLINE SHOP</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {currentUrl?.pathname !== '/' && (
                        <Nav>
                            {localStorage.getItem('access_token') ? (
                                <LinkContainer to="/">
                                    <Nav.Link onClick={() => logout()}>
                                        Logout
                                    </Nav.Link>
                                </LinkContainer>
                            ) : (
                                <LinkContainer to="/">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                            )}

                            <LinkContainer to="/manage_products">
                                <Nav.Link>Manage Products</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    )}
                    {currentUrl?.pathname !== '/products' && (
                        <Nav>
                            <LinkContainer to="/products">
                                <Nav.Link>Products</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderComponent;
