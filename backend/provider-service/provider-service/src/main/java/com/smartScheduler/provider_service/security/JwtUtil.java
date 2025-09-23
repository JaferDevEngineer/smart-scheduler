package com.smartScheduler.provider_service.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtil {
	
	@Value("${jwt.secret}")
	private String jwtSecret;
	
	private final long jwtExpirationInMs = 86400000; // 1 day
	
	
	public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
//	public boolean validateToken(String token) {
//        try {
//            Jws<Claims> map = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
//            log.warn("map "+map);
//            return true;
//        } catch (Exception e) {
//        	log.warn("Issue in validate");
//        	e.printStackTrace();
//            return false;
//        }
//    }
	public  Claims validateToken(String token) {
		  System.out.println(jwtSecret);
	        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	        return Jwts.parserBuilder()
	                .setSigningKey(key)
	                .build()
	                .parseClaimsJws(token)
	                .getBody(); // returns claims (user info, roles, etc.)
	    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey())
                .build().parseClaimsJws(token).getBody().getSubject();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

}

