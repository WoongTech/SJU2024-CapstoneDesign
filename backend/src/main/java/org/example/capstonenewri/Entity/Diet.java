package org.example.capstonenewri.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.example.capstonenewri.Entity.Type.DietType;
import org.example.capstonenewri.Entity.Type.KoreanOrAll;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Diet extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "diet_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private DietType diettype;

    @Enumerated(EnumType.STRING)
    private KoreanOrAll koreanOrAll;

    private LocalDateTime intakeTime;
    private String food; // ai 서버의 결과를 받아올 것임.
    private String ingredients; // ai 서버의 결과를 받아올 것임.
    private Integer amount; // ai 서버의 결과를 받아올 것임.

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @OneToOne(mappedBy = "diet")
    private DietDiary dietDiary;

}
