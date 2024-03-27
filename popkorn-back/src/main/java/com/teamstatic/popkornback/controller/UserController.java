package com.teamstatic.popkornback.controller;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.data.domain.Pageable;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.UserDTO;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.service.impls.RegisterMail;
import com.teamstatic.popkornback.service.impls.UserServiceImple;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    UserServiceImple uservice;
    PasswordEncoder passwordEncoder;
    RegisterMail registerMail;

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
            if (passwordEncoder.matches(pwinput, password)) {
                session.setAttribute("loginID", user.get().getId());
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
        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();

        User user = new User();

        user.setId(userdto.getId());
        user.setPassword(userdto.getPassword());
        user.setNickname(userdto.getNickname());
        user.setReword(userdto.getReword());
        user.setCreatedate(seoulLocalDateTime);
        user.setStatus("signed");

        String encodedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        try {
            uservice.save(user);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
        }

    }

    @PostMapping("/mailConfirm")
    @ResponseBody
    String mailConfirm(@RequestBody Map<String, String> requestData) throws Exception {
        String email = requestData.get("email");
        String code = registerMail.sendSimpleMessage(email);
        return code;
    }

    @PostMapping("/updatepassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> requestBody) {
        String emailinput = requestBody.get("emailinput");
        String pwinput = requestBody.get("pwinput");
        Optional<User> optionalUser = uservice.findById(emailinput);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String encodedPassword = passwordEncoder.encode(pwinput);
            user.setPassword(encodedPassword);

            try {
                uservice.save(user);
                return ResponseEntity.ok("비밀번호 변경 성공");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호 변경 실패");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
    }

    @PostMapping("/passwordcheck")
    public ResponseEntity<Boolean> passwordcheck(HttpSession session, @RequestParam String currentpw) {
        // 세션에서 사용자 ID 가져오기
        String userId = (String) session.getAttribute("loginID");

        if (userId != null) {
            Optional<User> userOptional = uservice.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                boolean passwordMatch = passwordEncoder.matches(currentpw, user.getPassword());
                return ResponseEntity.ok(passwordMatch);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    @PostMapping("/redesignpassword")
    public ResponseEntity<String> redesignpassword(HttpSession session, @RequestParam String newpassword) {

        String userId = (String) session.getAttribute("loginID");

        if (userId != null) {
            Optional<User> userOptional = uservice.findById(userId);
            User user = userOptional.get();
            String encodedPassword = passwordEncoder.encode(newpassword);
            user.setPassword(encodedPassword);
            try {
                uservice.save(user);
                return ResponseEntity.ok("비밀번호 변경 성공");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호 변경 실패");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
    }

    @PostMapping("/updatenickname")
    public ResponseEntity<String> updatenickname(HttpSession session, @RequestParam String email,
            @RequestParam String nickname) {
        Optional<User> userOptional = uservice.findById(email);
        User user = userOptional.get();
        user.setNickname(nickname);
        try {
            uservice.save(user);
            return ResponseEntity.ok(user.getNickname());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("닉네임 변경 실패");
        }
    }

    @GetMapping("/{email}/nickname")
    public ResponseEntity<String> getUserNickname(@PathVariable String email) {
        Optional<User> userOptional = uservice.findById(email);
        User user = userOptional.get();
        return ResponseEntity.ok(user.getNickname());
    }

    @DeleteMapping("/withdraw")
public ResponseEntity<String> withdraw(HttpSession session) {
    String userId = (String) session.getAttribute("loginID");

        try {
            uservice.deleteById(userId);
            session.invalidate();
            return ResponseEntity.ok("회원 탈퇴 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("탈퇴중 오류 발생");
        }
    }
}
