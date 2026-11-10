package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.StandardEmissionFactor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StandardEmissionFactorRepository extends JpaRepository<StandardEmissionFactor, UUID> {
    List<StandardEmissionFactor> findByIsActiveTrue();
    List<StandardEmissionFactor> findByCategoryAndIsActiveTrue(String category);
    Optional<StandardEmissionFactor> findFirstByCategoryIgnoreCaseAndIsActiveTrue(String category);
}
