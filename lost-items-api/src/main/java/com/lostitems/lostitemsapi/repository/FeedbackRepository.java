package com.lostitems.lostitemsapi.repository;

import com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto;
import com.lostitems.lostitemsapi.model.Feedback;
import com.lostitems.lostitemsapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface FeedbackRepository extends JpaRepository<Feedback, UUID> {

    @Query("SELECT new com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto(COALESCE(AVG(f.rating), 0.0 ), count(f)) FROM Feedback f where f.rated.id = :userId")
    FeedbackStatisticsDto getFeedbackStatisticsByUser(@Param("userId") UUID userId);
}
