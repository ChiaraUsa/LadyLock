package com.example.app.repository;

import com.example.app.entidades.Usuario;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface UsuarioCrudRepository extends CrudRepository<Usuario,Integer> {
    Optional<Usuario> findByEmail (String email);
}