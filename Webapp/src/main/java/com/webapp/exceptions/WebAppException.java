package com.webapp.exceptions;

/**
 * @author kartikkarnayil
 *
 */
public class WebAppException extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1462946097071011500L;

	/**
	 * @param errorMessage
	 * @param errorCode
	 */
	public WebAppException(String errorMessage) {
		super(errorMessage);
		
	}
	
	

}
