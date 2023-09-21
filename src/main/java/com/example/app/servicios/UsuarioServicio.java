package com.example.app.servicios;

import com.example.app.entidades.Empresa;
import com.example.app.entidades.Usuario;
import com.example.app.repository.EmpresasCrudRepository;
import com.example.app.repository.UsuarioCrudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioServicio {
    @Autowired
    private final UsuarioCrudRepository UserRepository;
    private final EmpresasCrudRepository EmpresaRepository;
    public Optional<Usuario> findById(int id) {
        return UserRepository.findById(id);
    }

    public boolean actualizar(int id,String name, String email){
        Usuario usuarioExiste = UserRepository.findById(id).orElse(null);
        Usuario usuarioX = UserRepository.findByEmail(email).orElse(null);

        if(!name.isBlank() && !email.isBlank())
        {
            if(usuarioX==null || usuarioExiste.getId()==usuarioX.getId()) {
                usuarioExiste.setFirstname(name);
                usuarioExiste.setEmail(email);
                UserRepository.save(usuarioExiste);
                return true;
            }
        }
        return false;
    }

    public Usuario suscribirse(int userid, Integer empresaid) {
        Usuario user = UserRepository.findById(userid).get();
        Empresa empresa = EmpresaRepository.findById(empresaid).get();
        user.getEmpresasList().add(empresa);
        return UserRepository.save(user);
    }

    public Boolean comprobarSuscripcion(String email, int empresaid) {

        Optional<Usuario> userX = UserRepository.findByEmail(email);
        Optional<Empresa> empresaX = EmpresaRepository.findByEmail(email);

        boolean estaSuscrito=false;

        if(userX.isPresent())
        {
            estaSuscrito = userX.get().getEmpresasList().stream()
                    .anyMatch(Empresa -> Empresa.getId() == empresaid);
        }
        else if(empresaX.isPresent())
        {
            estaSuscrito = empresaX.get().getEmpresasList().stream()
                    .anyMatch(Empresa -> Empresa.getId() == empresaid);
        }
        return estaSuscrito;
    }
}
