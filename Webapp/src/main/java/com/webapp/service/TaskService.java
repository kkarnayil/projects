/**
 * 
 */
package com.webapp.service;

import java.util.List;

import com.webapp.exceptions.WebAppException;
import com.webapp.vo.TaskVo;

/**
 * @author kartikkarnayil
 *
 */
public interface TaskService {

	/**
	 * Method to create task
	 * 
	 * @param taskVo
	 *            task object
	 * @return id of the task created
	 * @throws Exception
	 */
	public int createTask(TaskVo taskVo) throws Exception;

	/**
	 * Method to delete the task
	 * 
	 * @param taskVo
	 *            task input object
	 * @return status of delete
	 * @throws WebAppException
	 */
	public boolean deleteTask(TaskVo taskVo) throws WebAppException;

	/**
	 * Method to find users tasks
	 * 
	 * @param taskVo
	 *            task input object
	 * @return list of tasks
	 * @throws WebAppException
	 */
	public List<TaskVo> findTasks(TaskVo taskVo) throws WebAppException;
}
