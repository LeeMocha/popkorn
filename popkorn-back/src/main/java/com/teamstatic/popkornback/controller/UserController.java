package com.teamstatic.popkornback.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.data.domain.Pageable;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.UserDTO;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.service.impls.UserServiceImple;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    UserServiceImple uservice;
    PasswordEncoder passwordEncoder;

    @Autowired
    private HttpSession session;

    @GetMapping("/userlist")
    public PageResultDTO<UserDTO, User> userList(int page) {
        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(20)
                .build();

        PageResultDTO<UserDTO, User> resultDTO = uservice.pageList(requestDTO);
        resultDTO.setDashboard1(uservice.countByStatus("admin"));
        resultDTO.setDashboard2(uservice.countByStatus("signed"));
        resultDTO.setDashboard3(uservice.countByStatus("unsigned"));

        return resultDTO;
    }

    @GetMapping("/adminlist")
    public List<User> adminList(Pageable pageable) {

        List<User> userlist = uservice.findByStatus("admin");

        return userlist;
    }

    @GetMapping("/searchlist")
    public PageResultDTO<UserDTO, User> searchlist(String keyword, int page) {

        PageRequestDTO requestDTO = PageRequestDTO.builder()
                .page(page)
                .size(20)
                .keyword(keyword)
                .build();

        PageResultDTO<UserDTO, User> resultDTO = uservice.findAllByKeywordLike(keyword, requestDTO);
        resultDTO.setDashboard1(uservice.countByStatus("admin"));
        resultDTO.setDashboard2(uservice.countByStatus("signed"));
        resultDTO.setDashboard3(uservice.countByStatus("unsigned"));

        return resultDTO;
    }

    @GetMapping("/delete")
    public PageResultDTO<UserDTO, User> userDelete(@RequestParam String id) {
        uservice.deleteById(id);
        return userList(1);
    }

    @GetMapping("/selectone")
    public User selectone(String id) {
        Optional<User> user = uservice.findById(id);

        if (user.isPresent()) {
            return user.get();
        } else {
            return null; // 혹은 다른 적절한 처리
        }
    }

    @GetMapping("/emailcheck")
    public ResponseEntity<String> emailcheck(@RequestParam String emailinput) {
        Optional<User> user = uservice.findById(emailinput);
        if (user.isPresent()) {
            return ResponseEntity.ok("Emailcheck success");
        } else {
            return ResponseEntity.ok("Emailcheck failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(HttpSession session, @RequestParam String emailinput,
            @RequestParam String pwinput) {
        Optional<User> user = uservice.findById(emailinput);

        if (user.isPresent()) {
            String password = user.get().getPassword();

            if (
            // passwordEncoder.matches(password, user.get().getPassword())
            password.equals(pwinput)) {
                session.setAttribute("loginID", user.get().getId());
                System.out.println(session.getAttribute(user.get().getId()));
                return ResponseEntity.ok(user.get().getId());
            } else {
                return ResponseEntity.ok("Login failed");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Login failed: User not found");
        }
    }

    @GetMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @PostMapping("/memberjoin")
    public ResponseEntity<String> memberjoin(@RequestBody UserDTO userdto) {

        User user = new User();

        user.setId(userdto.getId());
        user.setPassword(userdto.getPassword());
        user.setNickname(userdto.getNickname());
        user.setReword(userdto.getReword());
        user.setCreatedate(userdto.getCreatedate());
        user.setStatus(userdto.getStatus());

        //String encodedPassword = passwordEncoder.encode(user.getPassword());

        // user.setPassword(encodedPassword);

        System.out.println("전체 dto => " + userdto);
        System.out.println("이메일 => " + userdto.getId());
        System.out.println("기본 비밀번호 => " + userdto.getPassword());
        System.out.println("닉네임=> " + userdto.getNickname());

        try {
            uservice.save(user);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
        }

    }

}
