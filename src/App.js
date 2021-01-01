import './App.css';
import { useState, useEffect, useRef } from 'react';
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

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [nominations, setNominations] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [queryErrorMessage, setQueryErrorMessage] = useState('');

    const resultsColRef = useRef();

    // manage first load
    useEffect(() => {
        // get nominations from local storage
        let storedNominations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedNominations)
            setNominations(storedNominations);

        // add listener to results column for infinite scroll
        resultsColRef.current.addEventListener('scroll', handleResultsScroll);
    }, []);

    // manage when nominations change
    useEffect(() => {
        // store nominations into local storage when a new movie is nominated
        // TODO: we're storing the entire JSON object of the nomination that's
        //       returned by the API. Ideally, we want to only store the IMDB
        //       ID and re-query the API on load to save space and in case
        //       data was changed on the API side
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nominations));
    }, [nominations]);

    // when search term is changed, call search API
    useEffect(searchAPI, [searchTerm]);

    useEffect(() => {
        if (!isFetching)
            return;
        searchAPI(true);
    }, [isFetching]);

    // call API with search term
    function searchAPI(fetchMore = false) {
        let pageNumber = 1;
        if (fetchMore && results) {
            // ASSUME: API returns 10 results per page
            // TODO: to make this more robust, keep track of which page we last queried
            //       instead of relying on the assumption
            pageNumber = Math.floor(results.length / 10) + 1;
        }

        fetch(API_URL_BASE + '?s=' + searchTerm + API_URL_TYPE + '&page=' + pageNumber + API_URL_KEY)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Response === "False") {
                    // no result from API
                    setResults([]);
                    setQueryErrorMessage(data.Error);
                } else {
                    // API returns valid data
                    if (fetchMore && results) {
                        if (results.length < data.totalResults) {
                            // if don't already have all the results, we add the new results
                            let newResults = [...results, ...data.Search];
                            setResults(newResults);
                        }
                    } else {
                        setResults(data.Search);
                    }
                }
            })
            .finally(() => {
                setIsFetching(false);
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

    // handler for results scrollbar
    function handleResultsScroll(e) {
        // take total scrollable height subtract the amount we've scrolled
        // if this is equal to the amount of content we can see, then we're at the bottom
        if (resultsColRef.current.scrollHeight - resultsColRef.current.scrollTop === resultsColRef.current.clientHeight && !isFetching) {
            setIsFetching(true);
        }
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
        <Container id='app'>
            <Row>
                <h1>Movie Awards</h1>
            </Row>
            <Row>
                <p>Search for movies and add them to your list of nominations!</p>
            </Row>
            <Row id='search-row'>
                <MovieSearch searchChange={handleSearch} />
            </Row>
            <Row id='alert-row'>
                <Alert variant='info' show={nominations.length >= 5}>
                    You have nominated {nominations.length} movies! You only need 5 nominations but feel free to keep adding more!
                </Alert>
            </Row>
            <Row id='content-row'>
                <Col id='results-col' ref={resultsColRef}>
                    <MovieResults searchTerm={searchTerm} results={results} nominations={nominations} queryErrorMessage={queryErrorMessage} nominateClick={nominateClick} />
                </Col>
                <Col id='nominations-col'>
                    <MovieNominations nominations={nominations} removeNominationClick={removeNominationClick} />
                </Col>
            </Row>
            <Row id='footer-row'>
                <a href='http://jackrong.me' target='_blank' rel='noreferrer'>Made with 🌯 in Vancouver by Jack Rong</a>
            </Row>
        </Container>
    );
}

export default App;
