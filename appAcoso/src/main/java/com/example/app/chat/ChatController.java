package com.example.app.chat;

import com.example.app.auth.AuthenticationResponse;
import com.example.app.controllers.User.setRequestUser;
import com.example.app.servicios.ChatService;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.DefaultUserDestinationResolver;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    @Autowired
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/api/chat/newChatID")
    public ResponseEntity<Integer> newChatID(){
        return ResponseEntity.ok(chatService.newChat());
    }

    @GetMapping("/api/chat/setChatID")
    public ResponseEntity<Integer> setChatID(){
        return ResponseEntity.ok(chatService.setChat());
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        // Guardar el nuevo mensaje
        chatService.saveChatMessage(chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Cargar mensajes pasados y enviar al nuevo usuario
        List<ChatMessage> pastMessages = chatService.getChatMessages();
        pastMessages.forEach(message -> {
            messagingTemplate.convertAndSendToUser(chatMessage.getSender(), "/topic/public", message);
        });

        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());

        return chatMessage;
    }

    @GetMapping("/api/chat/history")
    @ResponseBody
    public List<ChatMessage> getChatHistory() {
        return chatService.getChatMessages();
    }
}
