import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function MovieSearch({ searchChange }) {
    return (
        <>
            <h3>Movie Search</h3>
            <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                    <InputGroup.Text>Search</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder='Search for a movie!' aria-label='Search for a movie!' onChange={searchChange} />
            </InputGroup>
        </>
    );
}

export default MovieSearch; 