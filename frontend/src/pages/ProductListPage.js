import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Row,
    Col,
    Container,
    ListGroup,
    Button,
    InputGroup,
    Form
} from 'react-bootstrap';
import PaginationComponent from '../Components/PaginationComponent';
import ProductForListComponent from '../Components/ProductForListComponent';
import SortOptionsComponent from '../Components/SortOptionsComponent';
import { addProducts } from '../Redux/Actions/ProductAction';
import cookie from 'cookie';

const options = {
    url: 'http://localhost:3001/api/products',
    method: 'GET',
    headers: {
        Cookie: cookie.serialize(
            'access_token',
            localStorage.getItem('access_token')
        )
    },

    withCredentials: true
};

const ProductListPage = () => {
    const APIURLHIT = 'http://localhost:3001/api/products';
    const [allProducts, setAllProducts] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const productsFromRedux = useSelector(
        (state) => state.Products.allProducts
    );

    const getDatafromRedux = () => {
        setSearchQuery('');
        setAllProducts({ allProducts: productsFromRedux[0] });
    };

    useEffect(() => {
        axios(options)
            .then((res) => {
                if (res?.data?.allProducts?.length > 0) {
                    setAllProducts(res?.data);
                    setDataInRedux(res?.data?.allProducts);
                }
            })
            .catch((err) => {
                console.log('Error While Fetching Product List', err);
            });
    }, []);

    const setDataInRedux = (data) => {
        dispatch(addProducts(data));
    };

    const sortProducts = (value) => {
        axios
            .get(`${APIURLHIT}?sort=${value}`)
            .then((res) => {
                if (res?.data?.allProducts?.length > 0) {
                    setAllProducts(res?.data);
                }
            })
            .catch((err) => {
                console.log('Error While Fetching Product List', err);
            });
    };

    const searchProducts = () => {
        axios
            .get(`${APIURLHIT}?searchQuery=${searchQuery}`)
            .then((res) => {
                setAllProducts(res?.data);
            })
            .catch((err) => {
                console.log('Error While Fetching Product List', err);
            });
    };

    const paginate = (value) => {
        axios
            .get(`${APIURLHIT}?pageNum=${value}`)
            .then((res) => {
                if (res?.data?.allProducts?.length > 0) {
                    setAllProducts(res?.data);
                }
            })
            .catch((err) => {
                console.log('Error While Fetching Product List', err);
            });
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="mb-3 mt-3">
                            <SortOptionsComponent
                                setSortOption={sortProducts}
                            />
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup variant="flush">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Search in shop ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="warning">
                                <i
                                    className="bi bi-search text-dark"
                                    onClick={() => searchProducts()}
                                ></i>
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => getDatafromRedux()}
                            >
                                Reset
                            </Button>
                        </InputGroup>
                    </ListGroup>
                </Col>
                <Col md={9}>
                    {allProducts?.allProducts?.length > 0 ? (
                        allProducts?.allProducts.map((ele, idx) => {
                            return (
                                <ProductForListComponent key={idx} data={ele} />
                            );
                        })
                    ) : (
                        <h1>No Products Avaliable</h1>
                    )}

                    <PaginationComponent
                        paginationLinksNumber={
                            allProducts?.paginationLinksNumber
                        }
                        pageNum={allProducts?.pageNum}
                        searchQuery={searchQuery}
                        paginate={paginate}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductListPage;
