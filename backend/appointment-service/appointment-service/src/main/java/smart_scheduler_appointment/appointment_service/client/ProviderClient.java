package smart_scheduler_appointment.appointment_service.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import smart_scheduler_appointment.appointment_service.Dto.ProviderRequest;
import smart_scheduler_appointment.appointment_service.data.ProviderResponse;

@FeignClient(name="provider-service")
public interface ProviderClient {

	@PostMapping("/api/provider/getById")
	List<ProviderResponse> getProviderByIds(@RequestBody ProviderRequest providerRequest);
}
