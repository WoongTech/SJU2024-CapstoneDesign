package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.capstonenewri.Entity.Type.DietType;
import org.example.capstonenewri.Entity.Type.KoreanOrAll;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;

// 프론트 -> 백 전달 데이터

@Getter
@Setter
@NoArgsConstructor
public class RequestAnalysisDto {
    private DietType dietType;
    private KoreanOrAll koreanOrAll;
    private LocalDateTime intakeTime;
    private String email; // 이메일을 이용해 select 해서 Member entity와 연결시킬 것임.

    @Builder
    public RequestAnalysisDto(DietType dietType, KoreanOrAll koreanOrAll,
                              LocalDateTime intakeTime, String email){
        this.dietType = dietType;
        this.koreanOrAll = koreanOrAll;
        this.intakeTime = intakeTime;
        this.email = email;
    }

}
