import MovieResult from './MovieResult';

function MovieResults({ searchTerm, results, nominations, nominateClick }) {
    return (
        <>
            <h3>Results for "{searchTerm}"</h3>
            {
                results.map(result => {
                    return <MovieResult key={result.imdbId} result={result} nominations={nominations} nominateClick={nominateClick} />
                })
            }
        </>
    );
}

export default MovieResults;  