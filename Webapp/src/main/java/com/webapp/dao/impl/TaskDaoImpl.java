/**
 * 
 */
package com.webapp.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.webapp.dao.TaskDao;
import com.webapp.exceptions.WebAppException;
import com.webapp.model.Task;

/**
 * @author kartikkarnayil
 *
 */
@Repository
public class TaskDaoImpl extends AbstractGenericDao<Task> implements TaskDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<Task> findUserTasks(String userId) throws WebAppException {
		try {
		Criteria cr = getSession().createCriteria(Task.class);
		cr.add(Restrictions.eq("user.emailid", userId));
		return cr.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return new ArrayList<>();

	}

}
