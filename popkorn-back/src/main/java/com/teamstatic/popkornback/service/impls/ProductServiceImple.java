package com.teamstatic.popkornback.service.impls;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.ProductDTO;
import com.teamstatic.popkornback.entity.Product;
import com.teamstatic.popkornback.repository.ProductRepsitory;
import com.teamstatic.popkornback.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImple implements ProductService {

    final ProductRepsitory pRepsitory;

    public PageResultDTO<ProductDTO, Product> findByCategorylAndCategorym(String categoryl, String categorym,
            PageRequestDTO requestDTO) {

        Pageable pageable = requestDTO.getPageable(Sort.by("receiptdate").descending());

        Page<Product> result = pRepsitory.findByCategorylAndCategorym(categoryl, categorym, pageable);

        return new PageResultDTO<>(result, entity -> entityToDto(entity));
    }

    public PageResultDTO<ProductDTO, Product> findAll(PageRequestDTO requestDTO) {

        Pageable pageable = requestDTO.getPageable(Sort.by("receiptdate").descending());

        Page<Product> result = pRepsitory.findAll(pageable);

        return new PageResultDTO<>(result, entity -> entityToDto(entity));
    }

    @Override
    public List<Product> findByProductname(String productname) {
        return pRepsitory.findByProductname(productname);
    }

    public List<Product> findFirstProductByArtist(String artist){
        return pRepsitory.findFirstProductByArtist(artist);
    }

    public long countAll(){
        return pRepsitory.count();
    }

}
