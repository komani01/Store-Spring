package poly.store.service;

import java.io.File;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import poly.store.entity.Product;

public interface UploadService {
	File save(MultipartFile file, String folder);
}
