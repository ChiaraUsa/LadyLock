package com.example.app.config;

import com.example.app.entidades.Admin;
import com.example.app.entidades.Empresa;
import com.example.app.entidades.Usuario;
import com.example.app.repository.AdminCrudRepository;
import com.example.app.repository.EmpresasCrudRepository;
import com.example.app.repository.UsuarioCrudRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private final UsuarioCrudRepository UserRepository;
    private final AdminCrudRepository AdminRepository;
    private final EmpresasCrudRepository EmpresaRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Usuario> user = UserRepository.findByEmail(username);
        Optional<Empresa> empresa = EmpresaRepository.findByEmail(username);
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
    }
}
