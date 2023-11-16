package com.example.app.controllers.Admin;

import com.example.app.entidades.Admin;
import com.example.app.entidades.Emergencia;
import com.example.app.servicios.AdminServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/newEmergencia")
    public int newEmergencia(@RequestParam("userEmail") String email){
        return adminServicio.newEmergencia(email);
    }

    @PostMapping("/cierraUsuario")
    public String closeEmergencia(@RequestParam("idAdmin") Integer id){
        return adminServicio.cerrarEmergencia(id);
    }

    @PostMapping("/cierraAdmin")
    public String closeEmergenciaAdmin(){
        AdminData adminData = new AdminData();
        return adminServicio.cerrarEmergenciaAdmin(adminData.getId());
    }

    @GetMapping("/emergencia")
    public boolean HayEmergencia(){
        AdminData adminData = new AdminData();
        return adminServicio.HayEmergencia(adminData.getId());
    }

    @GetMapping("/getEmergenciaActual")
    public Emergencia ultimaEmergencia(){
        AdminData adminData = new AdminData();
        return adminServicio.getUltimaEmergencia(adminData.getId());
    }

    @GetMapping("/getInfo")
    public String getInfoAdmin(){
        AdminData admindata = new AdminData();
        return adminServicio.getNombre(admindata.getId());
    }

    @GetMapping("/misUsuarios")
    public List<String> getUsuariosAtendidos(){
        AdminData admindata = new AdminData();
        return adminServicio.getUsuariosAtendidos(admindata.getId());
    }
}