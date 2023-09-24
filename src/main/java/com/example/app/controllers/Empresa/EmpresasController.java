package com.example.app.controllers.Empresa;

import com.example.app.auth.AuthenticationResponse;
import com.example.app.auth.AuthenticationService;
import com.example.app.controllers.User.UsuarioData;
import com.example.app.controllers.User.setRequestUser;
import com.example.app.entidades.Promocion;
import com.example.app.entidades.Usuario;
import com.example.app.servicios.EmpresasServicio;
import com.example.app.entidades.Empresa;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lugares")
@RequiredArgsConstructor
public class EmpresasController {

    @Autowired
    private final EmpresasServicio EmpresasServicio;
    private final AuthenticationService authenticationService;

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

    @PostMapping("/newFoto")
    public Empresa newFoto(@RequestParam("valor") String foto){
        EmpresaData empresadata = new EmpresaData();
        return EmpresasServicio.actualizarFoto(empresadata.getId(),foto);
    }

    @PostMapping("/newName")
    public Empresa newName(@RequestParam("valor") String name){
        EmpresaData empresadata = new EmpresaData();
        return EmpresasServicio.actualizarNombre(empresadata.getId(),name);
    }

    @PostMapping("/newEmail")
    public ResponseEntity<AuthenticationResponse> newEmail(@RequestParam("valor") String email){
        EmpresaData empresadata = new EmpresaData();
        boolean ExisteUserEnOtraTabla = authenticationService.EmpresaEnOtraTablaExiste(email);

        if (!ExisteUserEnOtraTabla)
        {
            boolean exitoActualizar = EmpresasServicio.actualizarEmail(empresadata.getId(),email);
            if(exitoActualizar) {
                return ResponseEntity.ok(authenticationService.NuevoTokenEmpresa(empresadata.getId()));
            }
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
    }

    @PostMapping("/newDescription")
    public Empresa newDescription(@RequestParam("valor") String des){
        EmpresaData empresadata = new EmpresaData();
        return EmpresasServicio.actualizarDescripcion(empresadata.getId(),des);
    }

    @PostMapping("/newLink")
    public Empresa newLink(@RequestParam("valor") String link){
        EmpresaData empresadata = new EmpresaData();
        return EmpresasServicio.actualizarLink(empresadata.getId(),link);
    }

    @DeleteMapping("/eliminarCuenta")
    public ResponseEntity<String> eliminarCuenta(){
        EmpresaData empresadata = new EmpresaData();
        boolean delete = EmpresasServicio.eliminarCuenta(empresadata.getId());
        if (delete) {
            return ResponseEntity.ok("eliminado");
        } else {
            return ResponseEntity.badRequest().body("No eliminado");
        }
    }

}
