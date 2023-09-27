package com.example.app.controllers.User;

import com.example.app.auth.AuthenticationResponse;
import com.example.app.auth.AuthenticationService;
import com.example.app.entidades.Empresa;
import com.example.app.entidades.Promocion;
import com.example.app.entidades.Usuario;
import com.example.app.servicios.UsuarioServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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

    @PostMapping("/suscribirse")
    public Usuario suscribirse(@RequestParam("valor") Integer empresaid){
        UsuarioData userdata = new UsuarioData();
        return UsuarioServicio.suscribirse(userdata.getId(),empresaid);
    }

    @GetMapping("/comprobar")
    public Boolean suscribirse(@RequestParam("valor") String email, @RequestParam("id") Integer empresaid){
        return UsuarioServicio.comprobarSuscripcion(email,empresaid);
    }

    @DeleteMapping("/eliminarCuenta")
    public ResponseEntity<String> eliminarCuenta(){
        UsuarioData userdata = new UsuarioData();
        boolean delete = UsuarioServicio.eliminarCuenta(userdata.getId());
        if (delete) {
            return ResponseEntity.ok("eliminado");
        } else {
            return ResponseEntity.badRequest().body("No eliminado");
        }
    }

    @GetMapping("/getPromosUser")
    public List<Promocion> getPromosUser(){
        UsuarioData userdata = new UsuarioData();
        return UsuarioServicio.getPromos(userdata.getId());
    }
}
