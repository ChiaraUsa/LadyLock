package com.example.app.controllers.Empresa;

import com.example.app.entidades.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class getEmpresa {
    private int id;
    private Role rol;
    private String name;
    private String email;
    private String description;
    private String imagine;
    private String link;
}
