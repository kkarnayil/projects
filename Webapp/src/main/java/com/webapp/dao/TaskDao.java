/**
 * 
 */
package com.webapp.dao;

import java.util.List;

import com.webapp.exceptions.WebAppException;
import com.webapp.model.Task;

/**
 * @author kartikkarnayil
 *
 */
public interface TaskDao extends GenericDao<Task>{
	
	public List<Task> findUserTasks(String userId) throws WebAppException; 

}
