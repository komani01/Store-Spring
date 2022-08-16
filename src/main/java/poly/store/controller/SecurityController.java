package poly.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SecurityController {
		@RequestMapping("/security/login/form")
		public String login(Model model) {
			model.addAttribute("message", "Please login to use!!");
			return "security/login";
		}
		
		@RequestMapping("/security/login/success")
		public String loginSuccess(Model model) {
			model.addAttribute("message", "Login Completed!!");
			return "security/login";
		}
		
		@RequestMapping("/security/login/error")
		public String loginError(Model model) {
			model.addAttribute("message", "Login Failed!!");
			return "security/login";
		}
		
		
		@RequestMapping("/security/unauthoried")
		public String unauthoried(Model model) {
			model.addAttribute("message", "You can not access permission!!");
			return "security/login";
		}
		
		@RequestMapping("/security/logoff/success")
		public String logOffSuccess(Model model) {
			model.addAttribute("message", "Log off completed!!");
			return "security/login";
		}
}
