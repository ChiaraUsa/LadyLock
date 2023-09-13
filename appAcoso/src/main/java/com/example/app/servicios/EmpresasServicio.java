package com.example.app.servicios;

import com.example.app.repository.EmpresasCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresasServicio {
    @Autowired
    EmpresasCrudRepository EmpresasRepository;
    public Object findAll() {return EmpresasRepository.findAll();}
}
