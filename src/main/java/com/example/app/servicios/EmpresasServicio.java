package com.example.app.servicios;

import com.example.app.entidades.Empresa;
import com.example.app.repository.EmpresasCrudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpresasServicio {

    @Autowired
    private final EmpresasCrudRepository EmpresasRepository;

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
}
