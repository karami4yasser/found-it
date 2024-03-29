package com.lostitems.lostitemsapi.repository;

import com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto;
import com.lostitems.lostitemsapi.model.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface FeedbackRepository extends JpaRepository<Feedback, UUID>, PagingAndSortingRepository<Feedback, UUID> {

    @Query("SELECT new com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto(COALESCE(ROUND(AVG(f.rating), 1), 0.0 ), count(f)) FROM Feedback f where f.rated.id = :userId")
    FeedbackStatisticsDto getFeedbackStatisticsByUser(@Param("userId") UUID userId);

    Page<Feedback> findAllByRated_Id(UUID userId, Pageable pageable);

    @Query("SELECT f FROM Feedback f WHERE f.rated.id = :ratedId AND f.rater.id = :raterId")
    List<Feedback> findFeedbackByUserAndRater(@Param("ratedId") UUID ratedId, @Param("raterId") UUID raterId);
}
