package com.example.app.repository;

import com.example.app.chat.ChatMessage;

import com.example.app.entidades.Emergencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    // Aquí podrías agregar métodos personalizados si necesitas consultas específicas
    List<ChatMessage> findAll();
    List<ChatMessage> findByChatId(int id);
}
