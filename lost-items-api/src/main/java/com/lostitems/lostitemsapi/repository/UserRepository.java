package com.lostitems.lostitemsapi.repository;

import com.lostitems.lostitemsapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    @Query("SELECT u FROM User u WHERE u.email = :emailOrPhone or u.phone = :emailOrPhone")
    Optional<User> findUserByEmailOrPhone(@Param("emailOrPhone") String emailOrPhone);

    @Query("SELECT EXISTS(SELECT u FROM User u WHERE u.email = :emailOrPhone or u.phone = :emailOrPhone)")
    Boolean userExistsByEmailOrPhone(@Param("emailOrPhone") String emailOrPhone);


}
