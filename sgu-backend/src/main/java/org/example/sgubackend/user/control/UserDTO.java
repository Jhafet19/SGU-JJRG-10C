package org.example.sgubackend.user.control;

public class UserDTO {
    private Long id;

    private String name;
    private String lastname;
    private String surname;
    private String email;
    private String password;
    private boolean status;

    public UserDTO() {
    }

    public UserDTO(Long id, String name, String lastname, String surname, String email, String password) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }

    public UserDTO(String name, String lastname, String surname, String email, String password, boolean status) {
        this.name = name;
        this.lastname = lastname;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
