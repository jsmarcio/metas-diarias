package com.meta.diaria.backend.service;

import com.meta.diaria.backend.model.Item;
import com.meta.diaria.backend.model.dto.ItemDTO;
import com.meta.diaria.backend.repository.ItemRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ItemService {

    private ItemRespository repository;

    @Autowired
    public ItemService(ItemRespository repository) {
        this.repository = repository;
    }

    public ItemDTO inserir(ItemDTO item) {
        Item salvar = new Item(item.metaDiaria(), item.descricao(), false);
        try {
            salvar.setDataCreated(converteData(item.dataCreated()));
        } catch (ParseException e) {
            salvar.setDataCreated(new Date());
        }
        Item entity = repository.save(salvar);
        return new ItemDTO(entity.getId() ,entity.getMetaDiaria(), converteString(entity.getDataCreated()), entity.getDescricao(), converteString(entity.getDataUpdate()), entity.getIsConcluida());
    }

    private String converteString(Date data) {
        if (data == null) {return null;}
        return new SimpleDateFormat().format(data);
    }

    private Date converteData(String data) throws ParseException {
        return new SimpleDateFormat("yyyy/MM/dd'T'HH:mm:ss").parse(data);
    }

    public List<ItemDTO> listAll() {
        List<Item> entity = repository.findAll();
        List<ItemDTO> list = new ArrayList<ItemDTO>();

        if (!entity.isEmpty() && (entity.size() > 0)) {
            for (Item item : entity) {
                ItemDTO dto = new ItemDTO(item.getId(), item.getMetaDiaria(), converteString(item.getDataCreated()), item.getDescricao(), converteString(item.getDataUpdate()), item.getIsConcluida());
                list.add(dto);
            }
        }
        return list;
    }

    public ItemDTO atualizar(ItemDTO item) {
        Item update = repository.findById(item.id()).get();
        update.setMetaDiaria(item.metaDiaria());
        update.setDescricao(item.descricao());
        update.setIsConcluida(item.isConcluida());
        try {
            update.setDataUpdate(converteData(item.dataUpdate()));
        } catch (ParseException e) {
            update.setDataUpdate(new Date());
        }
        Item entity = repository.save(update);
        return new ItemDTO(entity.getId() ,entity.getMetaDiaria(), converteString(entity.getDataCreated()), entity.getDescricao(), converteString(entity.getDataUpdate()), entity.getIsConcluida());
    }
}
