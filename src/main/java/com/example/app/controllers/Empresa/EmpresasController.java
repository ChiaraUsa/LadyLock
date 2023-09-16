package com.example.app.controllers.Empresa;

import com.example.app.controllers.User.UsuarioData;
import com.example.app.entidades.Promocion;
import com.example.app.servicios.EmpresasServicio;
import com.example.app.entidades.Empresa;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
