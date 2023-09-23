package com.example.app.config;

import com.example.app.entidades.Admin;
import com.example.app.entidades.Empresa;
import com.example.app.entidades.Usuario;
import com.example.app.repository.AdminCrudRepository;
import com.example.app.repository.EmpresasCrudRepository;
import com.example.app.repository.UsuarioCrudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    @Autowired
    private final UsuarioCrudRepository UserRepository;
    private final EmpresasCrudRepository EmpresasRepository;
    private final AdminCrudRepository AdminRepository;
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            Optional<Usuario> user = UserRepository.findByEmail(username);
            Optional<Empresa> empresa = EmpresasRepository.findByEmail(username);
            Optional<Admin> admin = AdminRepository.findByEmail(username);

            if (user.isPresent()) {
                return user.get();
            } else if (empresa.isPresent()) {
                return empresa.get();
            } else if (admin.isPresent()) {
                return admin.get();
            } else {
                throw new UsernameNotFoundException("User not found in any repository");
            }
        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;

    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public  PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}