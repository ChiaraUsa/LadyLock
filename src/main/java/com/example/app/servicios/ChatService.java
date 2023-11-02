package com.example.app.servicios;

import com.example.app.chat.ChatMessage;
import com.example.app.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;

    public ChatService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public void guardarMensaje(ChatMessage mensaje) {
        chatMessageRepository.save(mensaje);
    }

    public List<ChatMessage> obtenerMensajes() {
        return chatMessageRepository.findAll();
    }
}
