package com.example.app.servicios;

import com.example.app.repository.LugaresCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpresasServicio {
    @Autowired
    LugaresCrudRepository lugaresCrudRepository;
    public Object findAll() {return lugaresCrudRepository.findAll();}
}