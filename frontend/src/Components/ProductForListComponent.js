import { Card, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProductForListComponent = (props) => {
    return (
        <Card style={{ marginTop: '30px', marginBottom: '50px' }}>
            <Row>
                {/* <Col lg={5}>
          <Card.Img variant="top" src={"/images/" + images[idx] + "-category.png"} />
        </Col> */}
                <Col lg={7}>
                    <Card.Body>
                        <Card.Title>{props?.data?.name}</Card.Title>
                        <Card.Text>{props?.data?.description}</Card.Text>

                        <Card.Text className="h4">
                            Price: ₹{props?.data?.price}
                        </Card.Text>
                        <Card.Text className="h4">
                            Quantity: {props?.data?.quantity}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default ProductForListComponent;
