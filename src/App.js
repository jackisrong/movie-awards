import { useState, useEffect } from 'react';
import MovieSearch from './MovieSearch';
import MovieResults from './MovieResults';
import MovieNominations from './MovieNominations';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const API_URL_BASE = 'http://www.omdbapi.com/';
const API_URL_KEY = '&apikey=52aab954';
const API_URL_TYPE = '&type=movie';

const LOCAL_STORAGE_KEY = 'movieAwards.nominationIds';

/*
TODO:
- bootstrap & css
- clean up
*/

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [nominations, setNominations] = useState([]);

    // get nominations from local storage on first load
    useEffect(() => {
        let storedNominations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedNominations)
            setNominations(storedNominations);
    }, []);

    // manage when nominations change
    useEffect(() => {
        // store nominations into local storage when a new movie is nominated
        // TODO: we're storing the entire JSON object of the nomination that's
        //       returned by the API. Ideally, we want to only store the IMDB
        //       ID and re-query the API on load to save space and in case
        //       data was changed on the API side
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nominations));

        // check if we have 5 nominations to display banner
        if (nominations.length === 5) {
            // display banner
        }
    }, [nominations]);

    // when search term is changed, call search API
    useEffect(searchAPI, [searchTerm]);

    // call API with search term
    function searchAPI() {
        fetch(API_URL_BASE + '?s=' + searchTerm + API_URL_TYPE + API_URL_KEY)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Response === "False") {
                    // no result from API
                    setResults([]);
                } else {
                    // API returns valid data
                    setResults(data.Search);
                }
            })
            .catch((err) => {
                // in case of error
                console.log(err)
            });
    }

    // handler for when search box text has changed
    function handleSearch(e) {
        setSearchTerm(e.target.value);
    }

    // handler for when nominate button is clicked on movie result
    // ASSUME: if a movie is already nominated, the button was disabled
    //         so it could not have triggered this function
    function nominateClick(result) {
        let newNominations = [...nominations, result];
        setNominations(newNominations);
    }

    // handler for when remove button is clicked on movie nomination
    function removeNominationClick(imdbId) {
        let newNominations = nominations.filter(nomination => nomination.imdbID !== imdbId);
        setNominations(newNominations);
    }

    return (
        <Container>
            <Row>
                <h1>Movie Awards</h1>
            </Row>
            <Row>
                <p>Search for movies and add them to your list of nominations!</p>
            </Row>
            <Row>
                <MovieSearch searchChange={handleSearch} />
            </Row>
            <Row>
                <Alert variant='info' show={nominations.length >= 5}>
                    You've nominated {nominations.length} nominations! You only need 5 nominations but feel free to keep nominating!
                </Alert>
            </Row>
            <Row>
                <Col>
                    <MovieResults searchTerm={searchTerm} results={results} nominations={nominations} nominateClick={nominateClick} />
                </Col>
                <Col>
                    <MovieNominations nominations={nominations} removeNominationClick={removeNominationClick} />
                </Col>
            </Row>
            <Row>
                Made by Jack Rong
            </Row>
        </Container>
    );
}

export default App;
