package com.carbonledger.backend.service;

import com.carbonledger.backend.entity.StandardEmissionFactor;
import com.carbonledger.backend.exception.ResourceNotFoundException;
import com.carbonledger.backend.repository.StandardEmissionFactorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmissionCalculationEngine {

    private final StandardEmissionFactorRepository emissionFactorRepository;

    public BigDecimal calculateCo2e(BigDecimal quantity, BigDecimal factorValue) {
        if (quantity == null || factorValue == null) {
            throw new IllegalArgumentException("Quantity and factor value must not be null");
        }
        return quantity.multiply(factorValue).setScale(2, RoundingMode.HALF_UP);
    }

    public StandardEmissionFactor resolveEmissionFactor(String category) {
        return emissionFactorRepository.findFirstByCategoryIgnoreCaseAndIsActiveTrue(category)
                .orElseThrow(() -> new ResourceNotFoundException("StandardEmissionFactor", "category", category));
    }

    public BigDecimal calculateForCategory(String category, BigDecimal quantity) {
        StandardEmissionFactor factor = resolveEmissionFactor(category);
        return calculateCo2e(quantity, factor.getFactorValue());
    }
}
