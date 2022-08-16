package poly.store.service;

import java.util.List;
import poly.store.entity.Account;
import poly.store.entity.Authority;

public interface AuthorityService {

	public List<Authority> findAllAuthorOfAdmin();

	public	List<Authority> findAll();

	public Authority create(Authority au);

	public void delete(Integer id);



	
}
