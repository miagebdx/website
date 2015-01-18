package com.miagebdx.website.repository;

import com.miagebdx.website.domain.People;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the People entity.
 */
public interface PeopleRepository extends JpaRepository<People,Long>{

}
