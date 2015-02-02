package com.miagebdx.website.repository;

import com.miagebdx.website.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Event entity.
 */
public interface EventRepository extends JpaRepository<Event,Long>{


    @Query("select event from Event event left join fetch event.peoples left join fetch event.partners where event.id =:id")
    Event findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select distinct event from Event event left join fetch event.peoples left join fetch event.partners")
    List<Event> findAll();

    @Query(" select distinct event from Event event left join fetch event.partners left join fetch event.peoples join event.peoples people WHERE people.id=:id")
    List<Event> findByPeople(@Param("id") Long id);

    @Query(" select distinct event from Event event left join fetch event.peoples left join fetch event.partners join event.partners partner WHERE partner.id=:id")
    List<Event> findByPartner(@Param("id") Long id);

}
