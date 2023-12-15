package com.lostitems.lostitemsapi.model;

import com.lostitems.lostitemsapi.enumeration.ItemType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "date")
    private LocalDate date; // found or lost date

    @Column(name = "\"postDate\"", nullable = false)
    private LocalDate postDate;

    @Column(name = "\"returnDate\"")
    private LocalDate returnDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ItemType type;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "photo")
    private String photo;

    @Column(name = "longitude", nullable = false)
    private double longitude;

    @Column(name = "latitude", nullable = false)
    private double latitude;

    @Column(name = "returned")
    private Boolean returned;

    @Column(name = "category")
    private String category;

    @ManyToOne(
            targetEntity = User.class,
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "\"posterId\"", nullable = false)
    private User poster;

    @Column(name = "range")
    private double range = 0;
}
