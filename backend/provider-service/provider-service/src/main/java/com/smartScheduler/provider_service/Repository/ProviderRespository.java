package com.smartScheduler.provider_service.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.smartScheduler.provider_service.Entity.Provider;

public interface ProviderRespository extends JpaRepository<Provider, Long> {

	Optional<Provider> findByEmail(String email);

	boolean existsByEmail(String email);

	@Query("SELECT p FROM Provider p JOIN FETCH p.profession pf WHERE (:category is null OR pf.category = :category) AND (:search is null OR p.name like CONCAT('%', :search, '%')OR p.email like CONCAT('%', :search, '%') ) AND (:professionId = 0 OR p.profession.id = :professionId)")
	List<Provider> findByProfessionAndEmailAndSearch(int professionId, String search,String category, PageRequest pageRequest);
	
	@Query("SELECT count(p) FROM Provider p WHERE (:search is null OR p.name like CONCAT('%', :search, '%') OR p.email like CONCAT('%', :search, '%') ) AND (:professionId = 0 OR p.profession.id = :professionId)")
	Optional<Integer> findCountByProfessionAndEmailAndSearch(int professionId, String search);

}
