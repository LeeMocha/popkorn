package com.teamstatic.popkornback.service;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public interface MailServiceInter {

  	public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException;

	public String createKey();

	public String sendSimpleMessage(String to) throws Exception;
} 
  
