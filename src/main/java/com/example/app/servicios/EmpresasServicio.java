package com.example.app.servicios;

import com.example.app.entidades.Empresa;
import com.example.app.entidades.Usuario;
import com.example.app.repository.EmpresaCrudRepository;
import com.example.app.repository.LugaresCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmpresasServicio {
    @Autowired
    EmpresaCrudRepository lugaresCrudRepository;
    public Object findAll() {return lugaresCrudRepository.findAll();}

    public Optional<Empresa> findById(int id) {
        return lugaresCrudRepository.findById(id);
    }
}