package smart_scheduler_appointment.appointment_service.security;

import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
	@Value("${jwt.secret}")
	private  String jwtSecret ;
	
	  public  Claims validateToken(String token) {
		  System.out.println(jwtSecret);
	        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	        return Jwts.parserBuilder()
	                .setSigningKey(key)
	                .build()
	                .parseClaimsJws(token)
	                .getBody(); // returns claims (user info, roles, etc.)
	    }
}
