package com.example.app.LugaresConfi;

import com.example.app.entidades.Lugares;
import com.example.app.repository.LugaresCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lugares")
public class LugaresController {

    @Autowired
    LugaresServicio lugaresServicio;

    @GetMapping("/all")
    public List<Lugares> getAllPlaces(){
        return (List<Lugares>) lugaresServicio.findAll();
    }
}
