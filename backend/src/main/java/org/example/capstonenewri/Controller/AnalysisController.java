package org.example.capstonenewri.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.RequestAnalysisDto;
import org.example.capstonenewri.Dto.ResponseAnalysisDto;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.MemberRepository;
import org.example.capstonenewri.Service.AnalysisServiceImpl;
import org.example.capstonenewri.Service.AnalysisServie;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("/api/diet")
@RequiredArgsConstructor
public class AnalysisController {

    private final MemberRepository memberRepository;
    private final AnalysisServiceImpl analysisServicImpl;

    @PostMapping(value = "/tmpsave", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}) // consumes는 수신하는 요청의 미디어 타입 지정.
    public ResponseAnalysisDto analyzeNutrition(Authentication authentication,
                                                @RequestPart(required = true, name = "foodImage") List<MultipartFile> foodImages,
                                                @RequestPart(name = "request") @Valid RequestAnalysisDto requestAnalysisDto
                                 ){
        requestAnalysisDto.setEmail(authentication.getName());
        System.out.println("request" + requestAnalysisDto.getEmail());
        //System.out.println("hahahaah");
       return analysisServicImpl.analyzeNutrition(foodImages, requestAnalysisDto);
    }

}
