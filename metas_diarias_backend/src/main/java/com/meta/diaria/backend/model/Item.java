package com.meta.diaria.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity(name = "METADIARIA")
public class Item {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOME")
    @Getter
    @Setter
    private String metaDiaria;

    @Column(name = "DATACREATED")
    @Getter
    @Setter
    private Date dataCreated;

    @Column(name = "DESCRICAO")
    @Getter
    @Setter
    private String descricao;

    @Column(name = "DATAUPDATE")
    @Getter
    @Setter
    private Date dataUpdate;

    @Column(name = "ISCONCLUIDA")
    @Getter
    @Setter
    private Boolean isConcluida;

    public Item(String metaDiaria, String descricao, Boolean isConcluida) {
        this.metaDiaria = metaDiaria;
        this.descricao = descricao;
        this.isConcluida = isConcluida;
    }

    public Item(){}
}
