package com.example.app.servicios;

import com.example.app.controllers.Admin.ResponseCode;
import com.example.app.repository.EmpresasCrudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AdminServicio {

    @Autowired
    private final EmpresasCrudRepository EmpresasRepository;

    public ResponseCode newCode() {
        Random random = new Random();
        int code = random.nextInt(9000) + 1000;
        System.out.println("CODIGO: " + code);
        return ResponseCode.builder().code(code).build();
    }
}
