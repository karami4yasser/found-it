package com.lostitems.lostitemsapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "rating", nullable = false)
    @Min(1)
    @Max(5)
    private Float rating;

    @Column(name = "comment")
    @Size(max = 4096)
    private String comment;

    @Column(name = "date")
    private LocalDate date;

    @ManyToOne(
            targetEntity = User.class,
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "\"raterUserId\"", nullable=false)
    private User rater;

    @ManyToOne(
            targetEntity = User.class,
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "\"ratedUserId\"", nullable=false)
    private User rated;

}
