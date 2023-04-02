import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const PaginationComponent = ({
    searchQuery,
    paginationLinksNumber,
    pageNum,
    paginate
}) => {
    const search = searchQuery ? `search/${searchQuery}/` : '';
    const url = '';

    return (
        <Pagination>
            <LinkContainer to="">
                <Pagination.Prev
                    disabled={pageNum === 1}
                    onClick={() => paginate(pageNum - 1)}
                />
            </LinkContainer>
            {[...Array(paginationLinksNumber).keys()].map((x) => (
                // <LinkContainer key={x + 1} to={`${url}${x + 1}`}>
                <Pagination.Item
                    active={x + 1 === pageNum}
                    onClick={() => paginate(x + 1)}
                >
                    {x + 1}
                </Pagination.Item>
                // </LinkContainer>
            ))}
            <LinkContainer disabled={pageNum === paginationLinksNumber} to={''}>
                <Pagination.Next onClick={() => paginate(pageNum + 1)} />
            </LinkContainer>
        </Pagination>
    );
};

export default PaginationComponent;
