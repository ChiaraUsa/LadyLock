package com.example.app.entidades;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name="emergencia")
public class Emergencia implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String userName;
    private String userEmail;
    private String conductorName;
    private String marcaAuto;
    private String modeloAuto;
    private String colorAuto;
    private String descripcion;
    @ManyToOne
    private Admin admin;
}
