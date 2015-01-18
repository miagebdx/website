package com.miagebdx.website.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.miagebdx.website.domain.People;
import com.miagebdx.website.repository.PeopleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing People.
 */
@RestController
@RequestMapping("/api")
public class PeopleResource {

    private final Logger log = LoggerFactory.getLogger(PeopleResource.class);

    @Inject
    private PeopleRepository peopleRepository;

    /**
     * POST  /peoples -> Create a new people.
     */
    @RequestMapping(value = "/peoples",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void create(@RequestBody People people) {
        log.debug("REST request to save People : {}", people);
        peopleRepository.save(people);
    }

    /**
     * GET  /peoples -> get all the peoples.
     */
    @RequestMapping(value = "/peoples",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<People> getAll() {
        log.debug("REST request to get all Peoples");
        return peopleRepository.findAll();
    }

    /**
     * GET  /peoples/:id -> get the "id" people.
     */
    @RequestMapping(value = "/peoples/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<People> get(@PathVariable Long id) {
        log.debug("REST request to get People : {}", id);
        return Optional.ofNullable(peopleRepository.findOne(id))
            .map(people -> new ResponseEntity<>(
                people,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /peoples/:id -> delete the "id" people.
     */
    @RequestMapping(value = "/peoples/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete People : {}", id);
        peopleRepository.delete(id);
    }
}
