package com.lostitems.lostitemsapi.model;

import com.lostitems.lostitemsapi.validation.constraints.PhoneNumber;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.List;
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
    @PhoneNumber
    private String phone;

    @Column(name = "email")
    @Email(message = "Email format is not right!")
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

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
}
