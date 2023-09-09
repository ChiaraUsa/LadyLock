package com.example.app.LugaresConfi;

import com.example.app.repository.LugaresCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LugaresServicio {
    @Autowired
    LugaresCrudRepository lugaresCrudRepository;
    public Object findAll() {return lugaresCrudRepository.findAll();}
}
