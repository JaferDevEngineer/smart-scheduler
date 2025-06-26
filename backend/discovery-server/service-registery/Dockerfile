
#Assign java
FROM eclipse-temurin:17-jdk-jammy

#working directory
WORKDIR /app

#jar
COPY target/service-registery-0.0.1-SNAPSHOT.jar app.jar

#expose
EXPOSE 8761

ENTRYPOINT ["java", "-jar", "app.jar"]
