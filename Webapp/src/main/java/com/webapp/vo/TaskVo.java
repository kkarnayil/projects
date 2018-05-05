/**
 * 
 */
package com.webapp.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * @author kartikkarnayil
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
public class TaskVo {

	private int id;
	private String task;
	private String emailId;
	
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the task
	 */
	public String getTask() {
		return task;
	}

	/**
	 * @param task
	 *            the task to set
	 */
	public void setTask(String task) {
		this.task = task;
	}

	/**
	 * @return the emailId
	 */
	public String getEmailId() {
		return emailId;
	}

	/**
	 * @param emailId
	 *            the emailId to set
	 */
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	

	/**
	 * @param id
	 * @param task
	 * @param emailId
	 * @param createdDate
	 */
	public TaskVo(int id, String task, String emailId) {
		super();
		this.id = id;
		this.task = task;
		this.emailId = emailId;
	}

	public TaskVo(String emailId) {
		super();
		this.emailId = emailId;
	}
	
	public TaskVo(int id) {
		super();
		this.id = id;
	}
	
	public TaskVo() {
		super();
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "TaskVo [id=" + id + ", " + (task != null ? "task=" + task + ", " : "")
				+ (emailId != null ? "emailId=" + emailId : "") + "]";
	}
	
	

}
