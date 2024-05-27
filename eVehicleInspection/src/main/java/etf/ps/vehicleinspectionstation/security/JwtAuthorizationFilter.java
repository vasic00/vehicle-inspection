package etf.ps.vehicleinspectionstation.security;

import etf.ps.vehicleinspectionstation.services.AppUserService;
import etf.ps.vehicleinspectionstation.util.CustomLogger;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private final AppUserService appUserService;
    private final JwtUtil jwtUtil;
    private final CustomLogger logger;

    public JwtAuthorizationFilter(AppUserService appUserService, JwtUtil jwtUtil, CustomLogger logger) {
        this.appUserService = appUserService;
        this.jwtUtil = jwtUtil;
        this.logger = logger;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String tokenHeader = request.getHeader("Authorization");
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            String token = tokenHeader.substring(7);
            try {
                logger.log("Auth token found: "+token,false);
                String username = jwtUtil.getUsernameFromToken(token);
                if (username!=null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = appUserService.loadUserByUsername(username);
                    if (jwtUtil.validateToken(token, userDetails)) {
                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                    else
                        logger.log("Invalid auth token!",true);
                }
                else
                    logger.log("Invalid auth token!",true);
            } catch(Exception e){
                e.printStackTrace();
                logger.logException(e,true);
            }
        }
        else
            logger.log("Auth token missing!",false);
        filterChain.doFilter(request, response);
    }
}