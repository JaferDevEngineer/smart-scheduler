
# Use a base image with Java runtime
FROM eclipse-temurin:17-jdk-jammy

# Set the working directory inside the container
WORKDIR /app

# used to copy the jar file 
COPY target/user-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8001

#app run command
ENTRYPOINT ["java", "-jar", "app.jar"]
