package com.example.app.controllers.Admin;

import com.example.app.controllers.User.UsuarioData;
import com.example.app.entidades.Admin;
import com.example.app.entidades.Emergencia;
import com.example.app.entidades.Usuario;
import com.example.app.servicios.AdminServicio;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

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
    @GetMapping("/getInfo")
    public Optional<Admin> getInfoAdmin(){
        AdminData admindata = new AdminData();
        return adminServicio.findById(admindata.getId());
    }

    @PostMapping("/newEmergencia")
    public String newEmergencia(@RequestBody Emergencia m){
        AdminData adminData = new AdminData();
        return adminServicio.newEmergencia(m, adminData.getId());
    }
}