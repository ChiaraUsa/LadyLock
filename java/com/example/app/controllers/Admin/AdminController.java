package com.example.app.controllers.Admin;

import com.example.app.entidades.Emergencia;
import com.example.app.servicios.AdminServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public int newEmergencia(@RequestBody Emergencia m){
        return adminServicio.newEmergencia(m);
    }

    @PostMapping("/cierraUsuario")
    public String closeEmergencia(@RequestParam("idAdmin") Integer id){
        return adminServicio.cerrarEmergencia(id);
    }
}