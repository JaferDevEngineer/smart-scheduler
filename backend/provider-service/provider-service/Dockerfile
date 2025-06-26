
#Assign Java
FROM openjdk:17

#working directory
WORKDIR /app

COPY target/provider-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8002

ENTRYPOINT ["java", "-jar", "app.jar" ]
