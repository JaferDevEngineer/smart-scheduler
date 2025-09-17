package smart_scheduler_appointment.appointment_service.data;

import java.nio.ByteBuffer;
import java.util.Random;
import java.util.UUID;

public class Utils {

	public static String generateUUID() {
		long timestamp = System.currentTimeMillis();
		long randomLong = Math.abs(new Random().nextLong());
	    UUID uuid = UUID.nameUUIDFromBytes(ByteBuffer.allocate(16).putLong(timestamp+randomLong).array());
	    return uuid.toString();
//		return UUID.randomUUID().toString();
	}
}
