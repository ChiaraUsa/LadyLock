package com.example.app.servicios;

import com.example.app.chat.Chat;
import com.example.app.chat.ChatMessage;
import com.example.app.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    @Autowired
    private final ChatRepository chatRepository;

    public List<ChatMessage> getChatMessages(String userEmail) {
        List<Chat> TodosLosChats = (List<Chat>) chatRepository.findAll();
        List<Chat> userChats = TodosLosChats.stream().filter(chat -> userEmail.equals(chat.getNameUser())).collect(Collectors.toList());

        List<ChatMessage> userMessages = new ArrayList<>();
        for (Chat c : userChats) {
            userMessages.addAll(c.getMensajes());
        }

        return userMessages;
    }

    public void saveChatMessage(ChatMessage chatMessage) {
        Chat c = chatRepository.findById(chatMessage.getChatId()).get();
        c.getMensajes().add(chatMessage);
        chatRepository.save(c);
    }

    public Integer newChat(String userEmail) {
        Chat c = new Chat();
        c.setNameUser(userEmail);
        chatRepository.save(c);
        return c.getId();
    }

    public Integer setChat(String adminEmail) {
        List<Chat> chats = (List<Chat>) chatRepository.findAll();
        Chat c = chats.get(chats.size()-1);
        c.setNameAdmin(adminEmail);
        return c.getId();
    }

    public List<List<ChatMessage>> getHistorialChats(String userEmail, String tiempo) {

        return null;
    }
}




