import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const APIURLHIT = 'http://localhost:3001/api/users';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongCredentialsStatus, setWrongCredentialsStatus] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isEmpty(email) && !isEmpty(password)) {
            const object = {
                email: email,
                password: password
            };
            axios
                .post(`${APIURLHIT}/login`, object, { withCredentials: true })
                .then((res) => {
                    if (res.data.cookie) {
                        localStorage.setItem('access_token', res.data.cookie);
                    }
                    navigate('/products');
                })
                .catch((err) => {
                    setWrongCredentialsStatus(true);
                    console.log('Error Happend While Making API Call', err);
                });
        }
    };

    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6}>
                    <h1>Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name="email"
                                required
                                type="text"
                                placeholder="Enter email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                required
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        {wrongCredentialsStatus && (
                            <Alert show={true} variant="danger">
                                Wrong credentials
                            </Alert>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
