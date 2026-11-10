package com.carbonledger.backend.service;

import com.carbonledger.backend.entity.StandardEmissionFactor;
import com.carbonledger.backend.entity.SystemReferenceBenchmark;
import com.carbonledger.backend.exception.ResourceNotFoundException;
import com.carbonledger.backend.repository.StandardEmissionFactorRepository;
import com.carbonledger.backend.repository.SystemReferenceBenchmarkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MasterDataService {

    private final StandardEmissionFactorRepository factorRepository;
    private final SystemReferenceBenchmarkRepository benchmarkRepository;

    @Transactional(readOnly = true)
    public List<StandardEmissionFactor> getActiveFactors() {
        return factorRepository.findByIsActiveTrue();
    }

    @Transactional(readOnly = true)
    public List<StandardEmissionFactor> getFactorsByCategory(String category) {
        return factorRepository.findByCategoryAndIsActiveTrue(category);
    }

    @Transactional
    public StandardEmissionFactor saveFactor(StandardEmissionFactor factor) {
        return factorRepository.save(factor);
    }

    @Transactional
    public void deleteFactor(UUID id) {
        StandardEmissionFactor factor = factorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("StandardEmissionFactor", "id", id));
        factor.setIsActive(false);
        factorRepository.save(factor);
    }

    @Transactional(readOnly = true)
    public List<SystemReferenceBenchmark> getAllBenchmarks() {
        return benchmarkRepository.findAll();
    }
}
