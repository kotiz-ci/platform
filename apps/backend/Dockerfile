FROM eclipse-temurin:21.0.12_8-jdk-alpine-3.24 AS build

WORKDIR /workspace
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw --batch-mode --no-transfer-progress dependency:go-offline
COPY src src
RUN ./mvnw --batch-mode --no-transfer-progress -DskipTests package

FROM eclipse-temurin:21.0.12_8-jre-alpine-3.24

RUN addgroup -S kotiz && adduser -S kotiz -G kotiz
WORKDIR /app
COPY --from=build --chown=kotiz:kotiz /workspace/target/backend-*.jar app.jar
USER kotiz
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
