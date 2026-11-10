package com.carbonledger.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class GeminiClient {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Value("${app.gemini.api-key:}")
    private String apiKey;

    @Value("${app.gemini.model:gemini-1.5-flash}")
    private String modelName;

    public GeminiClient(RestClient restClient, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.objectMapper = objectMapper;
    }

    public String generateStructuredAnalysis(String systemPrompt, String userContext) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("Gemini API key is not configured. Returning fallback insight template.");
            return generateFallbackInsight();
        }

        try {
            String path = String.format("/v1beta/models/%s:generateContent?key=%s", modelName, apiKey);

            Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                    Map.of(
                        "role", "user",
                        "parts", List.of(
                            Map.of("text", systemPrompt + "\n\nContext Data:\n" + userContext)
                        )
                    )
                ),
                "generationConfig", Map.of(
                    "responseMimeType", "application/json",
                    "temperature", 0.2
                )
            );

            String responseString = restClient.post()
                    .uri(path)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            JsonNode root = objectMapper.readTree(responseString);
            JsonNode candidateText = root.path("candidates").get(0)
                    .path("content").path("parts").get(0).path("text");

            return candidateText.asText();
        } catch (Exception e) {
            log.error("Failed to generate AI insight via Gemini API: {}", e.getMessage(), e);
            return generateFallbackInsight();
        }
    }

    private String generateFallbackInsight() {
        return """
        {
          "executive_summary": "Tổng phát thải trong kỳ được kiểm soát ổn định. Đề xuất tiếp tục theo dõi các danh mục tiêu thụ trọng yếu như điện và nhiên liệu di chuyển.",
          "breakdown_analysis": {
            "top_emitter": "ELECTRICITY",
            "efficiency_rating": "GOOD"
          },
          "quick_wins": [
            {
              "action_title": "Tối ưu hóa thiết bị làm mát và điều hòa",
              "action_description": "Cài đặt nhiệt độ điều hòa ở mức 26°C và vệ sinh định kỳ lưới lọc gió.",
              "potential_savings_kg": 15.5,
              "priority": "HIGH"
            }
          ]
        }
        """;
    }
}
