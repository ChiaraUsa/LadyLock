package com.example.app.servicios;

import com.example.app.controllers.Admin.ResponseCode;
import com.example.app.entidades.Admin;
import com.example.app.entidades.Emergencia;
import com.example.app.entidades.Usuario;
import com.example.app.repository.AdminCrudRepository;
import com.example.app.repository.EmergenciaCrudRepository;
import com.example.app.repository.UsuarioCrudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminServicio {

    @Autowired
    private final AdminCrudRepository AdminRepository;
    private final EmergenciaCrudRepository EmergenciaRepository;
    private final UsuarioCrudRepository UsuarioRepository;

    public ResponseCode newCode() {
        Random random = new Random();
        int code = random.nextInt(9000) + 1000;
        System.out.println("CODIGO: " + code);
        return ResponseCode.builder().code(code).build();
    }

    public int newEmergencia(String userEmail) {

        Usuario user = UsuarioRepository.findByEmail(userEmail).get();
        String[] NombresConductor = {"Juan", "María", "Pedro", "Laura", "Carlos", "Ana", "Luis", "Sofía", "Miguel", "Isabel"};
        String[] Marca = {"Toyota", "Ford", "Honda", "Chevrolet", "Volkswagen", "Nissan", "Hyundai", "Kia", "Subaru", "Mazda"};
        String[] Modelo = {"2020", "2019", "2018", "2022", "2017", "2021", "2016", "2015", "2014", "2013"};
        String[] Color = {"Rojo", "Azul", "Gris", "Blanco", "Negro", "Plata", "Verde", "Amarillo", "Naranja", "Marrón"};
        String[] Descripcion = {"Ayuda", "Peligro", "Socorro", "A que horas llega el pollo?", "D:", "Noooo", "Me muero", "Ya me mori", ":C", "Terror"};

        Random rand = new Random();
        int indiceAleatorio = rand.nextInt(NombresConductor.length);

        Emergencia m = new Emergencia();
        m.setUserEmail(userEmail);
        m.setUserName(user.getUsername());
        m.setConductorName(NombresConductor[indiceAleatorio]);
        m.setMarcaAuto(Marca[indiceAleatorio]);
        m.setModeloAuto(Modelo[indiceAleatorio]);
        m.setColorAuto(Color[indiceAleatorio]);
        m.setDescripcion(Descripcion[indiceAleatorio]);

        List<Admin> admins = (List<Admin>) AdminRepository.findAll();
        for(Admin a : admins)
        {
                if(a.isTrabajandoEmergencia() == false)
            {
                m.setAdmin(a); //Se establece el admin a la emergancia
                a.setTrabajandoEmergencia(true); //Se establece que el admin esta ocupado
                a.getEmergenciaList().add(m);// Se guarda la emergencia en el historial
                AdminRepository.save(a);
                return a.getId();
            }
        }
        return -1;
    }

    public List<Emergencia> getEmergencias(int id) {
        List<Emergencia> emergenciaList = EmergenciaRepository.findByAdmin_id(id);
        for(Emergencia e:emergenciaList)
        {
            e.setAdmin(null);
        }
        Collections.reverse(emergenciaList);
        return emergenciaList;
    }

    public String cerrarEmergencia(Integer id) {
        Optional<Admin> admin = AdminRepository.findById(id);

        if(admin.isPresent())
        {
            Admin a = admin.get();
            a.setTrabajandoEmergencia(false);
            AdminRepository.save(a);
            return "Exito";
        }
        return "Fallo";
    }

    public boolean HayEmergencia(int id) {
        Admin admin = AdminRepository.findById(id).get();
        return admin.isTrabajandoEmergencia();
    }

    public Emergencia getUltimaEmergencia(int id) {
        List<Emergencia> emergenciaList = EmergenciaRepository.findByAdmin_id(id);
        Emergencia emergencia = emergenciaList.get(emergenciaList.size()-1);
        emergencia.setAdmin(null);
        return emergencia;
    }

    public String cerrarEmergenciaAdmin(int id) {
        Optional<Admin> admin = AdminRepository.findById(id);
        if(admin.isPresent())
        {
            Admin a = admin.get();
            a.setTrabajandoEmergencia(false);
            AdminRepository.save(a);
            return "Exito";
        }
        return "Fallo";
    }
}