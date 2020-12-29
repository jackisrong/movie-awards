import { useState, useEffect } from 'react';
import MovieSearch from './MovieSearch';
import MovieResults from './MovieResults';
import MovieNominations from './MovieNominations';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const API_URL_BASE = 'http://www.omdbapi.com/';
const API_URL_KEY = '&apikey=52aab954';
const API_URL_TYPE = '&type=movie';

const LOCAL_STORAGE_KEY = 'movieAwards.nominationIds';

/*
TODO:
- banner when 5 nominations
- bootstrap & css
- clean up
    - get rid of need for nominationIds
*/

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [nominationIds, setNominationIds] = useState([]);
    const [nominations, setNominations] = useState([]);

    // get nominations from local storage on first load
    useEffect(() => {
        let storedNominationIds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedNominationIds) {
            setNominationIds(storedNominationIds);

            console.log(nominationIds);

            storedNominationIds.forEach(nominationId => {
                console.log(nominationId);
                getMovieWithIdAPI(nominationId);
            });

            console.log(nominations);
        }
    }, []);

    // store nominations when a new movie is nominated
    // we only store the nomination IMDB IDs
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nominationIds))
    }, [nominationIds]);

    // when search term is changed, call search API
    useEffect(searchAPI, [searchTerm]);

    // when movie is nominated, check if we have 5 nominations now
    useEffect(() => {
        if (nominationIds.length === 5) {
            // display banner
        }
    }, [nominationIds]);

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

    // call API with IMDB ID
    function getMovieWithIdAPI(imdbId) {
        fetch(API_URL_BASE + '?i=' + imdbId + API_URL_TYPE + API_URL_KEY)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Response === "False") {
                    // no matching movie with id imdbId from API
                    // this should never happen - we do nothing
                } else {
                    // valid movie returned by API with id imdbId
                    let newNominations = [...nominations, data];
                    setNominations(newNominations);
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
    function nominateClick(imdbId) {
        let newNominationIds = [...nominationIds, imdbId];
        setNominationIds(newNominationIds);

        getMovieWithIdAPI(imdbId);
    }

    // handler for when remove button is clicked on movie nomination
    function removeNominationClick(imdbId) {
        let newNominationIds = nominationIds.filter(nomination => nomination !== imdbId);
        setNominationIds(newNominationIds);

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
                <Col>
                    <MovieResults searchTerm={searchTerm} results={results} nominations={nominationIds} nominateClick={nominateClick} />
                </Col>
                <Col>
                    <MovieNominations nominations={nominations} removeNominationClick={removeNominationClick} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
