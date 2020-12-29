function MovieSearch({ searchChange }) {
    return (
        <>
            <h3>Movie Title</h3>
            <input type='text' placeholder='Search for a movie!' onChange={searchChange}></input>
        </>
    );
}

export default MovieSearch; 