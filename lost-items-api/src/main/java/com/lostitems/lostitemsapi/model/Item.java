package com.lostitems.lostitemsapi.model;

import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.utils.Localisation;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.ColumnTransformer;

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

    @ColumnTransformer(write="?::founditschema.ITEM_TYPE")
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ItemType type;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "photo", columnDefinition = "bytea")
    private byte[] photo;

    @Embedded
    private Localisation localisation;

    @Column(name = "returned")
    private Boolean returned;

    @ManyToOne(
            targetEntity = Category.class,
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "\"categoryId\"", nullable = false)
    private Category category;

    @ManyToOne(
            targetEntity = User.class,
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "\"posterId\"", nullable = false)
    private User poster;
}
