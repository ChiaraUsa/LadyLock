package com.example.app.servicios;

import com.example.app.entidades.Usuario;
import com.example.app.repository.UsuarioCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioServicio {
    @Autowired
    private UsuarioCrudRepository repository;
    public Optional<Usuario> findById(int id) {
        return repository.findById(id);
    }
}