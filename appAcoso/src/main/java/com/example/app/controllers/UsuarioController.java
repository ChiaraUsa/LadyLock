package com.example.app.controllers;

import com.example.app.auth.AuthenticationResponse;
import com.example.app.entidades.Usuario;
import com.example.app.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Clock;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UsuarioController {

    @Autowired
    UsuarioServicio usuarioServicio;

    @GetMapping("/getInfo")
    public Optional<Usuario> getInfoUsuario(){
        UsuarioData userdata = new UsuarioData();
        return usuarioServicio.findById(userdata.getId());
    }

    @PostMapping("/setInfo")
    public ResponseEntity<AuthenticationResponse> setInfoUsuario(@RequestBody setRequestUser setRequestUser){
        UsuarioData userdata = new UsuarioData();
        boolean exito = usuarioServicio.actualizar(userdata.getId(),setRequestUser.getName(),setRequestUser.getEmail());

        if(exito) {
            return ResponseEntity.ok(AuthenticationResponse.builder().token("").build());
        }
        else {
            return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
        }
    }
}
