import MovieResult from './MovieResult';
import Alert from 'react-bootstrap/Alert';

function MovieResults({ searchTerm, results, nominations, queryErrorMessage, nominateClick }) {
    return (
        <>
            <h3>Results for "<i>{searchTerm}</i>"</h3>
            <Alert variant='danger' show={results.length === 0 && searchTerm}>
                {queryErrorMessage} Keep typing or try another movie title.
            </Alert>
            {
                results.map(result => {
                    return <MovieResult key={result.imdbId} result={result} nominations={nominations} nominateClick={nominateClick} />
                })
            }
        </>
    );
}

export default MovieResults;  