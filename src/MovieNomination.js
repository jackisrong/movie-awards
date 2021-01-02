import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function MovieNomination({ nomination, removeNominationClick }) {
    function handleRemoveNominationClick(e) {
        removeNominationClick(nomination.imdbID);
    }

    return (
        <div>
            <Row>
                <Col xs={3}>
                    <Image src={nomination.Poster} alt={''} fluid></Image>
                </Col>
                <Col>
                    <p>{nomination.Title} ({nomination.Year})</p>
                    <Button variant='primary' size='sm' onClick={handleRemoveNominationClick}>Remove</Button>
                </Col>
            </Row>
        </div>
    );
}

export default MovieNomination;  