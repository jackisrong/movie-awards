import MovieNomination from './MovieNomination';
import Alert from 'react-bootstrap/Alert';

function MovieNominations({ nominations, removeNominationClick }) {
    return (
        <>
            <h3>Your Nominations</h3>
            {
                nominations.length === 0 &&
                <Alert variant='primary'>
                    You don't have any nominations :( Search for a movie to start nominating!
                </Alert>
            }
            {
                nominations.map(nomination => {
                    return <MovieNomination key={nomination.imdbID} nomination={nomination} removeNominationClick={removeNominationClick} />
                })
            }
        </>
    );
}

export default MovieNominations;  