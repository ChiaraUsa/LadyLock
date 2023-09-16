package com.example.app.controllers.Admin;

import com.example.app.servicios.AdminServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
