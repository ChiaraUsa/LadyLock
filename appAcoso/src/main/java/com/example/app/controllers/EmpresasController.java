package com.example.app.controllers;

import com.example.app.servicios.EmpresasServicio;
import com.example.app.entidades.Empresa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lugares")
public class EmpresasController {

    @Autowired
    EmpresasServicio lugaresServicio;

    @GetMapping("/all")
    public List<Empresa> getAllPlaces(){
        return (List<Empresa>) lugaresServicio.findAll();
    }
}
