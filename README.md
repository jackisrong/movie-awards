# movie-awards

_A React web app project created to learn React and apply for an internship._

See this in action: https://movie-awards.herokuapp.com/
The app sleeps after inactivity so it might take a while to load. If it loads up to an error screen, try refreshing.

**Disclaimer:** This is my first attempt at a React web app. This honestly would've been faster if I made it in pure JavaScript but I decided to take a challenge and use it as an opportunity to learn React (which I've put on the back burner for quite some time). Sorry if it's messy.

This web app allows you to search for movies by title and add them to a list of your nominated movies. The next step would probably be to send this information to the backend to find the best movies of 2020, but in its current state it's kind of useless. For a more practical use in the current state I guess you can think of it as a list of your favourite movies or maybe a list of movies you want to watch.

## Features
* A search box that displays results as you're typing (but uses a debounce). Results contain the movie poster (if available), the title, the year of release, along with a button to nominate it. The button gets disabled if the movie is already nominated and re-enabled if removed from nominations.
* Search results use infinite scroll to display more results. Once you scroll to the end of the 10 results provided per page by the API, it automatically loads the next 10.
* Nominations are displayed in a list with button to remove them and animation when they are added or removed. They are also stored to local storage in case you want to come back later and see your nominations again.
* Banner that tells you when you've nominated 5 movies.

## Limitations and Improvements
* There are a couple TODO comments I've left in the code as future improvements, either to the efficiency or robustness of the web app. Mostly in src/App.js if interested.
* Add loading animation for when search results are being fetched. This isn't really that necessary because the API results load pretty much instantly but in case of slow internet connections this would be useful.

## Technologies Used
* [React](https://reactjs.org/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [OMDb API](http://www.omdbapi.com/)
