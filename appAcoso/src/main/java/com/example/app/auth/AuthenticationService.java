package com.example.app.auth;

import com.example.app.entidades.Admin;
import com.example.app.entidades.Empresa;
import com.example.app.entidades.Role;
import com.example.app.entidades.Usuario;
import com.example.app.repository.AdminCrudRepository;
import com.example.app.repository.EmpresasCrudRepository;
import com.example.app.repository.UsuarioCrudRepository;
import com.example.app.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioCrudRepository UserRepository;
    private final EmpresasCrudRepository EmpresaRepository;
    private final AdminCrudRepository AdminRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public boolean existeCorreo(String email) {
        if (UserRepository.findByEmail(email).isPresent() ||
                AdminRepository.findByEmail(email).isPresent() ||
                EmpresaRepository.findByEmail(email).isPresent()) {
            return true;
        }
        return false;
    }

    public boolean UserEnOtraTablaExiste(String email) {
        if (AdminRepository.findByEmail(email).isPresent() || EmpresaRepository.findByEmail(email).isPresent()) {
            return true;
        }
        return false;
    }

    public boolean EmpresaEnOtraTablaExiste(String email) {
        if (AdminRepository.findByEmail(email).isPresent() || UserRepository.findByEmail(email).isPresent()) {
            return true;
        }
        return false;
    }

    public AuthenticationResponse NuevoTokenUser(int id) {
        Usuario user = UserRepository.findById(id).get();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse NuevoTokenEmpresa(int id) {
        Empresa empresa = EmpresaRepository.findById(id).get();

        var jwtToken = jwtService.generateToken(empresa);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerUser(RegisterRequest request) {
        var user = Usuario.builder()
                .firstname(request.getFirstname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        UserRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticateUser(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                )
        );
        var user = UserRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse registerAdmin(RegisterRequest request) {
        var admin = Admin.builder()
                .firstname(request.getFirstname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .build();
        AdminRepository.save(admin);
        var jwtToken = jwtService.generateToken(admin);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticateAdmin(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                )
        );
        var admin = AdminRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(admin);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse registerEmpresa(RegisterRequest request) {
        var empresa = Empresa.builder()
                .name(request.getFirstname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.EMPRESA)
                .build();
        EmpresaRepository.save(empresa);
        var jwtToken = jwtService.generateToken(empresa);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticateEmpresa(AuthenticationRequest request) {
        var empresa = EmpresaRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(empresa);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}

