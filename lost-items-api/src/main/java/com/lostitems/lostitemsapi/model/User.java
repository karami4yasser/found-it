package com.lostitems.lostitemsapi.model;

import com.lostitems.lostitemsapi.validation.constraints.PhoneNumber;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "\"firstName\"", nullable = false)
    private String firstName;

    @Column(name = "\"lastName\"", nullable = false)
    private String lastName;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email")
    @Email(message = "Email format is not right!")
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "photo")
    private String photo;

    @OneToMany(
            targetEntity = Item.class,
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "poster"
    )
    private List<Item> items;

    @OneToMany(
            targetEntity = Feedback.class,
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "rater"
    )
    private List<Feedback> givenFeedbacks;

    @OneToMany(
            targetEntity = Feedback.class,
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "rated"
    )
    private List<Feedback> feedbacks;

    @ElementCollection(targetClass = UUID.class, fetch = FetchType.LAZY)
    @CollectionTable(name = "\"favItems\"", joinColumns = @JoinColumn(name = "\"userId\""))
    @Column(name = "\"favItem\"", nullable = false)
    private Set<UUID> favItems;

    public void addFavItem(UUID favItem) {
        favItems.add(favItem);
    }
}
