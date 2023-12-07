package com.lostitems.lostitemsapi.repository;

import com.lostitems.lostitemsapi.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;
public interface ItemRepository extends PagingAndSortingRepository<Item, UUID>, JpaSpecificationExecutor<Item>, JpaRepository<Item, UUID> {
}
