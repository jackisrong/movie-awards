import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function MovieResult({ result, nominations, nominateClick }) {
    function handleNominateClick(e) {
        nominateClick(result.imdbID);
    }

    function setButton() {
        if (nominations?.includes(result.imdbID))
            return <Button variant='primary' size='sm' onClick={handleNominateClick} disabled>Nominate</Button>;
        return <Button variant='primary' size='sm' onClick={handleNominateClick}>Nominate</Button>;
    }

    return (
        <>
            <Row>
                <Col>
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