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
import com.webapp.vo.BaseResponse;
import com.webapp.vo.TaskVo;

/**
 * @author kartikkarnayil
 *
 */
@RestController
@RequestMapping("/task")
public class TaskAPIController {

	final static Logger logger = Logger.getLogger(TaskAPIController.class);

	private Gson gson = new Gson();

	private static final String SUCCESS_STATUS = "success";
	private static final int SUCCESS_CODE = 200;

	@Autowired
	private transient TaskService taskService;

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public BaseResponse createTask(@RequestBody String taskInput) {

		BaseResponse response = new BaseResponse();
		try {
			logger.info("Create task: " + taskInput);
			TaskVo task = gson.fromJson(taskInput, TaskVo.class);
			int id = taskService.createTask(task);
			response.setResponse(id);
			response.setStatus(SUCCESS_STATUS);
			response.setCode(SUCCESS_CODE);
		} catch (WebAppException e) {
			logger.error("Create Task: " + e.getMessage());
			response.setCode(400);
			response.setStatus(e.getMessage());
		} catch (Exception e) {
			logger.error("Create Task: " + e.getMessage());
			response.setCode(500);
			response.setStatus(e.getMessage());
		}
		return response;
	}

	


	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public BaseResponse deleteUser(@PathVariable("id") int id) {

		BaseResponse response = new BaseResponse();
		try {
			logger.info("Delete UserTask: " + id);
			
			boolean isDeleted = taskService.deleteTask(new TaskVo(id));
			logger.info("Task Deleted: " + isDeleted);
			response.setStatus(SUCCESS_STATUS);
			response.setCode(SUCCESS_CODE);
			response.setResponse(id);
		} catch (Exception e) {
			logger.error("Delete user: " + e.getMessage());
			response.setCode(500);
			response.setStatus(e.getMessage());
		}
		return response;
	}

}
