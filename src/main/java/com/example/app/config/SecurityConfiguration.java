package com.example.app.config;

import com.example.app.entidades.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**","/api/user/**","/api/admin/**","/css/**","/js/**","/registro.html","/login.html","/imagenes/**",
                        //Vistas Usuario
                        "/inicio.html","/CentroAyuda.html","/info.html",
                        //Vistas Admin
                        "/inicioAdmin.html",
                        //Vistas Empresa
                        "/inicioEmpresa.html","/perfilEmpresa.html","/eventoEmpresa.html")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        http.cors().and().csrf().disable();
        return http.build();
    }
}
