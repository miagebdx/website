package com.miagebdx.website.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.miagebdx.website.domain.Partner;
import com.miagebdx.website.repository.PartnerRepository;
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
 * REST controller for managing Partner.
 */
@RestController
@RequestMapping("/api")
public class PartnerResource {

    private final Logger log = LoggerFactory.getLogger(PartnerResource.class);

    @Inject
    private PartnerRepository partnerRepository;

    /**
     * POST  /partners -> Create a new partner.
     */
    @RequestMapping(value = "/partners",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void create(@RequestBody Partner partner) {
        log.debug("REST request to save Partner : {}", partner);
        partnerRepository.save(partner);
    }

    /**
     * GET  /partners -> get all the partners.
     */
    @RequestMapping(value = "/partners",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Partner> getAll() {
        log.debug("REST request to get all Partners");
        return partnerRepository.findAll();
    }

    /**
     * GET  /partners/:id -> get the "id" partner.
     */
    @RequestMapping(value = "/partners/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Partner> get(@PathVariable Long id) {
        log.debug("REST request to get Partner : {}", id);
        return Optional.ofNullable(partnerRepository.findOne(id))
            .map(partner -> new ResponseEntity<>(
                partner,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /partners/:id -> delete the "id" partner.
     */
    @RequestMapping(value = "/partners/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Partner : {}", id);
        partnerRepository.delete(id);
    }
}
