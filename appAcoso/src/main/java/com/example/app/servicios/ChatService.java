package com.example.app.servicios;

import com.example.app.chat.Chat;
import com.example.app.chat.ChatMessage;
import com.example.app.repository.ChatMessageRepository;
import com.example.app.repository.ChatRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatService {

    @Autowired
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRepository chatRepository;

    public List<ChatMessage> getChatMessages(String name) {
        List<List<ChatMessage>> listaGeneral = new ArrayList<>();
        List<ChatMessage> listaUnida = new ArrayList<>();

        long numChats = chatRepository.count();

        for(int i=1; i<=numChats;i++)
        {
            List<ChatMessage> chatN;
            chatN=chatMessageRepository.findByChatId(i);

            for(ChatMessage c: chatN)
            {
                if(c.getSender().equals(name))
                {
                    listaGeneral.add(chatN);
                    break;
                }
            }
        }

        for (List<ChatMessage> lista : listaGeneral) {
            listaUnida.addAll(lista);
        }

        return listaUnida;
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

    public List<List<ChatMessage>> getHistorialChats(String userEmail, String tiempo) {

        List<List<ChatMessage>> listaGeneral = new ArrayList<>();
        //encontramos el numero de chats
        long numChats = chatRepository.count();

        if(userEmail.equals("Todos"))
        {
            for(int i=1; i<=numChats;i++)
            {
                List<ChatMessage> chatN;
                chatN=chatMessageRepository.findByChatId(i);
                if(!chatN.isEmpty())
                {
                    listaGeneral.add(chatN);
                }
            }
        }
        else
        {
            int indexOfAt = userEmail.indexOf('@');
            String nombre = userEmail.substring(0, indexOfAt);

            for(int i=1; i<=numChats;i++)
            {
                List<ChatMessage> chatN;
                chatN=chatMessageRepository.findByChatId(i);

                for(ChatMessage c: chatN)
                {
                    if(c.getSender().equals(nombre))
                    {
                        listaGeneral.add(chatN);
                        break;
                    }
                }
            }
        }

        if(tiempo.equals("Mas Recientes"))
        {
            Collections.reverse(listaGeneral);
        }

        return listaGeneral;
    }
}




