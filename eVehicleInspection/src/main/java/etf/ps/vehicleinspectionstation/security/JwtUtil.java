package etf.ps.vehicleinspectionstation.security;

import etf.ps.vehicleinspectionstation.enums.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    @Value("${jwt.validity}")
    private String jwtValidity ;
    @Value("${jwt.secretKey}")
    private String secretKey;

    public String getUsernameFromToken(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }
    public String getRoleFromToken(String token){
        return getAllClaimsFromToken(token).get("role",String.class);
    }

    public Date getExpirationDateFromToken(String token) {
        return getAllClaimsFromToken(token).getExpiration();
    }
    private Claims getAllClaimsFromToken(String token) {
            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            return claims;
    }

    private Boolean isTokenExpired(String token) {
        return getExpirationDateFromToken(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails, Role role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role",role);
        long validity=System.currentTimeMillis() + Integer.parseInt(jwtValidity) * 1000;
        return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername()).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(validity))
                .signWith(SignatureAlgorithm.HS512, secretKey).compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token) && userDetails.isAccountNonLocked());
    }
}