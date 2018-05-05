/**
 * 
 */
package com.webapp.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.webapp.common.ErrorConstants;
import com.webapp.dao.UserDao;
import com.webapp.exceptions.WebAppException;
import com.webapp.model.Users;
import com.webapp.service.UserService;
import com.webapp.vo.User;

/**
 * @author kartikkarnayil
 *
 */
@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.webapp.service.UserService#createUser(com.webapp.vo.User)
	 */
	@Transactional(readOnly = false)
	public String createUser(User user) throws WebAppException {
		String emailId;
		if (validUserInput(user)) {
			try {
				Users entity = userDao.getUserById(user.getEmailId());
				if (null == entity) {
					emailId = userDao.createUser(user);
				} else {
					throw new WebAppException(ErrorConstants.USER_ALREADY_EXISTS);
				}
			} catch (Exception e) {
				throw e;
			}
		} else {
			throw new WebAppException(ErrorConstants.INVALID_USER_INPUT);
		}

		return emailId;

	}

	private boolean validUserInput(User user) {

		if (StringUtils.isEmpty(user.getFirstName()) || StringUtils.isEmpty(user.getEmailId())
				|| StringUtils.isEmpty(user.getPassWord())) {
			return false;
		}
		return true;

	}

	@Override
	public List<User> listUsers() {
		List<Users> entities = userDao.listAllUsers();

		List<User> users = entities.stream()
				.map(user -> new User(user.getEmailid(), user.getFirstname(), user.getLastname(), null, null))
				.collect(Collectors.toList());

		return users;
	}

	@Override
	public User validateUser(User user) throws WebAppException {

		try {

			Users entity = userDao.getUserById(user.getEmailId());

			if (entity == null)
				throw new WebAppException("User Not Found");

			if (entity.getPassword().equals(user.getPassWord())) {
				user.setFirstName(entity.getFirstname());
				user.setLastName(entity.getLastname());
				user.setPassWord(null);
			} else {
				throw new WebAppException("Email Id & Password doesn't match.");
			}

		} catch (Exception e) {
			throw new WebAppException(e.getMessage());
		}

		return user;

	}

	@Override
	@Transactional(readOnly = false)
	public User updateUser(User user) throws Exception {

		try {
			User validateUser = new User(user.getEmailId(), null, null, user.getOldPassword(), null);
			validateUser(validateUser);
			userDao.clear();
			Users entity = new Users(user.getFirstName(), user.getLastName(), user.getEmailId(), user.getPassWord());
			userDao.saveOrUpdate(entity);
		} catch (Exception e) {
			throw e;
		}
		return user;
	}

	@Override
	@Transactional(readOnly = false)
	public boolean deleteUser(User user) throws Exception {
		try {
			Users entity = userDao.getUserById(user.getEmailId());
			userDao.delete(entity);
		} catch (Exception e) {
			throw e;
		}
		return true;
	}
	
	@Override
	@Transactional(readOnly = false)
	public boolean deleteAll() {
		try {
			 userDao.deleteAll();
		} catch (Exception e) {
			throw e;
		}
		return true;
	}

}
