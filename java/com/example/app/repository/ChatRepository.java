package com.example.app.repository;

import com.example.app.chat.Chat;
import org.springframework.data.repository.CrudRepository;

public interface ChatRepository extends CrudRepository<Chat,Integer> {
}
