/**
 * 
 */
package com.webapp.controllers;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.webapp.exceptions.WebAppException;
import com.webapp.service.TaskService;
import com.webapp.service.UserService;
import com.webapp.vo.BaseResponse;
import com.webapp.vo.TaskVo;
import com.webapp.vo.User;

/**
 * @author kartikkarnayil
 *
 */
@RestController
@RequestMapping("/user")
public class UserAPIController {

	final static Logger logger = Logger.getLogger(UserAPIController.class);

	private Gson gson = new Gson();

	private static final String SUCCESS_STATUS = "success";
	private static final int SUCCESS_CODE = 200;

	@Autowired
	private transient UserService userService;
	
	@Autowired
	private transient TaskService taskService;

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public BaseResponse createUser(@RequestBody String userInput) {

		BaseResponse response = new BaseResponse();
		try {
			logger.info("Create User: " + userInput);
			User user = gson.fromJson(userInput, User.class);
			userService.createUser(user);
			user.setPassWord(null);
			response.setResponse(user);
			response.setStatus(SUCCESS_STATUS);
			response.setCode(SUCCESS_CODE);
		} catch (WebAppException e) {
			logger.error("Create user: " + e.getMessage());
			response.setCode(400);
			response.setStatus(e.getMessage());
		} catch (Exception e) {
			logger.error("Create user: " + e.getMessage());
			response.setCode(500);
			response.setStatus(e.getMessage());
		}
		return response;
	}

	@RequestMapping(value = "/validate", method = RequestMethod.POST)
	public BaseResponse loginUser(@RequestBody String userInput) {

		BaseResponse response = new BaseResponse();
		try {
			logger.info("Create User: " + userInput);
			User user = gson.fromJson(userInput, User.class);
			user = userService.validateUser(user);
			response.setResponse(user);
			response.setStatus(SUCCESS_STATUS);
			response.setCode(SUCCESS_CODE);
		} catch (WebAppException e) {
			logger.error("Create user: " + e.getMessage());
			response.setCode(400);
			response.setStatus(e.getMessage());
		} catch (Exception e) {
			logger.error("Create user: " + e.getMessage());
			response.setCode(500);
			response.setStatus(e.getMessage());
		}
		return response;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public BaseResponse listAllUsers() {
		logger.info("List All Users()");

		BaseResponse response = new BaseResponse();
		try {
			List<User> users = userService.listUsers();
			response.setResponse(users);
			response.setStatus(SUCCESS_STATUS);
			response.setCode(SUCCESS_CODE);
		} catch (Exception e) {
			logger.error("List users: " + e.getMessage());
			response.setCode(500);
			response.setStatus(e.getMessage());
		}
		return response;

	}

	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public BaseResponse updateUser(@RequestBody String userInput) {

		BaseResponse response = new BaseResponse();
		try {
			logger.info("Update User: " + userInput);
			User user = gson.fromJson(userInput, User.class);
			user = userService.updateUser(user);
			user.setPassWord(null);
			response.setResponse(user);
			response.setStatus(SUCCESS_STATUS);
			response.setCode(SUCCESS_CODE);
		} catch (Exception e) {
			logger.error("Update user: " + e.getMessage());
			response.setCode(500);
			response.setStatus(e.getMessage());
		}
		return response;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public BaseResponse deleteUser(@RequestBody String userInput) {

		BaseResponse response = new BaseResponse();
		try {
			logger.info("Delete User: " + userInput);
			User user = gson.fromJson(userInput, User.class);
			boolean isDeleted = userService.deleteUser(user);
			logger.info("User Deleted: " + isDeleted);

			response.setStatus(SUCCESS_STATUS);
			response.setCode(SUCCESS_CODE);
		} catch (Exception e) {
			logger.error("Delete user: " + e.getMessage());
			response.setCode(500);
			response.setStatus(e.getMessage());
		}
		return response;
	}

	@RequestMapping(value = "/delete/all", method = RequestMethod.DELETE)
	public BaseResponse deleteAll() {

		BaseResponse response = new BaseResponse();
		try {
			logger.info("Delete All.");
			boolean isDeleted = userService.deleteAll();
			logger.info("User Deleted: " + isDeleted);
			response.setStatus(SUCCESS_STATUS);
			response.setCode(SUCCESS_CODE);
		} catch (Exception e) {
			logger.error("Delete All: " + e.getMessage());
			response.setCode(500);
			response.setStatus(e.getMessage());
		}
		return response;
	}
	
	@RequestMapping(value = "/listtask", method = RequestMethod.GET, produces  = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public BaseResponse listUserTasks() {
		logger.info("List UserTasks()");

		BaseResponse response = new BaseResponse();
		try {
			List<TaskVo> userTasks = taskService.findTasks(new TaskVo("kartik.karnayil@sapient.com"));
			response.setResponse(userTasks);
			response.setStatus(SUCCESS_STATUS);
			response.setCode(SUCCESS_CODE);
		} catch (Exception e) {
			logger.error("List users: " + e.getMessage());
			response.setCode(500);
			response.setStatus(e.getMessage());
		}
		System.out.println(response);
		return response;

	}
}
