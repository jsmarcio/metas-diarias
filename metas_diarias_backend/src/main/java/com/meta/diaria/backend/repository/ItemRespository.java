package com.meta.diaria.backend.repository;

import com.meta.diaria.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRespository extends JpaRepository<Item, Long> {
}
