package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dao.AppUserDao;
import etf.ps.vehicleinspectionstation.dto.AppUserDto;
import etf.ps.vehicleinspectionstation.model.AppUser;
import etf.ps.vehicleinspectionstation.services.AppUserService;
import etf.ps.vehicleinspectionstation.util.CustomLogger;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserServiceImpl implements AppUserService {
    private final AppUserDao appUserDao;
    private final ModelMapper modelMapper;
    private final CustomLogger logger;

    public AppUserServiceImpl(AppUserDao appUserDao, ModelMapper modelMapper, CustomLogger logger) {
        this.appUserDao = appUserDao;
        this.modelMapper = modelMapper;
        this.logger = logger;
    }

    @Override
    public AppUserDto loadUserByUsername(String username) {
        AppUser appUser=appUserDao.findByUsername(username);
        if (appUser!=null)
            return modelMapper.map(appUser,AppUserDto.class);
        else{
            logger.log("Invalid username ("+username+")!",true);
            return null;
        }
    }

    @Override
    public boolean blockUser(long id) {
        Optional<AppUser> entity=appUserDao.findById(id);
        if (entity.isPresent()){
            entity.get().setBlocked(true);
            appUserDao.saveAndFlush(entity.get());
            return false;
        }else{
            logger.log("Invalid user id ("+id+")!",false);
            return false;
        }
    }
}
