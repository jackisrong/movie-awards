import './MovieNominations.css';
import MovieNomination from './MovieNomination';
import { CSSTransitionGroup } from 'react-transition-group';
import Alert from 'react-bootstrap/Alert';

function MovieNominations({ nominations, removeNominationClick }) {
    return (
        <>
            <h3>Your Nominations</h3>
            <Alert variant='primary' show={nominations.length === 0}>
                You don't have any nominations :( Search for a movie to start nominating!
            </Alert>
            <CSSTransitionGroup transitionName="nominations">
                {
                    nominations.map(nomination => {
                        return <MovieNomination key={nomination.imdbID} nomination={nomination} removeNominationClick={removeNominationClick} />
                    })
                }
            </CSSTransitionGroup>
        </>
    );
}

export default MovieNominations;  