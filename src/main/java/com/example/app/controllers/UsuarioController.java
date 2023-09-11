package com.example.app.controllers;

import com.example.app.entidades.Usuario;
import com.example.app.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UsuarioController {

    @Autowired
    UsuarioServicio usuarioServicio;

    @GetMapping("/info")
    public Optional<Usuario> getInfoUsuario(){
        UsuarioData userdata = new UsuarioData();
        return usuarioServicio.findById(userdata.getId());
    }
}