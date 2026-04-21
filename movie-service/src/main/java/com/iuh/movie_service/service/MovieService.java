package com.iuh.movie_service.service;

import com.iuh.movie_service.model.Movie;

import java.util.List;

public interface MovieService {
    List<Movie> getAll();
    void add(Movie movie);
}