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
import com.miagebdx.website.domain.Hashtag;
import com.miagebdx.website.repository.HashtagRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HashtagResource REST controller.
 *
 * @see HashtagResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class HashtagResourceTest {

    private static final String DEFAULT_NAME = "SAMPLE_TEXT";
    private static final String UPDATED_NAME = "UPDATED_TEXT";
    private static final String DEFAULT_DESCRIPTION = "SAMPLE_TEXT";
    private static final String UPDATED_DESCRIPTION = "UPDATED_TEXT";

    @Inject
    private HashtagRepository hashtagRepository;

    private MockMvc restHashtagMockMvc;

    private Hashtag hashtag;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        HashtagResource hashtagResource = new HashtagResource();
        ReflectionTestUtils.setField(hashtagResource, "hashtagRepository", hashtagRepository);
        this.restHashtagMockMvc = MockMvcBuilders.standaloneSetup(hashtagResource).build();
    }

    @Before
    public void initTest() {
        hashtag = new Hashtag();
        hashtag.setName(DEFAULT_NAME);
        hashtag.setDescription(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createHashtag() throws Exception {
        // Validate the database is empty
        assertThat(hashtagRepository.findAll()).hasSize(0);

        // Create the Hashtag
        restHashtagMockMvc.perform(post("/api/hashtags")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(hashtag)))
                .andExpect(status().isOk());

        // Validate the Hashtag in the database
        List<Hashtag> hashtags = hashtagRepository.findAll();
        assertThat(hashtags).hasSize(1);
        Hashtag testHashtag = hashtags.iterator().next();
        assertThat(testHashtag.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testHashtag.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllHashtags() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        // Get all the hashtags
        restHashtagMockMvc.perform(get("/api/hashtags"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[0].id").value(hashtag.getId().intValue()))
                .andExpect(jsonPath("$.[0].name").value(DEFAULT_NAME.toString()))
                .andExpect(jsonPath("$.[0].description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getHashtag() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        // Get the hashtag
        restHashtagMockMvc.perform(get("/api/hashtags/{id}", hashtag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(hashtag.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHashtag() throws Exception {
        // Get the hashtag
        restHashtagMockMvc.perform(get("/api/hashtags/{id}", 1L))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHashtag() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        // Update the hashtag
        hashtag.setName(UPDATED_NAME);
        hashtag.setDescription(UPDATED_DESCRIPTION);
        restHashtagMockMvc.perform(post("/api/hashtags")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(hashtag)))
                .andExpect(status().isOk());

        // Validate the Hashtag in the database
        List<Hashtag> hashtags = hashtagRepository.findAll();
        assertThat(hashtags).hasSize(1);
        Hashtag testHashtag = hashtags.iterator().next();
        assertThat(testHashtag.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testHashtag.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void deleteHashtag() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        // Get the hashtag
        restHashtagMockMvc.perform(delete("/api/hashtags/{id}", hashtag.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Hashtag> hashtags = hashtagRepository.findAll();
        assertThat(hashtags).hasSize(0);
    }
}
