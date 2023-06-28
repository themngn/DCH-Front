package budkevych.dcsapi.service;

import budkevych.dcsapi.model.User;
import java.util.Optional;

public interface UserService {
    User add(User user);

    void update(Long id, User user);

    Optional<User> findByEmail(String email);

    User findById(Long id);
}