package com.meta.diaria.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity(name = "ITEM")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Getter
    @Column(name = "NOME")
    private String metaDiaria;

    @Column(name = "DATA")
    @Getter
    @Setter
    private Date data;

    @Getter
    @Column(name = "DESCRICAO")
    private String descricao;

    public Item(String metaDiaria, String descricao) {
        this.metaDiaria = metaDiaria;
        this.descricao = descricao;
    }
}
