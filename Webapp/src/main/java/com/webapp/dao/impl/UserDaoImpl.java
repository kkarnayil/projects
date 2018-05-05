/**
 * 
 */
package com.webapp.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.webapp.dao.UserDao;
import com.webapp.exceptions.WebAppException;
import com.webapp.model.Users;
import com.webapp.vo.User;

/**
 * @author kartikkarnayil
 *
 */
@Repository
public class UserDaoImpl extends AbstractGenericDao<Users> implements UserDao {

	@Override
	public String createUser(User user) throws WebAppException {

		String id = null;
		try {

			Users entity = new Users(user.getFirstName(), user.getLastName(), user.getEmailId(), user.getPassWord());
			id = (String) super.save(entity);
			System.out.println("User Id" + id);
		} catch (Exception e) {
			throw new WebAppException(e.getMessage());
		}
		return id;

	}

	@Override
	public Users getUserById(String emailId){

		Users user = super.findById(emailId);
		return user;

	}

	@Override
	public List<Users> listAllUsers() {
		
		return super.findAll();
	}

}
