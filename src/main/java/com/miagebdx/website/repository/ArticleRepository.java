package com.miagebdx.website.repository;

import com.miagebdx.website.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Article entity.
 */
public interface ArticleRepository extends JpaRepository<Article,Long>{

    @Query("select article from Article article left join fetch article.peoples left join fetch article.hashtags where article.id =:id")
    Article findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select distinct article from Article article left join fetch article.peoples left join fetch article.hashtags")
    List<Article> findAll();

    @Query(" select distinct article from Article article left join fetch article.peoples left join fetch article.hashtags join article.hashtags hashtag WHERE hashtag.id=:id")
    List<Article> findByHashtag(@Param("id") Long id);

}
