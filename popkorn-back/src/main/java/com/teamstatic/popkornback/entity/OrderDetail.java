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
   private String merchantUid;   // response 에서 꺼내면 됨
   private int pcode;            // items 에서 꺼내면 됨
   private String productname;   // items 에서 꺼내면 됨
   private int count;            // items 에서 꺼내면 됨
   private String alternative;   // items 에서 꺼내면 됨
   private String image1;        // items 에서 꺼내면 됨

}
