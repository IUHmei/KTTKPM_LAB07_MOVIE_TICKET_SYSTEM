package com.iuh.movie_service.service.impl;


import com.iuh.movie_service.model.Movie;
import com.iuh.movie_service.repository.MovieRepository;
import com.iuh.movie_service.service.MovieService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository repo = new MovieRepository();

    @Override
    public List<Movie> getAll() {
        return repo.findAll();
    }

    @Override
    public void add(Movie movie) {

        // 🔥 business logic (điểm của bạn)
        if (movie.getTitle() == null || movie.getTitle().isBlank()) {
            throw new IllegalArgumentException("Title không được rỗng");
        }

        repo.save(movie);
    }
}