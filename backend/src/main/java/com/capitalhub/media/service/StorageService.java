package com.capitalhub.media.service;

import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class StorageService {

    private final MinioClient minioClient;

    @Value("${minio.bucket}")
    private String bucketName;

    @Value("${minio.url}")
    private String minioUrl;

    /**
     * Sube un archivo y devuelve la URL de acceso público o pres firmada.
     */
    public String uploadFile(MultipartFile file, String folder) {
        String fileName = folder + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        try (InputStream is = file.getInputStream()) {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName)
                            .stream(is, file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );

            // Opción A: Devolver URL directa (si el bucket es público)
            // return minioUrl + "/" + bucketName + "/" + fileName;

            // Opción B: Devolver URL firmada (más seguro, expira en 7 días)
             return minioClient.getPresignedObjectUrl(
                     GetPresignedObjectUrlArgs.builder()
                             .method(Method.GET)
                             .bucket(bucketName)
                             .object(fileName)
                             .expiry(7, TimeUnit.DAYS)
                             .build()
             );

        } catch (Exception e) {
            throw new RuntimeException("Error subiendo archivo a MinIO: " + e.getMessage());
        }
    }
}