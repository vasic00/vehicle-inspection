package etf.ps.vehicleinspectionstation.security;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AuthorizationRules {
    List<Rule> rules;
}
