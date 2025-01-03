package br.com.tudonamala.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.tudonamala.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    UserDetails findByEmail(String email);
}
