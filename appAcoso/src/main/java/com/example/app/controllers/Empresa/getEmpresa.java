package com.example.app.controllers.Empresa;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class getEmpresa {
    private String name;
    private String email;
    private String description;
    private String imagine;
    private String link;
}
