package com.example.app.repository;

import com.example.app.entidades.Admin;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AdminCrudRepository extends CrudRepository<Admin,Integer> {
    Optional<Admin> findByEmail (String email);
}
