package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.AppUserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AppUserService extends UserDetailsService {
    AppUserDto loadUserByUsername(String username);
    boolean blockUser(long id);
}
