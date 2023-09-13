package com.example.app.repository;

import com.example.app.entidades.Empresa;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface EmpresasCrudRepository extends CrudRepository<Empresa,Integer> {
    Optional<Empresa> findByEmail (String email);
}
