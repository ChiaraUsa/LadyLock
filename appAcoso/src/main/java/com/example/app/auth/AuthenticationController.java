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
    private final UsuarioCrudRepository UserRepository;
    private final AdminCrudRepository AdminRepository;

    @PostMapping("/register/usuario")
    public ResponseEntity<AuthenticationResponse> registerUser(@RequestBody RegisterRequest request){
        if(!request.getFirstname().isBlank() && !request.getEmail().isBlank() && !request.getPassword().isBlank() && !UserRepository.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.ok(service.registerUser(request));
        }else {
            return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
        }
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticationUser(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/register/administrador")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody RegisterRequest request){
        if(!request.getFirstname().isBlank() && !request.getEmail().isBlank() && !request.getPassword().isBlank() && !AdminRepository.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.ok(service.registerAdmin(request));
        }else {
            return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
        }
    }
}
