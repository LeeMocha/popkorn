package com.teamstatic.popkornback.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="orderdetail")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class OrderDetail {
   
   @Id
   private int odcode;
   private String merchantUid;
   private int pcode;
   private String productname;
   private int count;
   private String alternative;
   private String image1;

}
