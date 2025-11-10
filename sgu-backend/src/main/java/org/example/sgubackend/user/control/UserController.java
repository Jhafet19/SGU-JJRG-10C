package org.example.sgubackend.user.control;


import org.example.sgubackend.user.model.UserService;
import org.example.sgubackend.utils.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sgu-api")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("")
    public ResponseEntity<Message> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> findOne(@PathVariable Long id) {
        return service.findOne(id);
    }

    @PostMapping("/")
    public ResponseEntity<Message> saveUser(@RequestBody UserDTO dto) {
        return service.saveUser(dto);
    }

    @PutMapping("/")
    public ResponseEntity<Message> updateUser(@RequestBody UserDTO dto) {
        return service.updateUser(dto);
    }

    /*@DeleteMapping("/")
    public ResponseEntity<Message> changeStatus(@RequestBody UserDTO dto) {
        return service.changeStatus(dto);
    }*/

    @DeleteMapping("/")
    public ResponseEntity<Message> deleteUser(@RequestBody UserDTO dto) {
        return service.deleteUser(dto);
    }

}
