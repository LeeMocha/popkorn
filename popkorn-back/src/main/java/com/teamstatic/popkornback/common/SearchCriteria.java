package com.teamstatic.popkornback.common;

import lombok.Data;

@Data
public class SearchCriteria extends Criteria {
	
	private String searchType = "all";
	private String keyword;
	private String[] check;
	
} // class
