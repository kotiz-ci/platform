# syntax=docker/dockerfile:1

# 1980-01-01 is the earliest timestamp supported by the ZIP format used for JARs.
ARG SOURCE_DATE_EPOCH=315532800
FROM eclipse-temurin:21.0.12_8-jdk-alpine-3.24@sha256:6ea5548706b60ac0a602eaf48af74792cbab012d90e811ca8db6184b16b5c3d6 AS build
ARG SOURCE_DATE_EPOCH

WORKDIR /workspace
COPY .mvn .mvn
COPY mvnw pom.xml ./
COPY src src
RUN --mount=type=cache,target=/root/.m2 \
    chmod +x mvnw && ./mvnw --batch-mode --no-transfer-progress \
    -Dproject.build.outputTimestamp="$SOURCE_DATE_EPOCH" \
    -DskipTests package && \
    touch -d "@$SOURCE_DATE_EPOCH" target/backend-*.jar

FROM eclipse-temurin:21.0.12_8-jre-alpine-3.24@sha256:974b08960c5d96694c780e65b2d5705268ab1e1ca1a0dd0caf4ba6c3fe34d699
ARG SOURCE_DATE_EPOCH

# CVE-2026-111497: no Temurin 3.24 image ships brotli-libs >= 1.2.1-r0 yet. Upgrade
# only that package and reset the mtimes apk touched so rebuilds stay identical.
RUN apk upgrade --no-cache --no-logfile brotli-libs && \
    touch -h -d "@$SOURCE_DATE_EPOCH" \
    $(apk info -qL brotli-libs 2>/dev/null | sed 's|^|/|') \
    /usr/lib /lib/apk/db /lib/apk/db/* /etc/apk /etc/apk/world /etc

RUN addgroup -S kotiz && \
    adduser -S kotiz -G kotiz && \
    touch -d "@$SOURCE_DATE_EPOCH" \
    /etc/passwd /etc/group /etc/group- /etc/shadow \
    /home/kotiz /home /etc
WORKDIR /app
RUN --mount=from=build,source=/workspace/target,target=/build-output \
    cp /build-output/backend-*.jar /app/app.jar && \
    chown kotiz:kotiz /app/app.jar && \
    touch -d "@$SOURCE_DATE_EPOCH" /app/app.jar /app
USER kotiz
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
