package pl.foodly.modules.basket.setup.application.service;

import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
@Service
public class CookieService {
    public Cookie generateCookie(String key, String value){
        Cookie cookie = new Cookie(key,value);
        cookie.setPath("/");
        cookie.setMaxAge(360000);
        cookie.setHttpOnly(true);
        return cookie;
    }
}
