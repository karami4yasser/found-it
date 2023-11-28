package com.lostitems.lostitemsapi.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(
            targetEntity = Item.class,
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "category"
    )
    private List<Item> items;

    @OneToMany(
            targetEntity = Category.class,
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "parentCategory"
    )
    private Set<Category> childrenCategories;

    @ManyToOne(
            targetEntity = Category.class,
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "\"parentCategoryId\"")
    private Category parentCategory;

    @Override
    public boolean  equals (Object object) {
        boolean result = false;
        if (object == null || object.getClass() != getClass()) {
            result = false;
        } else {
            Category category = (Category) object;
            if (this.name == category.getName() && this.parentCategory.id == category.getParentCategory().getId()) {
                result = true;
            }
        }
        return result;
    }
}

