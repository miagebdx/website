package com.miagebdx.website.repository;

import com.miagebdx.website.domain.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Hashtag entity.
 */
public interface HashtagRepository extends JpaRepository<Hashtag,Long>{

}
