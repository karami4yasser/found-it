package com.lostitems.lostitemsapi.repository;

import com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto;
import com.lostitems.lostitemsapi.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.UUID;
public interface ItemRepository extends PagingAndSortingRepository<Item, UUID>, JpaSpecificationExecutor<Item>, JpaRepository<Item, UUID> {
    @Query("SELECT  count(i) FROM Item i where i.poster.id = :userId")
    Long countPostedItemsByUser(@Param("userId") UUID userId);
}
