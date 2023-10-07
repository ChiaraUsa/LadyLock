package com.example.app.repository;

import com.example.app.entidades.Emergencia;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EmergenciaCrudRepository extends CrudRepository<Emergencia, Integer>{
    List<Emergencia> findByAdmin_id(int id);
}
