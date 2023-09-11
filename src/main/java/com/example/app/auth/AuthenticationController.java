package com.example.app.auth;


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
    private final UsuarioCrudRepository repository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        if(!request.getFirstname().isBlank() && !request.getEmail().isBlank() && !request.getPassword().isBlank() && !repository.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.ok(service.register(request));
        }else {
            return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
        }
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authentication(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }
}
