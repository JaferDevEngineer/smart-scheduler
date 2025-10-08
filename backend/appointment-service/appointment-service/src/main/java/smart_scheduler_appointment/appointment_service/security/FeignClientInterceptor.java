package smart_scheduler_appointment.appointment_service.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class FeignClientInterceptor implements RequestInterceptor{

	@Override
	public void apply(RequestTemplate template) {
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        if (authentication != null && authentication.getCredentials() instanceof String jwtToken) {
	            template.header("Authorization", "Bearer " + jwtToken);
	        }
		
	}

}
