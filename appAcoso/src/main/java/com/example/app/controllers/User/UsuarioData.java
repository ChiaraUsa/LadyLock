package com.example.app.controllers.User;

import com.example.app.entidades.Usuario;
import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Data
public class UsuarioData {

    private int id;

    public UsuarioData(){
        if(SecurityContextHolder.getContext().getAuthentication() != null){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Usuario userDetails = (Usuario) authentication.getPrincipal();
            id = userDetails.getId();
        }
    }
}
