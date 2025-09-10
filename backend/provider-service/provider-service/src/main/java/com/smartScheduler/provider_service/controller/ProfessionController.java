package com.smartScheduler.provider_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartScheduler.provider_service.Entity.Profession;
import com.smartScheduler.provider_service.service.ProfessionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/professions")
@RequiredArgsConstructor
public class ProfessionController {

    private final ProfessionService service;

    @GetMapping
    public List<Profession> getAllProfessions() {
        return service.getAllProfessions();
    }
}
