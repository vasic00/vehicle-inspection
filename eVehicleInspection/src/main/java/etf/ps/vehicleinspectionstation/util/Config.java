package etf.ps.vehicleinspectionstation.util;

import etf.ps.vehicleinspectionstation.model.pricelist.PriceList;
import io.minio.MinioClient;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.google.gson.Gson;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.*;

@Configuration
public class Config {
    @Value("classpath:config.json")
    Resource resource;
    @Value("${minio.access.key}")
    private String minio_key;
    @Value("${minio.access.secret}")
    private String minio_secret;
    @Value("${minio.url}")
    private String minio_url;
    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper=new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        return  modelMapper;
    }

    @Bean
    public MinioClient minioClient(){
        return MinioClient.builder()
                .endpoint(minio_url)
                .credentials(minio_key, minio_secret)
                .build();
    }
    @Bean
    public PriceList priceList(){
//        File file = null;
        try {
//            file = resource.getFile();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));){
                Gson gson=new Gson();
                StringBuffer sb = new StringBuffer();
                String line = "";
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
                reader.close();
                return gson.fromJson(sb.toString(), PriceList.class);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Bean
    public CustomLogger logger(){
        return new CustomLogger();
    }
}
