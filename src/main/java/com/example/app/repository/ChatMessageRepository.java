package com.example.app.repository;

import com.example.app.chat.ChatMessage;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChatMessageRepository extends CrudRepository<ChatMessage,Integer> {
    // Aquí podrías agregar métodos personalizados si necesitas consultas específicas
    List<ChatMessage> findAll();
}
