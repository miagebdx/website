package com.miagebdx.website.repository;

import com.miagebdx.website.domain.Partner;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Partner entity.
 */
public interface PartnerRepository extends JpaRepository<Partner,Long>{

}
