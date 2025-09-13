package smart_scheduler_appointment.appointment_service.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtAuthFilter authFilter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) {
		try {
			http.csrf().disable().authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
					.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
			http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
			return http.build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
}
