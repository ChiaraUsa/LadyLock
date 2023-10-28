package com.example.app.repository;

import com.example.app.entidades.Promocion;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface PreguntaCrudRepository extends CrudRepository<Promocion, Integer> {
    List<Promocion> findByEmpresa_id(int id);
}
