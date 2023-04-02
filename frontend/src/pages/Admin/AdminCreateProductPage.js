import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCreateProductPage = () => {
    const APIURLHIT = 'http://localhost:3001/api/products';
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [desc, setdesc] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [unenrichProduct, setUnenrichProduct] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const obj = {
            name: name,
            description: desc,
            quantity: stock,
            price: price
        };

        if (!isEmpty(name && desc && stock && price)) {
            createProduct(obj);
        } else {
            setUnenrichProduct(true);
        }
    };

    const createProduct = (obj) => {
        axios
            .post(`${APIURLHIT}/add`, obj)
            .then((res) => {
                navigate('/manage_products');
            })
            .catch((err) => {
                console.log('ere', err);
            });
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/manage_products" className="btn btn-info my-3">
                        Go Back
                    </Link>
                </Col>
                <Col md={6}>
                    <h1>Create a new product</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                required
                                type="text"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                required
                                as="textarea"
                                rows={3}
                                onChange={(e) => {
                                    setdesc(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                name="count"
                                required
                                type="number"
                                onChange={(e) => {
                                    setStock(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                name="price"
                                required
                                type="number"
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="formFileMultiple"
                            className="mb-3 mt-3"
                        >
                            <Form.Label>Images</Form.Label>

                            <Form.Control type="file" multiple />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
            {unenrichProduct && (
                <Alert show={true} variant="danger">
                    Please Fill In All the Details
                </Alert>
            )}
        </Container>
    );
};

export default AdminCreateProductPage;
