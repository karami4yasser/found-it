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
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "comment")
    @Size(max = 4096)
    private String comment;

    @ManyToOne(
            targetEntity = User.class,
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "\"reporterUserId\"", nullable=false)
    private User reporter;

    @ManyToOne(
            targetEntity = User.class,
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "\"reportedUserId\"", nullable=false)
    private User reported;
}
