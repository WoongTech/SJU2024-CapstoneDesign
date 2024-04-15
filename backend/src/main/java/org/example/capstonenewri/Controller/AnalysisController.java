package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.RequestAnalysisDto;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.MemberRepository;
import org.example.capstonenewri.Service.AnalysisServiceImpl;
import org.example.capstonenewri.Service.AnalysisServie;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("/api/diet")
@RequiredArgsConstructor
public class AnalysisController {

    private final MemberRepository memberRepository;
    private final AnalysisServiceImpl analysisServicImpl;

    @PostMapping(value = "/tmpsave")
    public void analyzeNutrition(@RequestBody RequestAnalysisDto requestAnalysisDto, Authentication authentication){
        requestAnalysisDto.setEmail(authentication.getName());
        System.out.println("hahahaah");
        analysisServicImpl.analyzeNutrition(requestAnalysisDto);
    }

}
