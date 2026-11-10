# ==============================================================================
# Multi-stage Dockerfile for CarbonLedger Backend API
# Java 21 LTS + Spring Boot 3.x
# ==============================================================================

# Stage 1: Build application
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /workspace

# Copy maven wrapper & pom.xml for dependency caching
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -B

# Copy source code and build package
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create non-root system user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built artifact from builder
COPY --from=builder /workspace/target/*.jar app.jar

USER appuser:appgroup

EXPOSE 8080

ENV JAVA_OPTS="-XX:+UseG1GC -XX:MaxRAMPercentage=75.0"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
