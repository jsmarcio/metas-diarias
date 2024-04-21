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
        Item salvar = new Item(item.metaDiaria(), item.descricao());
        try {
            salvar.setData(converteData(item.data()));
        } catch (ParseException e) {
            salvar.setData(new Date());
        }
        Item entity = repository.save(salvar);
        return new ItemDTO(entity.getMetaDiaria(), converteString(entity.getData()), entity.getDescricao());
    }

    private String converteString(Date data) {
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
                ItemDTO dto = new ItemDTO(item.getMetaDiaria(), converteString(item.getData()), item.getDescricao());
                list.add(dto);
            }
        }
        return list;
    }
}
