package com.example.app.chat;

import com.example.app.entidades.Emergencia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nameUser;
    private String nameAdmin;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ChatMessage> mensajes;

}
