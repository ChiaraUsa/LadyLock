package com.example.app.servicios;

import com.example.app.auth.AuthenticationResponse;
import com.example.app.auth.AuthenticationService;
import com.example.app.controllers.Empresa.getEmpresa;
import com.example.app.entidades.Empresa;
import com.example.app.entidades.Promocion;
import com.example.app.entidades.Usuario;
import com.example.app.repository.EmpresasCrudRepository;
import com.example.app.repository.PreguntaCrudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmpresasServicio {

    @Autowired
    private final EmpresasCrudRepository EmpresasRepository;
    private final PreguntaCrudRepository PreguntaRepository;

    public getEmpresa findById(int id) {

        Empresa empresa = EmpresasRepository.findById(id).get();

        getEmpresa empresaInfo = getEmpresa.builder()
                .id(empresa.getId())
                .rol(empresa.getRole())
                .name(empresa.getName())
                .email(empresa.getEmail())
                .description(empresa.getDescription())
                .imagine(empresa.getImagine())
                .link(empresa.getLink()).build();

        return empresaInfo;
    }

    public List<Promocion> getPromos(int id){
        List<Promocion> listA = PreguntaRepository.findByEmpresa_id(id);
        for(Promocion p:listA)
        {
            p.setEmpresa(null);
        }
        Collections.reverse(listA);
        return listA;
    }
    public List<Empresa> findAll() {
        List<Empresa> listEmpresasTotal = (List<Empresa>) EmpresasRepository.findAll();
        List<Empresa> listEmpresasMostrar = new ArrayList<>();

        for(Empresa empresa : listEmpresasTotal)
        {
            if(empresa.getImagine()!=null && empresa.getDescription()!=null && empresa.getLink()!=null)
            {
                listEmpresasMostrar.add(empresa);
            }
        }
        return listEmpresasMostrar;
    }

    public Promocion newPromocion(Promocion promo, int id) {
        Optional<Empresa> empresa = EmpresasRepository.findById(id);
        if(empresa.isPresent())
        {
            promo.setEmpresa(empresa.get());
        }
        return PreguntaRepository.save(promo);
    }

    public Empresa suscribirse(int myid, Integer xid) {
        Empresa myEmpresa = EmpresasRepository.findById(myid).get();
        Empresa xEmpresa = EmpresasRepository.findById(xid).get();
        myEmpresa.getEmpresasList().add(xEmpresa);
        return EmpresasRepository.save(myEmpresa);
    }

    public Empresa actualizarFoto(int id, String foto) {
        Empresa empresa = EmpresasRepository.findById(id).get();
        empresa.setImagine(foto);
        return EmpresasRepository.save(empresa);
    }

    public Empresa actualizarNombre(int id, String name) {
        Empresa empresa = EmpresasRepository.findById(id).get();
        empresa.setName(name);
        return EmpresasRepository.save(empresa);
    }

    public boolean actualizarEmail(int id, String email) {
        Empresa empresaExiste = EmpresasRepository.findById(id).orElse(null);
        Empresa empresaX = EmpresasRepository.findByEmail(email).orElse(null);

        if(!email.isBlank())
        {
            if(empresaX==null || empresaExiste.getId()==empresaX.getId()) {
                empresaExiste.setEmail(email);
                EmpresasRepository.save(empresaExiste);
                return true;
            }
        }
        return false;
    }

    public Empresa actualizarDescripcion(int id, String des) {
        Empresa empresa = EmpresasRepository.findById(id).get();
        empresa.setDescription(des);
        return EmpresasRepository.save(empresa);
    }

    public Empresa actualizarLink(int id, String link) {
        Empresa empresa = EmpresasRepository.findById(id).get();
        empresa.setLink(link);
        return EmpresasRepository.save(empresa);
    }

    public boolean eliminarCuenta(int id) {
        if(EmpresasRepository.findById(id).isPresent())
        {
            EmpresasRepository.deleteById(id);
            return true;
        }
        return false;
    }

}