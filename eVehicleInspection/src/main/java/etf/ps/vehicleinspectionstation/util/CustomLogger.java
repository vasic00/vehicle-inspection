package etf.ps.vehicleinspectionstation.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.*;

public class CustomLogger {

    private final Logger logger=LoggerFactory.getLogger("CustomLogger");

    public void logException(Exception e,boolean error){
        log(e.toString(),error);
    }
    public void log(String message, boolean error){
        if(error)
            logger.error(message);
        else
            logger.warn(message);
    }
}
