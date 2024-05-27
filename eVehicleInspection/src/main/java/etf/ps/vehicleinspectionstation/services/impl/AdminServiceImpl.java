package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dao.AdminDao;
import etf.ps.vehicleinspectionstation.dto.AdminDto;
import etf.ps.vehicleinspectionstation.dto.WorkerDto;
import etf.ps.vehicleinspectionstation.model.Admin;
import etf.ps.vehicleinspectionstation.model.Worker;
import etf.ps.vehicleinspectionstation.services.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService{
    private final AdminDao adminDao;
    private final ModelMapper modelMapper;

    public AdminServiceImpl(AdminDao adminDao, ModelMapper modelMapper) {
        this.adminDao = adminDao;
        this.modelMapper = modelMapper;
    }

    @Override
    public AdminDto findByUsername(String username) {
        Admin admin = adminDao.findAdminByUsername(username);
        if (admin != null)
            return modelMapper.map(admin, AdminDto.class);
        else return null;
    }
}
