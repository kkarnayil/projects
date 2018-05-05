/**
 * 
 */
package com.webapp.service;

import java.util.List;

import com.webapp.exceptions.WebAppException;
import com.webapp.vo.User;

/**
 * @author kartikkarnayil
 *
 */
public interface UserService {

	/**
	 * Method to create user in DB Table
	 * 
	 * @param user
	 *            user input
	 * @return
	 * @throws WebAppException
	 */
	public String createUser(User user) throws WebAppException;

	/**
	 * Method to return all users from DB Table users.
	 * 
	 * @return All Users
	 */
	public List<User> listUsers();

	/**
	 * Method to validate the user credentials
	 * 
	 * @param user
	 *            user input
	 * @return user object
	 */
	public User validateUser(User user) throws WebAppException;

	/**
	 * Method to update user data
	 * 
	 * @param user
	 *            user input
	 * @return
	 */
	public User updateUser(User user) throws Exception;

	/**
	 * Method to delete user data
	 * 
	 * @param user
	 *            user Input
	 * @return
	 */
	public boolean deleteUser(User user) throws Exception;

	/**
	 * Method to delete all
	 * 
	 * @return
	 */
	boolean deleteAll() throws Exception;
}
