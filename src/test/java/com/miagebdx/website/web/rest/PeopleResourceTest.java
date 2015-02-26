package com.miagebdx.website.web.rest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import com.miagebdx.website.Application;
import com.miagebdx.website.domain.People;
import com.miagebdx.website.repository.PeopleRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PeopleResource REST controller.
 *
 * @see PeopleResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class PeopleResourceTest {

    private static final String DEFAULT_NAME = "SAMPLE_TEXT";
    private static final String UPDATED_NAME = "UPDATED_TEXT";
    private static final String DEFAULT_EMAIL = "SAMPLE_TEXT";
    private static final String UPDATED_EMAIL = "UPDATED_TEXT";
    private static final String DEFAULT_TELEPHONE = "SAMPLE_TEXT";
    private static final String UPDATED_TELEPHONE = "UPDATED_TEXT";
    private static final String DEFAULT_LOCATION = "SAMPLE_TEXT";
    private static final String UPDATED_LOCATION = "UPDATED_TEXT";
    private static final String DEFAULT_WEBSITE = "SAMPLE_TEXT";
    private static final String UPDATED_WEBSITE = "UPDATED_TEXT";
    private static final String DEFAULT_DETAILS = "SAMPLE_TEXT";
    private static final String UPDATED_DETAILS = "UPDATED_TEXT";
    private static final String DEFAULT_LOGO = "SAMPLE_TEXT";
    private static final String UPDATED_LOGO = "UPDATED_TEXT";

    @Inject
    private PeopleRepository peopleRepository;

    private MockMvc restPeopleMockMvc;

    private People people;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PeopleResource peopleResource = new PeopleResource();
        ReflectionTestUtils.setField(peopleResource, "peopleRepository", peopleRepository);
        this.restPeopleMockMvc = MockMvcBuilders.standaloneSetup(peopleResource).build();
    }

    @Before
    public void initTest() {
        people = new People();
        people.setName(DEFAULT_NAME);
        people.setEmail(DEFAULT_EMAIL);
        people.setTelephone(DEFAULT_TELEPHONE);
        people.setLocation(DEFAULT_LOCATION);
        people.setWebsite(DEFAULT_WEBSITE);
        people.setDetails(DEFAULT_DETAILS);
        people.setLogo(DEFAULT_LOGO);
    }

    @Test
    @Transactional
    public void createPeople() throws Exception {
        // Validate the database is empty
        assertThat(peopleRepository.findAll()).hasSize(0);

        // Create the People
        restPeopleMockMvc.perform(post("/api/peoples")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(people)))
                .andExpect(status().isOk());

        // Validate the People in the database
        List<People> peoples = peopleRepository.findAll();
        assertThat(peoples).hasSize(1);
        People testPeople = peoples.iterator().next();
        assertThat(testPeople.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPeople.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPeople.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testPeople.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testPeople.getWebsite()).isEqualTo(DEFAULT_WEBSITE);
        assertThat(testPeople.getDetails()).isEqualTo(DEFAULT_DETAILS);
        assertThat(testPeople.getLogo()).isEqualTo(DEFAULT_LOGO);

    }

    @Test
    @Transactional
    public void getAllPeoples() throws Exception {
        // Initialize the database
        peopleRepository.saveAndFlush(people);

        // Get all the peoples
        restPeopleMockMvc.perform(get("/api/peoples"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[0].id").value(people.getId().intValue()))
                .andExpect(jsonPath("$.[0].name").value(DEFAULT_NAME.toString()))
                .andExpect(jsonPath("$.[0].email").value(DEFAULT_EMAIL.toString()))
                .andExpect(jsonPath("$.[0].telephone").value(DEFAULT_TELEPHONE.toString()))
                .andExpect(jsonPath("$.[0].location").value(DEFAULT_LOCATION.toString()))
                .andExpect(jsonPath("$.[0].website").value(DEFAULT_WEBSITE.toString()))
                .andExpect(jsonPath("$.[0].details").value(DEFAULT_DETAILS.toString()))
                .andExpect(jsonPath("$.[0].logo").value(DEFAULT_LOGO.toString()));
    }

    @Test
    @Transactional
    public void getPeople() throws Exception {
        // Initialize the database
        peopleRepository.saveAndFlush(people);

        // Get the people
        restPeopleMockMvc.perform(get("/api/peoples/{id}", people.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(people.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS.toString()))
            .andExpect(jsonPath("$.logo").value(DEFAULT_LOGO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPeople() throws Exception {
        // Get the people
        restPeopleMockMvc.perform(get("/api/peoples/{id}", 1L))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePeople() throws Exception {
        // Initialize the database
        peopleRepository.saveAndFlush(people);

        // Update the people
        people.setName(UPDATED_NAME);
        people.setEmail(UPDATED_EMAIL);
        people.setTelephone(UPDATED_TELEPHONE);
        people.setLocation(UPDATED_LOCATION);
        people.setWebsite(UPDATED_WEBSITE);
        people.setDetails(UPDATED_DETAILS);
        people.setLogo(UPDATED_LOGO);
        restPeopleMockMvc.perform(post("/api/peoples")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(people)))
                .andExpect(status().isOk());

        // Validate the People in the database
        List<People> peoples = peopleRepository.findAll();
        assertThat(peoples).hasSize(1);
        People testPeople = peoples.iterator().next();
        assertThat(testPeople.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPeople.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPeople.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testPeople.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testPeople.getWebsite()).isEqualTo(UPDATED_WEBSITE);
        assertThat(testPeople.getDetails()).isEqualTo(UPDATED_DETAILS);
        assertThat(testPeople.getLogo()).isEqualTo(UPDATED_LOGO);
    }

    @Test
    @Transactional
    public void deletePeople() throws Exception {
        // Initialize the database
        peopleRepository.saveAndFlush(people);

        // Get the people
        restPeopleMockMvc.perform(delete("/api/peoples/{id}", people.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<People> peoples = peopleRepository.findAll();
        assertThat(peoples).hasSize(0);
    }
}
