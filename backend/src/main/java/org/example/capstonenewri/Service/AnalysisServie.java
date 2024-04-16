package org.example.capstonenewri.Service;

import org.example.capstonenewri.Dto.RequestAnalysisDto;
import org.example.capstonenewri.Dto.ResponseAnalysisDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AnalysisServie {
    ResponseAnalysisDto analyzeNutrition(List<MultipartFile> foodImages, RequestAnalysisDto requestAnalysisDto);


}
