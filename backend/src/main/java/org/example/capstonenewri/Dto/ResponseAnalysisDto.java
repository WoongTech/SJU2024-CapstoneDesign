package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;

// ai 서버 -> 백으로 받을 응답 데이터 형식

@Getter
@Setter
@NoArgsConstructor
public class ResponseAnalysisDto {
    private String food;
    private String ingredients;
    private Integer amount;

    @Builder
    public ResponseAnalysisDto(String food, String ingredients, Integer amount){
        this.food = food;
        this.ingredients = ingredients;
        this.amount = amount;
    }

}
