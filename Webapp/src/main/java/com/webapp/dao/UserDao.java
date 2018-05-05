/**
 * 
 */
package com.webapp.dao;

import java.util.List;

import com.webapp.exceptions.WebAppException;
import com.webapp.model.Users;
import com.webapp.vo.User;

/**
 * @author kartikkarnayil
 *
 */
public interface UserDao extends GenericDao<Users> {

	/**
	 * Method to create use
	 * 
	 * @param user
	 *            input user object
	 * @return emailId of the user
	 * @throws WebAppException
	 */
	public String createUser(User user) throws WebAppException;

	/**
	 * Method to search and return user by emailId
	 * 
	 * @param emailId
	 * @return userObject
	 * @throws WebAppException
	 */
	public Users getUserById(String emailId) throws WebAppException;

	/**
	 * Method to return all the users
	 * 
	 * @return List of users
	 */
	public List<Users> listAllUsers();

}
