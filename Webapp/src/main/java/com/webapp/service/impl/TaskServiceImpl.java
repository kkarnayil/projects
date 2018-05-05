/**
 * 
 */
package com.webapp.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapp.dao.TaskDao;
import com.webapp.exceptions.WebAppException;
import com.webapp.model.Task;
import com.webapp.model.Users;
import com.webapp.service.TaskService;
import com.webapp.vo.TaskVo;

/**
 * @author kartikkarnayil
 *
 */
@Service
@Transactional(readOnly = true)
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskDao taskDao;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.webapp.service.TaskService#createTask(com.webapp.vo.TaskVo)
	 */
	@Override
	@Transactional(readOnly = false)
	public int createTask(TaskVo taskVo) throws Exception {
		Users user = new Users();
		user.setEmailid(taskVo.getEmailId());

		Task task = new Task(taskVo.getTask(), user);
		return (int) taskDao.save(task);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.webapp.service.TaskService#deleteTask(com.webapp.vo.TaskVo)
	 */
	@Override
	@Transactional(readOnly = false)
	public boolean deleteTask(TaskVo taskVo) throws WebAppException {

		Task task = taskDao.findById(taskVo.getId());
		if (null == task) {
			throw new WebAppException("Task not found.");
		}

		taskDao.delete(task);
		return true;

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.webapp.service.TaskService#findTasks(com.webapp.vo.TaskVo)
	 */
	@Override
	public List<TaskVo> findTasks(TaskVo taskVo) throws WebAppException {

		List<Task> tasks = taskDao.findUserTasks(taskVo.getEmailId());
		List<TaskVo> userTasks = tasks.stream()
				.map(task -> new TaskVo(task.getId(), task.getTask(), taskVo.getEmailId()))
				.collect(Collectors.toList());

		return userTasks;

	}

}
