package com.example.app.controllers;

import com.example.app.servicios.EmpresasServicio;
import com.example.app.entidades.Empresa;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lugares")
@RequiredArgsConstructor
public class EmpresasController {

    @Autowired
    private final EmpresasServicio EmpresasServicio;

    @GetMapping("/all")
    public List<Empresa> getAllPlaces(){
        return (List<Empresa>) EmpresasServicio.findAll();
    }
}
