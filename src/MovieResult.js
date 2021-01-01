import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function MovieResult({ result, nominations, nominateClick }) {
    function handleNominateClick(e) {
        nominateClick(result);
    }

    function setButton() {
        if (nominations.some(nomination => nomination.imdbID === result.imdbID)) {
            return <Button variant='primary' size='sm' onClick={handleNominateClick} title='You have already nominated this movie!' disabled>Nominate</Button>;
        }
        return <Button variant='primary' size='sm' onClick={handleNominateClick}>Nominate</Button>;
    }

    return (
        <>
            <Row>
                <Col xs={3}>
                    <Image src={result.Poster} alt={''} fluid></Image>
                </Col>
                <Col>
                    <p>{result.Title} ({result.Year})</p>
                    {setButton()}
                </Col>
            </Row>
        </>
    );
}

export default MovieResult;  