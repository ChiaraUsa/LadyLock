package com.example.app.repository;

import com.example.app.entidades.Empresa;
import org.springframework.data.repository.CrudRepository;

public interface EmpresasCrudRepository extends CrudRepository<Empresa,Integer> {
}
