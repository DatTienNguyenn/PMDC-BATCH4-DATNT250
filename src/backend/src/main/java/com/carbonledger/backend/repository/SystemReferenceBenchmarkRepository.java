package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.SystemReferenceBenchmark;
import com.carbonledger.backend.entity.enums.BenchmarkType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SystemReferenceBenchmarkRepository extends JpaRepository<SystemReferenceBenchmark, UUID> {
    List<SystemReferenceBenchmark> findByBenchmarkType(BenchmarkType benchmarkType);
    Optional<SystemReferenceBenchmark> findByBenchmarkTypeAndActivityCategory(BenchmarkType benchmarkType, String activityCategory);
}
