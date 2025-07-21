#FROM openjdk:17 
#WORKDIR /app 
#COPY target/api-gateway-0.0.1-SNAPSHOT.jar app.jar 
#EXPOSE 9000
#ENTRYPOINT ["java", "-jar", "app.jar"]



ARG RUNTIME_BASE=eclipse-temurin:17-jre-jammy


FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests


#Stage 2

FROM ${RUNTIME_BASE}


WORKDIR /app

COPY --from=builder /app/target/api-gateway-0.0.1-SNAPSHOT.jar app.jar

ENV JAVA_TOOL_OPTIONS="-Xmx256m -XX:+UseSerialGC"

EXPOSE 9000
ENTRYPOINT ["java", "-jar", "app.jar"]
