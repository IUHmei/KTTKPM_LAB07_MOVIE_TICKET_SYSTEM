package com.iuh.movie_service.repository;

import com.iuh.movie_service.model.Movie;

import java.util.ArrayList;
import java.util.List;

public class MovieRepository {

    private final List<Movie> movies = new ArrayList<>();

    public List<Movie> findAll() {
        return movies;
    }

    public void save(Movie movie) {
        movies.add(movie);
    }
}