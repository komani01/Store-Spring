package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.AccountDAO;
import poly.store.dao.AuthorityDAO;
import poly.store.entity.Account;
import poly.store.entity.Authority;
import poly.store.service.AccountService;
import poly.store.service.AuthorityService;

@Service
public class AuthorityServiceImpl implements AuthorityService{
	@Autowired
	AuthorityDAO dao;
	@Autowired
	AccountDAO acdao;
	
	@Override
	public List<Authority> findAllAuthorOfAdmin() {
		List<Account> accounts = acdao.getAdministrators();
		return dao.authoritiesOf(accounts);
	}
	@Override
	public List<Authority> findAll() {
		return dao.findAll();
	}
	@Override
	public Authority create(Authority au) {
		return dao.save(au);
	}
	@Override
	public void delete(Integer id) {
		dao.deleteById(id);
		
	}
	


}
