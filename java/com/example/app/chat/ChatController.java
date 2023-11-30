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
    public ResponseEntity<Integer> newChatID(@RequestParam("userEmail") String userEmail){
        return ResponseEntity.ok(chatService.newChat(userEmail));
    }

    @GetMapping("/api/chat/setChatID")
    public ResponseEntity<Integer> setChatID(@RequestParam("adminEmail") String adminEmail){
        return ResponseEntity.ok(chatService.setChat(adminEmail));
    }

    @GetMapping("/api/chat/getHistorialChats")
    public ResponseEntity<List<List<ChatMessage>>> getHistorialChats(@RequestParam("userEmail") String userEmail, @RequestParam("tiempo") String tiempo){
        return ResponseEntity.ok().body(chatService.getHistorialChats(userEmail,tiempo));
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
            SimpMessageHeaderAccessor headerAccessor,
            @RequestParam("userEmail") String userEmail
    ) {
        // Cargar mensajes pasados y enviar al nuevo usuario
        List<ChatMessage> pastMessages = chatService.getChatMessages(userEmail);
        pastMessages.forEach(message -> {
            messagingTemplate.convertAndSendToUser(chatMessage.getSender(), "/topic/public", message);
        });

        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());

        return chatMessage;
    }

    @GetMapping("/api/chat/history")
    @ResponseBody
    public List<ChatMessage> getChatHistory(@RequestParam("userName") String userName) {
        return chatService.getChatMessages(userName);
    }
}
