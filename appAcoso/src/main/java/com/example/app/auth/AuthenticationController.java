package com.example.app.auth;

import com.example.app.repository.AdminCrudRepository;
import com.example.app.repository.UsuarioCrudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register/usuario")
    public ResponseEntity<AuthenticationResponse> registerUser(@RequestBody RegisterRequest request){
        boolean correoExiste = service.existeCorreo(request.getEmail());
        if(!request.getFirstname().isBlank() && !request.getEmail().isBlank() && !request.getPassword().isBlank() && !correoExiste){
            return ResponseEntity.ok(service.registerUser(request));
        }else {
            return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
        }
    }
    @PostMapping("/authenticate/usuario")
    public ResponseEntity<AuthenticationResponse> authenticationUser(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticateUser(request));
    }

    @PostMapping("/register/administrador")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody RegisterRequest request){
        boolean correoExiste = service.existeCorreo(request.getEmail());
        if(!request.getFirstname().isBlank() && !request.getEmail().isBlank() && !request.getPassword().isBlank() && !correoExiste){
            return ResponseEntity.ok(service.registerAdmin(request));
        }else {
            return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
        }
    }

    @PostMapping("/authenticate/administrador")
    public ResponseEntity<AuthenticationResponse> authenticationAdmin(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticateAdmin(request));
    }
}
