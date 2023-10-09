package com.example.app.controllers.Admin;

import com.example.app.entidades.Admin;
import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Data
public class AdminData {

    private int id;

    public AdminData(){
        if(SecurityContextHolder.getContext().getAuthentication() != null){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Admin userDetails = (Admin) authentication.getPrincipal();
            id = userDetails.getId();
        }
    }
}