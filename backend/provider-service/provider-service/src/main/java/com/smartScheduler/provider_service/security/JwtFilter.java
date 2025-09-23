package com.smartScheduler.provider_service.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Component
@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

	
	 private final JwtUtil jwtUtil;
//	 private final ProviderDetailsService providerDetailsService;
	    
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader("Authorization");

		log.warn("in JwtFilter doFilterInternal "+header);
       if (header != null && header.startsWith("Bearer ")) {
           String token = header.substring(7);
//           String email = jwtUtil.extractUsername(token);
//
//           if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//               UserDetails userDetails = providerDetailsService.loadUserByUsername(email);

           	   var claims = jwtUtil.validateToken(token);
           	   log.warn("claims "+claims);
           	 String username = claims.getSubject();
           
//               if (jwtUtil.validateToken(token)) {
           	List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
                   UsernamePasswordAuthenticationToken authToken =
                           new UsernamePasswordAuthenticationToken(username, token, authorities);

                   authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                   log.warn("authentication "+authToken);
                   SecurityContextHolder.getContext().setAuthentication(authToken);
                   log.warn("After JwtFilter setAuthentication: " + SecurityContextHolder.getContext().getAuthentication());

//               }
//           }
       }

       filterChain.doFilter(request, response);
		
	}

}
