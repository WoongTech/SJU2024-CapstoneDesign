package org.example.capstonenewri.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.RequestAnalysisDto;
import org.example.capstonenewri.Dto.ResponseAnalysisDto;
import org.example.capstonenewri.Entity.Diet;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.DietRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;


@Service
@Transactional
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisServie{

    private final DietRepository dietRepository;
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;


    @Value("${flask.url}")  // ai 서버 주소
    private String url;
    String endPoint = "/test/test/test"; // uri

    @Override
    public void analyzeNutrition(RequestAnalysisDto requestAnalysisDto) {

       HttpHeaders headers = new HttpHeaders();
       headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("foodImage", requestAnalysisDto.getFoodImage().getResource());
        body.add("koreanOrAll", requestAnalysisDto.getKoreanOrAll());

        System.out.println("ㅎ하ㅏ핳하하");

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<ResponseAnalysisDto> responseEntity = restTemplate.exchange(
                url + endPoint,
                HttpMethod.POST,
                requestEntity,
                ResponseAnalysisDto.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null){
            Member member = memberRepository.findByEmail(requestAnalysisDto.getEmail())
                    .orElseThrow(() -> new EntityNotFoundException("Member not found with email: " + requestAnalysisDto.getEmail()));

            Diet diet = Diet.builder().
                    diettype(requestAnalysisDto.getDietType())
                    .koreanOrAll(requestAnalysisDto.getKoreanOrAll())
                    .intakeTime(requestAnalysisDto.getIntakeTime())
                    .food(responseEntity.getBody().getFood())
                    .ingredients(responseEntity.getBody().getIngredients())
                    .amount(responseEntity.getBody().getAmount())
                    .member(member)
                    .build();

            dietRepository.save(diet);


        } else {
            throw new RestClientException("AI 서버로부터의 응답이 올바르지 않습니다.");
        }

    }
}
