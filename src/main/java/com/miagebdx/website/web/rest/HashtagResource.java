package com.miagebdx.website.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.miagebdx.website.domain.Hashtag;
import com.miagebdx.website.repository.HashtagRepository;
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
 * REST controller for managing Hashtag.
 */
@RestController
@RequestMapping("/api")
public class HashtagResource {

    private final Logger log = LoggerFactory.getLogger(HashtagResource.class);

    @Inject
    private HashtagRepository hashtagRepository;

    /**
     * POST  /hashtags -> Create a new hashtag.
     */
    @RequestMapping(value = "/hashtags",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void create(@RequestBody Hashtag hashtag) {
        log.debug("REST request to save Hashtag : {}", hashtag);
        hashtagRepository.save(hashtag);
    }

    /**
     * GET  /hashtags -> get all the hashtags.
     */
    @RequestMapping(value = "/hashtags",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Hashtag> getAll() {
        log.debug("REST request to get all Hashtags");
        return hashtagRepository.findAll();
    }

    /**
     * GET  /hashtags/:id -> get the "id" hashtag.
     */
    @RequestMapping(value = "/hashtags/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Hashtag> get(@PathVariable Long id) {
        log.debug("REST request to get Hashtag : {}", id);
        return Optional.ofNullable(hashtagRepository.findOne(id))
            .map(hashtag -> new ResponseEntity<>(
                hashtag,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /hashtags/:id -> delete the "id" hashtag.
     */
    @RequestMapping(value = "/hashtags/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Hashtag : {}", id);
        hashtagRepository.delete(id);
    }
}
