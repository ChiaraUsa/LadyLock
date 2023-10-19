package com.example.app.servicios;

import com.example.app.controllers.Admin.ResponseCode;
import com.example.app.entidades.Admin;
import com.example.app.entidades.Emergencia;
import com.example.app.entidades.Empresa;
import com.example.app.repository.AdminCrudRepository;
import com.example.app.repository.EmergenciaCrudRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminServicio {

    @Autowired
    private final AdminCrudRepository AdminRepository;
    private final EmergenciaCrudRepository EmergenciaRepository;

    public ResponseCode newCode() {
        Random random = new Random();
        int code = random.nextInt(9000) + 1000;
        System.out.println("CODIGO: " + code);
        return ResponseCode.builder().code(code).build();
    }

    public int newEmergencia(Emergencia m) {
        List<Admin> admins = (List<Admin>) AdminRepository.findAll();
        for(Admin a : admins)
        {
                if(a.isTrabajandoEmergencia() == false)
            {
                m.setAdmin(a); //Se establece el admin a la emergancia
                a.setTrabajandoEmergencia(true); //Se establece que el admin esta ocupado
                a.getEmergenciaList().add(m);// Se guarda la emergencia en el historial
                AdminRepository.save(a);
                return a.getId();
            }
        }
        return -1;
    }

    public List<Emergencia> getEmergencias(int id) {
        List<Emergencia> emergenciaList = EmergenciaRepository.findByAdmin_id(id);
        for(Emergencia e:emergenciaList)
        {
            e.setAdmin(null);
        }
        Collections.reverse(emergenciaList);
        return emergenciaList;
    }

    public String cerrarEmergencia(Integer id) {
        Optional<Admin> admin = AdminRepository.findById(id);

        if(admin.isPresent())
        {
            Admin a = admin.get();
            a.setTrabajandoEmergencia(false);
            AdminRepository.save(a);
            return "Exito";
        }
        return "Fallo";
    }
}