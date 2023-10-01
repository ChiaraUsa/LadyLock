package com.example.app.controllers.Admin;

import com.example.app.auth.RegisterRequest;
import com.example.app.entidades.Emergencia;
import com.example.app.servicios.AdminServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private final AdminServicio adminServicio;

    @GetMapping("/code")
    public ResponseEntity<ResponseCode> NewCode(){
        return ResponseEntity.ok(adminServicio.newCode());
    }

    @GetMapping("/getAtenciones")
    public List<Emergencia> getAtenciones(){
        AdminData adminData = new AdminData();
        return adminServicio.getEmergencias(adminData.getId());
    }

    @PostMapping("/newEmergencia")
    public String newEmergencia(@RequestBody Emergencia m){
        AdminData adminData = new AdminData();
        return adminServicio.newEmergencia(m, adminData.getId());
    }
}
