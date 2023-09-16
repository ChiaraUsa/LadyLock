package com.example.app.servicios;

import com.example.app.entidades.Empresa;
import com.example.app.entidades.Promocion;
import com.example.app.repository.EmpresasCrudRepository;
import com.example.app.repository.PreguntaCrudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmpresasServicio {

    @Autowired
    private final EmpresasCrudRepository EmpresasRepository;
    private final PreguntaCrudRepository PreguntaRepository;

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
