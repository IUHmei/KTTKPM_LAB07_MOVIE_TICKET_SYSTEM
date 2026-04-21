package com.iuh.movie_service.controller;

import com.iuh.movie_service.model.Movie;
import com.iuh.movie_service.service.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService service = new com.iuh.movie_service.service.impl.MovieServiceImpl();

    @GetMapping
    public List<Movie> getAll() {
        return service.getAll();
    }

    @PostMapping
    public String add(@RequestBody Movie movie) {
        service.add(movie);
        return "Added movie";
    }
}