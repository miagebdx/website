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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import com.miagebdx.website.Application;
import com.miagebdx.website.domain.Partner;
import com.miagebdx.website.repository.PartnerRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PartnerResource REST controller.
 *
 * @see PartnerResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class PartnerResourceTest {

    private static final String DEFAULT_NAME = "SAMPLE_TEXT";
    private static final String UPDATED_NAME = "UPDATED_TEXT";
    private static final String DEFAULT_LOCATION = "SAMPLE_TEXT";
    private static final String UPDATED_LOCATION = "UPDATED_TEXT";
    private static final String DEFAULT_DESCRIPTION = "SAMPLE_TEXT";
    private static final String UPDATED_DESCRIPTION = "UPDATED_TEXT";
    private static final String DEFAULT_WEBSITE = "SAMPLE_TEXT";
    private static final String UPDATED_WEBSITE = "UPDATED_TEXT";
    private static final String DEFAULT_EMAIL = "SAMPLE_TEXT";
    private static final String UPDATED_EMAIL = "UPDATED_TEXT";
    private static final byte[] DEFAULT_LOGO = new byte[1];
    private static final byte[] UPDATED_LOGO = new byte[2];
    private static final String DEFAULT_TELEPHONE = "SAMPLE_TEXT";
    private static final String UPDATED_TELEPHONE = "UPDATED_TEXT";

    @Inject
    private PartnerRepository partnerRepository;

    private MockMvc restPartnerMockMvc;

    private Partner partner;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PartnerResource partnerResource = new PartnerResource();
        ReflectionTestUtils.setField(partnerResource, "partnerRepository", partnerRepository);
        this.restPartnerMockMvc = MockMvcBuilders.standaloneSetup(partnerResource).build();
    }

    @Before
    public void initTest() {
        partner = new Partner();
        partner.setName(DEFAULT_NAME);
        partner.setLocation(DEFAULT_LOCATION);
        partner.setDescription(DEFAULT_DESCRIPTION);
        partner.setWebsite(DEFAULT_WEBSITE);
        partner.setEmail(DEFAULT_EMAIL);
        partner.setLogo(DEFAULT_LOGO);
        partner.setTelephone(DEFAULT_TELEPHONE);
    }

    @Test
    @Transactional
    public void createPartner() throws Exception {
        // Validate the database is empty
        assertThat(partnerRepository.findAll()).hasSize(0);

        // Create the Partner
        restPartnerMockMvc.perform(post("/api/partners")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(partner)))
                .andExpect(status().isOk());

        // Validate the Partner in the database
        List<Partner> partners = partnerRepository.findAll();
        assertThat(partners).hasSize(1);
        Partner testPartner = partners.iterator().next();
        assertThat(testPartner.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPartner.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testPartner.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPartner.getWebsite()).isEqualTo(DEFAULT_WEBSITE);
        assertThat(testPartner.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPartner.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testPartner.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
    }

    @Test
    @Transactional
    public void getAllPartners() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        // Get all the partners
        restPartnerMockMvc.perform(get("/api/partners"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[0].id").value(partner.getId().intValue()))
                .andExpect(jsonPath("$.[0].name").value(DEFAULT_NAME.toString()))
                .andExpect(jsonPath("$.[0].location").value(DEFAULT_LOCATION.toString()))
                .andExpect(jsonPath("$.[0].description").value(DEFAULT_DESCRIPTION.toString()))
                .andExpect(jsonPath("$.[0].website").value(DEFAULT_WEBSITE.toString()))
                .andExpect(jsonPath("$.[0].email").value(DEFAULT_EMAIL.toString()))
                //.andExpect(jsonPath("$.[0].logo").value(DEFAULT_LOGO))
                .andExpect(jsonPath("$.[0].telephone").value(DEFAULT_TELEPHONE.toString()));
    }

    @Test
    @Transactional
    public void getPartner() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        // Get the partner
        restPartnerMockMvc.perform(get("/api/partners/{id}", partner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(partner.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            //.andExpect(jsonPath("$.logo").value(DEFAULT_LOGO))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPartner() throws Exception {
        // Get the partner
        restPartnerMockMvc.perform(get("/api/partners/{id}", 1L))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartner() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        // Update the partner
        partner.setName(UPDATED_NAME);
        partner.setLocation(UPDATED_LOCATION);
        partner.setDescription(UPDATED_DESCRIPTION);
        partner.setWebsite(UPDATED_WEBSITE);
        partner.setEmail(UPDATED_EMAIL);
        partner.setLogo(UPDATED_LOGO);
        partner.setTelephone(UPDATED_TELEPHONE);
        restPartnerMockMvc.perform(post("/api/partners")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(partner)))
                .andExpect(status().isOk());

        // Validate the Partner in the database
        List<Partner> partners = partnerRepository.findAll();
        assertThat(partners).hasSize(1);
        Partner testPartner = partners.iterator().next();
        assertThat(testPartner.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPartner.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testPartner.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPartner.getWebsite()).isEqualTo(UPDATED_WEBSITE);
        assertThat(testPartner.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPartner.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testPartner.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
    }

    @Test
    @Transactional
    public void deletePartner() throws Exception {
        // Initialize the database
        partnerRepository.saveAndFlush(partner);

        // Get the partner
        restPartnerMockMvc.perform(delete("/api/partners/{id}", partner.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Partner> partners = partnerRepository.findAll();
        assertThat(partners).hasSize(0);
    }
}
