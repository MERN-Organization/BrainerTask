import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminProductsPage = () => {
    const APIURLHIT = 'http://localhost:3001/api/products';
    const RecordsPerPAgeAPI =
        'http://localhost:3001/api/products?recordsPerPage=0';
    const [allProducts, setAllProducts] = useState([]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this Product?')) {
            axios
                .delete(`${APIURLHIT}/delete/${id}`)
                .then((res) => {
                    if (res?.data?.allProducts?.length > 0) {
                        setAllProducts(res?.data?.allProducts);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        axios
            .get(RecordsPerPAgeAPI)
            .then((res) => {
                if (res?.data?.allProducts?.length > 0) {
                    setAllProducts(res?.data?.allProducts);
                }
            })
            .catch((err) => {
                console.log('Error While Fetching Product List', err);
            });
    }, []);
    return (
        <Row className="m-5">
            <Col md={10}>
                <h1>
                    Product List{' '}
                    <LinkContainer to="/add_product">
                        <Button variant="primary" size="lg">
                            Create new
                        </Button>
                    </LinkContainer>
                </h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <LinkContainer
                                        to={`/edit_product/${item?._id}`}
                                    >
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {' / '}
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(item?._id)}
                                    >
                                        <i className="bi bi-x-circle"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default AdminProductsPage;
