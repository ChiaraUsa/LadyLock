package com.example.app.controllers;

import com.example.app.entidades.Usuario;
import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Data
public class UsuarioData {

    private String email;
    private int id;

    public UsuarioData(){
        if(SecurityContextHolder.getContext().getAuthentication() != null){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Usuario userDetails = (Usuario) authentication.getPrincipal();
            email = userDetails.getUsername();
            id = userDetails.getId();
        }
    }
}