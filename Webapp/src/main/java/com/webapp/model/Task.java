/**
 * 
 */
package com.webapp.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

/**
 * @author kartikkarnayil
 *
 */
@Entity
@Table(name = "tasks")
public class Task {
	private int id;
	private String task;
	private Date createdDate;
	private Users user;

	public Task() {
	}

	@Id
	@Column(name = "id")
	@GeneratedValue
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "task")
	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	@Column(name = "createdDate")
	public Date getCreatedDate() {
		return createdDate;
	}
	
	@PrePersist
	public void setCreatedDate(Date createdDate) {
		this.createdDate = new Date();
	}

	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "userid")
	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	/**
	 * @param task
	 * @param user
	 */
	public Task(String task, Users user) {
		super();
		this.task = task;
		this.user = user;
	}

	/**
	 * @param id
	 * @param task
	 * @param createdDate
	 * @param user
	 */
	public Task(int id, String task, Date createdDate, Users user) {
		super();
		this.id = id;
		this.task = task;
		this.createdDate = createdDate;
		this.user = user;
	}
}
