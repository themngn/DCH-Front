package budkevych.squareapi.security;

import budkevych.squareapi.exception.AuthenticationException;
import budkevych.squareapi.model.User;

public interface AuthenticationService {
    User register(String username, String password);

    User login(String username, String password) throws AuthenticationException;
}