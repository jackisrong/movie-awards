import './MovieNominations.css';
import MovieNomination from './MovieNomination';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Alert from 'react-bootstrap/Alert';

function MovieNominations({ nominations, removeNominationClick }) {
    return (
        <>
            <h3>Your Nominations</h3>
            <Alert variant='primary' show={nominations.length === 0}>
                You don't have any nominations :( Search for a movie to start nominating!
            </Alert>
            <TransitionGroup>
                {
                    nominations.map(nomination => {
                        return (
                            <CSSTransition key={nomination.imdbID} classNames='nominations' timeout={300}>
                                <MovieNomination key={nomination.imdbID} nomination={nomination} removeNominationClick={removeNominationClick} />
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>
        </>
    );
}

export default MovieNominations;  