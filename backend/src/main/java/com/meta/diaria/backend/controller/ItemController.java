package com.meta.diaria.backend.controller;

import com.meta.diaria.backend.model.dto.ItemDTO;
import com.meta.diaria.backend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/item")
public class ItemController {

    private ItemService service;

    @Autowired
    public ItemController(ItemService service) {
        this.service = service;
    }

    @PostMapping(path = "/inserir", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ItemDTO> inserir(@RequestBody ItemDTO requisicao) {
        ItemDTO retorno = service.inserir(requisicao);
        return ResponseEntity.ok(retorno);
    }
}
