package com.example.app.controllers.Empresa;

import com.example.app.controllers.User.UsuarioData;
import com.example.app.entidades.Promocion;
import com.example.app.entidades.Usuario;
import com.example.app.servicios.EmpresasServicio;
import com.example.app.entidades.Empresa;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lugares")
@RequiredArgsConstructor
public class EmpresasController {

    @Autowired
    private final EmpresasServicio EmpresasServicio;

    @GetMapping("/all")
    public List<Empresa> getAllPlaces(){
        return EmpresasServicio.findAll();
    }

    @PostMapping("/generatePromocion")
    public Promocion newPromocion(@RequestBody Promocion promo) {
        EmpresaData empresadata = new EmpresaData();
        return EmpresasServicio.newPromocion(promo,empresadata.getId());
    }

    @GetMapping("/getInfoInicioEmpresa")
    public getEmpresa getInfoInicioEmpresa(){
        EmpresaData empresadata= new EmpresaData();
        return EmpresasServicio.findById(empresadata.getId());
    }

    @GetMapping("/getPromosEmpresa")
    public List<Promocion> getPromosEmpresa(){
        EmpresaData userdata = new EmpresaData();
        return EmpresasServicio.getPromos(userdata.getId());
    }

    @GetMapping("/verInfoEmpresa")
    public getEmpresa verInfoEmpresa(@RequestParam("valor") Integer id){
        return EmpresasServicio.findById(id);
    }

    @GetMapping("/verPromosEmpresa")
    public List<Promocion> verPromosEmpresa(@RequestParam("valor") Integer id){
        return EmpresasServicio.getPromos(id);
    }

    @PostMapping("/suscribirse")
    public Empresa suscribirse(@RequestParam("valor") Integer empresaid){
        EmpresaData empresadata = new EmpresaData();
        return EmpresasServicio.suscribirse(empresadata.getId(),empresaid);
    }
}
