package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// ai 서버 -> 백으로 받을 응답 데이터 형식

@Getter
@Setter
@NoArgsConstructor
public class ResponseAIAnalysisDto {
    private String foods;
    private String ingredients;
    private Integer amount;

    @Builder
    public ResponseAIAnalysisDto(String food, String ingredients, Integer amount){
        this.foods = foods;
        this.ingredients = ingredients;
        this.amount = amount;
    }

}
