package com.teamstatic.popkornback.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Pageable;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.teamstatic.popkornback.domain.PageRequestDTO;
import com.teamstatic.popkornback.domain.PageResultDTO;
import com.teamstatic.popkornback.domain.UserDTO;
import com.teamstatic.popkornback.entity.User;
import com.teamstatic.popkornback.repository.UserRepository;
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
    private UserRepository userRepository;

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
    public User selectone(@RequestParam String id) {
        System.out.println("****"+id);
        User user = uservice.findByUserId(id);

        if (user != null) {
            return user;
        } else {
            return null;
        }
    }

    @GetMapping("/emailcheck")
    public String emailcheck(@RequestParam String emailinput) {
        System.out.println("****"+emailinput);
        User user = uservice.findByUserId(emailinput);
        System.out.println("///////////////////////////"+user);

        if (user != null) {
            return "success";
        } else {
            return "failed";
        }
    }

    @PostMapping("/login")
    public String login(HttpSession session, @RequestBody Map<String, String> requestBody) {
        String emailinput = requestBody.get("emailinput");
        String pwinput = requestBody.get("pwinput");

        User user = uservice.findByUserId(emailinput);

        if (user != null) {
            String password = user.getPassword();
            if (passwordEncoder.matches(pwinput, password)) {
                session.setAttribute("loginID", user.getId());
                return user.getId();
            } else {
                return "Login failed";
            }
        } else {
            return "Login failed: User not found";
        }
    }

    @GetMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @PostMapping("/memberjoin")
    public String memberJoin(@RequestBody UserDTO dto) {

        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        LocalDateTime seoulLocalDateTime = seoulTime.toLocalDateTime();

        User user = new User();

        user.setId(dto.getId());
        user.setPassword(dto.getPassword());
        user.setNickname(dto.getNickname());
        user.setCreatedate(seoulLocalDateTime);
        user.setStatus("signed");

        String encodedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        try {
            uservice.save(user);
            return "회원가입 성공";
        } catch (Exception e) {
            return "회원가입 실패";
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
        User optionalUser = uservice.findByUserId(emailinput);

        if (optionalUser != null) {
            User user = optionalUser;
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
    public ResponseEntity<Boolean> passwordCheck(@RequestBody Map<String, Object> request) {
        String currentpw = (String) request.get("currentpw");
        String userId = (String) request.get("userId");
        if (userId != null) {
            User userOptional = uservice.findByUserId(userId);
            if (userOptional != null) {
                User user = userOptional;
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
    public ResponseEntity<String> redesignpassword(@RequestBody Map<String, Object> request) {

        String userId = (String) request.get("userId");
        String newpassword = (String) request.get("newpassword");
        if (userId != null) {
            User userOptional = uservice.findByUserId(userId);
            User user = userOptional;
            String encodedPassword = passwordEncoder.encode(newpassword);
            user.setPassword(encodedPassword);
            try {
                uservice.save(user);
                return ResponseEntity.ok("Change Password Complete");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Change Password Failed. Please retry.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
    }

    @PostMapping("/updatenickname")
    public ResponseEntity<String> updatenickname(HttpSession session, @RequestParam String email,
            @RequestParam String nickname) {
        User userOptional = uservice.findByUserId(email);
        User user = userOptional;
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
        User userOptional = uservice.findByUserId(email);
        User user = userOptional;
        return ResponseEntity.ok(user.getNickname());
    }

    @GetMapping("/{email}/nickname-reword")
    public ResponseEntity<Map<String, Object>> getUserNicknameAndReword(@PathVariable String email) {
        User userOptional = uservice.findByUserId(email);
        User user = userOptional;
        
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("nickname", user.getNickname());
        responseData.put("reword", user.getReword());
        
        return ResponseEntity.ok(responseData);
    }


    @DeleteMapping("/withdraw")
    public ResponseEntity<String> withdraw(@RequestBody Map<String, Object> request) {
        String userId = (String) request.get("userId");

        try {
            uservice.deleteById(userId);
            session.invalidate();
            return ResponseEntity.ok("회원 탈퇴 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("탈퇴중 오류 발생");
        }
    }

    @GetMapping("/orderlist")
    List<User> orderlist(String status) {

        return uservice.findByStatus(status);
    }

    @PostMapping("/resetpassword")
    public ResponseEntity<String> resetpassword(@RequestBody Map<String, Object> request) {

        String ordernuminput = (String) request.get("ordernuminput");
        String newpassword = (String) request.get("newpassword");
        if (ordernuminput != null) {
            User userOptional = uservice.findByUserId(ordernuminput);
            User user = userOptional;
            String encodedPassword = passwordEncoder.encode(newpassword);
            user.setPassword(encodedPassword);
            try {
                uservice.save(user);
                return ResponseEntity.ok("Change Password Complete");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Change Password Failed. Please retry.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
    }

    @PostMapping("/mailsend")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> requestData) {
        String emailRecipient = requestData.get("emailRecipient");
        String emailTitle = requestData.get("emailTitle");
        String emailContent = requestData.get("emailContent");

        try {
            registerMail.sendEmail(emailRecipient, emailTitle, emailContent);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email");
        }
    }

    @PostMapping("/sendtoallusers")
    public ResponseEntity<String> sendtoallusers(@RequestBody Map<String, String> requestData) {
        String emailTitle = requestData.get("emailTitle");
        String emailContent = requestData.get("emailContent");

        List<User> users = userRepository.findAll();

        List<User> filteredUsers = new ArrayList<>();
        for (User user : users) {
            if (!isNotEmailFormat(user.getId())) {
                filteredUsers.add(user);
            }
        }

        for (User user : filteredUsers) {
            try {
                registerMail.sendEmail(user.getId(), emailTitle, emailContent);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email");
            }
        }

        return ResponseEntity.ok("Email sent successfully");
    }

    private boolean isNotEmailFormat(String input) {

        return !input.contains("@");
    }

    @GetMapping("/rewordcheck")
    public ResponseEntity<String> rewordcheck(@RequestParam String storedLoginID) {
        User user = uservice.findByUserId(storedLoginID);
        if (user != null) {
            int reword = user.getReword();
            return ResponseEntity.ok(reword + "");
        } else {
            return ResponseEntity.ok("failed");
        }
    }

    @GetMapping("/update")
    public User update(@RequestBody User updatedItem) {
        return uservice.save(updatedItem);
    }
    

}
