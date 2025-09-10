package com.smartScheduler.provider_service.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "profession")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;   
    private String name;       
}