package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.capstonenewri.Entity.Type.DietType;
import org.example.capstonenewri.Entity.Type.KoreanOrAll;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ResponseAnalysisDto {
    private DietType dietType;
    private KoreanOrAll koreanOrAll;
    private LocalDateTime intakeTime;
    private String foods;
    private String ingredients;
    private Integer amount;

    @Builder
    public ResponseAnalysisDto(DietType dietType, KoreanOrAll koreanOrAll, LocalDateTime intakeTime,
                               String foods, String ingredients, Integer amount){
        this.dietType = dietType;
        this.koreanOrAll = koreanOrAll;
        this.intakeTime = intakeTime;
        this.foods = foods;
        this.ingredients = ingredients;
        this.amount = amount;
    }
}
