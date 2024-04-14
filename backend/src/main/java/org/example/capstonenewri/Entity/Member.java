package org.example.capstonenewri.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.example.capstonenewri.Entity.Type.Gender;
import org.example.capstonenewri.Entity.Type.Role;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Member extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "member_id")
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;
    private LocalDate birth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Boolean pregnant;
    private Boolean breastfeeding;
    private BigDecimal height;
    private BigDecimal weight;
    private BigDecimal bmi;
    private Boolean diabetes;
    private Boolean obesity;  // 비만
    private String cardio;  // 심혈관 질환
    private String digestive;  // 소화기
    private String kidney_disease;  // 신장질환
    private String nervous_system;  // 신경계
    private Boolean osteoporosis;  // 골다공증
    private Boolean constipation;  // 변비
    private Boolean anaemia;  // 빈혈
    private Boolean urinary_stone; //요로 결석
    private Boolean gout;  // 통풍
    private Boolean vegan;
    private String cancer;
    private String allergy;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Diet> diets = new ArrayList<>();

    @OneToOne
    private DRI dri;

}
