package com.carbonledger.backend.service;

import com.carbonledger.backend.entity.StandardEmissionFactor;
import com.carbonledger.backend.repository.StandardEmissionFactorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmissionCalculationEngineTest {

    @Mock
    private StandardEmissionFactorRepository emissionFactorRepository;

    private EmissionCalculationEngine calculationEngine;

    @BeforeEach
    void setUp() {
        calculationEngine = new EmissionCalculationEngine(emissionFactorRepository);
    }

    @Test
    @DisplayName("Should correctly calculate kg CO2e with BigDecimal precision and RoundingMode.HALF_UP")
    void testCalculateCo2ePrecision() {
        BigDecimal quantity = new BigDecimal("125.5");
        BigDecimal factor = new BigDecimal("0.722100"); // Standard electricity factor

        // 125.5 * 0.722100 = 90.62355 -> rounded to 90.62
        BigDecimal result = calculationEngine.calculateCo2e(quantity, factor);

        assertThat(result).isEqualByComparingTo(new BigDecimal("90.62"));
    }

    @Test
    @DisplayName("Should correctly resolve category factor and calculate emission")
    void testCalculateForCategory() {
        StandardEmissionFactor factor = StandardEmissionFactor.builder()
                .category("ELECTRICITY")
                .factorValue(new BigDecimal("0.722100"))
                .unit("kWh")
                .build();

        when(emissionFactorRepository.findFirstByCategoryIgnoreCaseAndIsActiveTrue(eq("ELECTRICITY")))
                .thenReturn(Optional.of(factor));

        BigDecimal result = calculationEngine.calculateForCategory("ELECTRICITY", new BigDecimal("100.0"));

        assertThat(result).isEqualByComparingTo(new BigDecimal("72.21"));
    }
}
