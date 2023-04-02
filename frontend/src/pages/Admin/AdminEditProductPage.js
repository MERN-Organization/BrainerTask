import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {} from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';

// const onHover = {
//     cursor: 'pointer',
//     position: 'absolute',
//     left: '5px',
//     top: '-10px',
//     transform: 'scale(2.7)'
// };

const AdminEditProductPage = () => {
    let { id } = useParams();
    const APIURLHIT = 'http://localhost:3001/api/products';
    const [specificProductData, setSpecificProductData] = useState();
    const [name, setName] = useState('');
    const [desc, setdesc] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const obj = {
            name: name || specificProductData?.name,
            description: desc || specificProductData?.description,
            quantity: stock || specificProductData?.quantity,
            price: price || specificProductData?.price
        };
        // if (!isEmpty(name && desc && stock && price)) {
        EditProduct(obj);
        // }
    };

    const EditProduct = (obj) => {
        axios
            .put(`${APIURLHIT}/update/${id}`, obj)
            .then((res) => {
                console.log('This is data and more in 53', res);
                navigate('/manage_products');
                // setSpecificProductData(res.data);
            })
            .catch((err) => err);
    };

    useEffect(() => {
        axios
            .get(`${APIURLHIT}/${id}`)
            .then((res) => {
                console.log('This is data and more', res);
                setSpecificProductData(res.data);
            })
            .catch((err) => err);
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/manage_products" className="btn btn-info my-3">
                        Go Back
                    </Link>
                </Col>
                <Col md={6}>
                    <h1>Edit product</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                required
                                type="text"
                                defaultValue={specificProductData?.name}
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
                                defaultValue={specificProductData?.description}
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
                                defaultValue={specificProductData?.quantity}
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
                                type="text"
                                defaultValue={specificProductData?.price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                        </Form.Group>

                        {/* <Form.Group
                            controlId="formFileMultiple"
                            className="mb-3 mt-3"
                        >
                            <Form.Label>Images</Form.Label>
                            <Row>
                                <Col style={{ position: 'relative' }} xs={3}>
                                    <Image
                                        src="/images/monitors-category.png"
                                        fluid
                                    />
                                    <i
                                        style={onHover}
                                        className="bi bi-x text-danger"
                                    ></i>
                                </Col>
                                <Col style={{ position: 'relative' }} xs={3}>
                                    <Image
                                        src="/images/monitors-category.png"
                                        fluid
                                    />
                                    <i
                                        style={onHover}
                                        className="bi bi-x text-danger"
                                    ></i>
                                </Col>
                            </Row>
                            <Form.Control required type="file" multiple />
                        </Form.Group> */}
                        <Button variant="primary" type="submit">
                            UPDATE
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminEditProductPage;
