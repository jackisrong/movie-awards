import MovieNomination from './MovieNomination';

function MovieNominations({ nominations, removeNominationClick }) {
    return (
        <>
            <h3>Your Nominations</h3>
            {
                nominations.map(nomination => {
                    return <MovieNomination key={nomination.imdbID} nomination={nomination} removeNominationClick={removeNominationClick} />
                })
            }
        </>
    );
}

export default MovieNominations;  