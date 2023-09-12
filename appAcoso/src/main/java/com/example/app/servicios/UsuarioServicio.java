package com.example.app.servicios;

import com.example.app.entidades.Usuario;
import com.example.app.repository.UsuarioCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioServicio {
    @Autowired
    private UsuarioCrudRepository repository;
    public Optional<Usuario> findById(int id) {
        return repository.findById(id);
    }

    public boolean actualizar(int id,String name, String email){
        Usuario usuarioExiste = repository.findById(id).orElse(null);
        Usuario usuarioX = repository.findByEmail(email).orElse(null);

        if(!name.isBlank() && !email.isBlank())
        {
            if(usuarioX==null || usuarioExiste.getId()==usuarioX.getId()) {
                usuarioExiste.setFirstname(name);
                usuarioExiste.setEmail(email);
                repository.save(usuarioExiste);
                return true;
            }
        }
        return false;
    }
}
