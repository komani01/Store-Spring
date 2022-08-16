package poly.store.rest.controller;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poly.store.entity.Order;
import poly.store.entity.Product;
import poly.store.entity.Role;
import poly.store.service.OrderService;
import poly.store.service.ProductService;
import poly.store.service.RoleService;
@CrossOrigin("*")
@RestController
@RequestMapping("/rest/roles")
public class RoleRestController {
	@Autowired
	RoleService roleSv;
	
	@GetMapping
	public List<Role> getAll(){
		return roleSv.findAll();
	}
}
