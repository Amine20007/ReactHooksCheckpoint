import React, { Component } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import Filter from './components/Filter';

class App extends Component {
  state = {
    movies: [],
    newMovie: {
      title: '',
      description: '',
      posterURL: '',
      rating: 0,
    },
    filterTitle: '',
    filterRate: '',
  };

  handleInputChange = (event, field) => {
    const value = event.target.value;
    this.setState((prevState) => ({
      newMovie: {
        ...prevState.newMovie,
        [field]: value,
      },
    }));
  };

  handleTitleChange = (event) => {
    this.setState({ filterTitle: event.target.value });
  };

  handleRateChange = (event) => {
    this.setState({ filterRate: event.target.value });
  };

  addMovie = () => {
    const { newMovie, movies } = this.state;
    if (newMovie.title && newMovie.description && newMovie.posterURL && newMovie.rating) {
      this.setState((prevState) => ({
        movies: [...prevState.movies, newMovie],
        newMovie: {
          title: '',
          description: '',
          posterURL: '',
          rating: 0,
        },
      }));
    }
  };

  render() {
    const { movies, newMovie, filterTitle, filterRate } = this.state;

    const filteredMovies = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        movie.rating >= parseFloat(filterRate)
    );

    return (
      <div className="App">
        <h1>Movie Database</h1>
        <Filter
          title={filterTitle}
          rate={filterRate}
          onTitleChange={this.handleTitleChange}
          onRateChange={this.handleRateChange}
        />
        <MovieList movies={filteredMovies} />
        <div className="add-movie">
          <h2>Add a New Movie</h2>
          <input
            type="text"
            placeholder="Title"
            value={newMovie.title}
            onChange={(e) => this.handleInputChange(e, 'title')}
          />
          <input
            type="text"
            placeholder="Description"
            value={newMovie.description}
            onChange={(e) => this.handleInputChange(e, 'description')}
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={newMovie.posterURL}
            onChange={(e) => this.handleInputChange(e, 'posterURL')}
          />
          <input
            type="number"
            placeholder="Rating"
            value={newMovie.rating}
            onChange={(e) => this.handleInputChange(e, 'rating')}
          />
          <button onClick={this.addMovie}>Add Movie</button>
        </div>
      </div>
    );
  }
}

export default App;
