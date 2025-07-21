
# Use a base image with Java runtime
#FROM eclipse-temurin:17-jdk-jammy

# Set the working directory inside the container
#WORKDIR /app

# used to copy the jar file 
#COPY target/user-service-0.0.1-SNAPSHOT.jar app.jar

#EXPOSE 8001

#app run command
#ENTRYPOINT ["java", "-jar", "app.jar"]





ARG RUNTIME_BASE=eclipse-temurin:17-jre-jammy


FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests


#Stage 2

FROM ${RUNTIME_BASE}


WORKDIR /app

COPY --from=builder /app/target/user-service-0.0.1-SNAPSHOT.jar app.jar

ENV JAVA_TOOL_OPTIONS="-Xmx256m -XX:+UseSerialGC"

EXPOSE 8001
ENTRYPOINT ["java", "-jar", "app.jar"]
