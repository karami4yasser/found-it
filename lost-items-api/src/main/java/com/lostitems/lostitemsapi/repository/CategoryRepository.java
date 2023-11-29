package com.lostitems.lostitemsapi.repository;

import com.lostitems.lostitemsapi.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    @Query("SELECT c FROM Category c WHERE c.name = :name")
    Optional<Category> findCategoryByName(@Param("name") String name);

    @Query("SELECT EXISTS(SELECT c FROM Category c WHERE (c.name = :name and c.parentCategory.id = :parentId))")
    Boolean categoryExistsByNameAndParent(@Param("name") String name, @Param("parentId") UUID parentId);

    @Query("SELECT EXISTS(SELECT c FROM Category c WHERE (c.name = :name and c.parentCategory is null ))")
    Boolean categoryExistsByNameAndParentIsNull(@Param("name") String name);

}
