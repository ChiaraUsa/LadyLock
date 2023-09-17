package com.example.app.servicios;

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
}
