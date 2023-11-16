package com.example.app.servicios;

import com.example.app.chat.Chat;
import com.example.app.chat.ChatMessage;
import com.example.app.repository.ChatMessageRepository;
import com.example.app.repository.ChatRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    @Autowired
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRepository chatRepository;

    public List<ChatMessage> getChatMessages() {
        return chatMessageRepository.findAll();
    }

    public void saveChatMessage(ChatMessage chatMessage) {
        chatMessageRepository.save(chatMessage);
    }

    public Integer newChat() {
        return chatRepository.save(new Chat()).getId();
    }

    public Integer setChat() {
        List<Chat> chats = (List<Chat>) chatRepository.findAll();
        return chats.get(chats.size()-1).getId();
    }
}




