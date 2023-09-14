package com.example.app.controllers.User;

import com.example.app.auth.AuthenticationResponse;
import com.example.app.auth.AuthenticationService;
import com.example.app.entidades.Usuario;
import com.example.app.servicios.UsuarioServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UsuarioController {

    @Autowired
    private final UsuarioServicio UsuarioServicio;
    private final AuthenticationService authenticationService;

    @GetMapping("/getInfo")
    public Optional<Usuario> getInfoUsuario(){
        UsuarioData userdata = new UsuarioData();
        return UsuarioServicio.findById(userdata.getId());
    }

    @PostMapping("/setInfo")
    public ResponseEntity<AuthenticationResponse> setInfoUsuario(@RequestBody setRequestUser setRequestUser){
        UsuarioData userdata = new UsuarioData();
        boolean ExisteUserEnOtraTabla = authenticationService.UserEnOtraTablaExiste(setRequestUser.getEmail());

        if (!ExisteUserEnOtraTabla)
        {
            boolean exitoActualizar = UsuarioServicio.actualizar(userdata.getId(),setRequestUser.getName(),setRequestUser.getEmail());
            if(exitoActualizar) {
                return ResponseEntity.ok(authenticationService.NuevoTokenUser(userdata.getId()));
            }
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
    }
}
