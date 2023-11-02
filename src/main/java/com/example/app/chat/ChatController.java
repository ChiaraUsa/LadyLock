package com.example.app.chat;

import com.example.app.servicios.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(
            @Payload ChatMessage chatMessage
    ) {
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

    @PostMapping("/chat.mensaje")
    public void enviarMensaje(@RequestBody ChatMessage mensaje) {
        // Aquí puedes transformar el ChatMessage en ChatMessageEntity y guardar en la base de datos
        ChatMessage messageEntity = new ChatMessage();
        messageEntity.setType(mensaje.getType());
        messageEntity.setContent(mensaje.getContent());
        messageEntity.setSender(mensaje.getSender());

        chatService.guardarMensaje(messageEntity);
    }

    @GetMapping("/chat.mensajes")
    public List<ChatMessage> obtenerMensajes() {
        // Recuperar los mensajes y devolver una lista de ChatMessageEntity
        return chatService.obtenerMensajes();
    }
}
