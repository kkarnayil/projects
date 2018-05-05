/**
 * 
 */
package com.webapp.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author kartikkarnayil
 *
 */
@Entity
@Table(name = "users")
public class Users implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4643762540452382109L;

	private String firstname;
	private String lastname;
	private String emailid;
	private String password;

	public Users() {
	}

	/**
	 * @param firstname
	 * @param lastname
	 * @param emailid
	 * @param password
	 */
	public Users(String firstname, String lastname, String emailid, String password) {
		super();
		this.firstname = firstname;
		this.lastname = lastname;
		this.emailid = emailid;
		this.password = password;
	}

	/**
	 * @return the emailid
	 */
	@Id
	@Column(name = "emailid", length = 100, nullable = false, unique = true)
	public String getEmailid() {
		return emailid;
	}

	/**
	 * @param emailid
	 *            the emailid to set
	 */
	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}

	/**
	 * @return the password
	 */
	@Column(name = "password", length = 50)
	public String getPassword() {
		return password;
	}

	/**
	 * @param password
	 *            the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "firstname", length = 50)
	public String getFirstname() {
		return this.firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	@Column(name = "lastname", length = 50)
	public String getLastname() {
		return this.lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

}
