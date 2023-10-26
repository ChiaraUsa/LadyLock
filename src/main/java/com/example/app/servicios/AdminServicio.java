package com.example.app.servicios;

import com.example.app.controllers.Admin.ResponseCode;
import com.example.app.entidades.Admin;
import com.example.app.entidades.Emergencia;
import com.example.app.entidades.Usuario;
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

    public Optional<Admin> findById(int id) {
        return AdminRepository.findById(id);
    }

    public ResponseCode newCode() {
        Random random = new Random();
        int code = random.nextInt(9000) + 1000;
        System.out.println("CODIGO: " + code);
        return ResponseCode.builder().code(code).build();
    }

    public String newEmergencia(Emergencia m, int idAdmin) {
        Admin admin = AdminRepository.findById(idAdmin).get();
        m.setAdmin(admin);
        admin.getEmergenciaList().add(m);
        AdminRepository.save(admin);
        return "Exito al generar Emergencia de ejemplo";
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
}