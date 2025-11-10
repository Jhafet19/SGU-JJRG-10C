package org.example.sgubackend.user.model;

import org.example.sgubackend.user.control.UserDTO;
import org.example.sgubackend.utils.Message;
import org.example.sgubackend.utils.TypesResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.http.HttpResponse;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public ResponseEntity<Message> findAll() {
        List<UserEntity> userEntityList = repository.findAll();
        log.info("Buscando todos los usuarios");
        return new ResponseEntity<>(new Message(userEntityList, "Lista de usuarios", TypesResponse.SUCCESS), HttpStatus.OK);
    }

    public ResponseEntity<Message> findOne(Long id) {

        Optional<UserEntity> optionalUser = repository.findById(id);
        log.info("Buscando un usuario  {}", id);

        if (!optionalUser.isPresent())
            return new ResponseEntity<>(new Message("El usuario no existe", TypesResponse.ERROR), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(new Message(optionalUser, "Usuario encontrado", TypesResponse.SUCCESS), HttpStatus.OK);
    }

    public ResponseEntity<Message> saveUser(UserDTO dto) {
        Optional<UserEntity> optional = repository.findByEmail(dto.getEmail());

        if (optional.isPresent()) {
            return new ResponseEntity<>(new Message("El correo ya se encuentra registrado", TypesResponse.ERROR), HttpStatus.BAD_REQUEST);
        }
        UserEntity user = new UserEntity(dto.getName(), dto.getLastname(), dto.getSurname(), dto.getEmail(), dto.getPassword(), true);
        log.info("Creando nuevo usuario ", user.getName());
        user = repository.saveAndFlush(user);
        if (user == null)
            return new ResponseEntity<>(new Message("El usuario no se registro", TypesResponse.ERROR), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new Message(user, "", TypesResponse.SUCCESS), HttpStatus.CREATED);
    }

    public ResponseEntity<Message> updateUser(UserDTO dto) {
        Optional<UserEntity> optional = repository.findByEmail(dto.getEmail());
        if (!optional.isPresent()) {
            return new ResponseEntity<>(new Message("El usuario no existe", TypesResponse.ERROR), HttpStatus.BAD_REQUEST);
        }
        UserEntity user = optional.get();
        user.setName(dto.getName());
        user.setLastname(dto.getLastname());
        user.setSurname(dto.getSurname());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setStatus(dto.isStatus());
        log.info("Actualizando usuario {}", user.getName());

        user = repository.saveAndFlush(user);

        if (user == null)
            return new ResponseEntity<>(new Message("El usuario no se registro", TypesResponse.ERROR), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new Message(user, "", TypesResponse.SUCCESS), HttpStatus.CREATED);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> changeStatus(UserDTO dto) {
        Optional<UserEntity> optional = repository.findByEmail(dto.getEmail());
        if (!optional.isPresent()) {
            return new ResponseEntity<>(new Message("El usuario no existe", TypesResponse.ERROR), HttpStatus.NOT_FOUND);
        }
        UserEntity user = optional.get();
        user.setStatus(!user.isStatus());
        user = repository.saveAndFlush(user);
        log.info("Actualizando estado de usuario {}", user.getName());

        if (user == null) {
            return new ResponseEntity<>(new Message("El estado del usuario no se actualizó", TypesResponse.ERROR), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new Message(user, "El estado del usuario se actualizó correctamente", TypesResponse.SUCCESS), HttpStatus.OK);
    }

    public ResponseEntity<Message> deleteUser(UserDTO dto) {

        Optional<UserEntity> userFound = repository.findByEmail(dto.getEmail());
        log.info(dto.getEmail());
        if (!userFound.isPresent()) {
            return new ResponseEntity<>(new Message("El usuario no existe", TypesResponse.WARNING), HttpStatus.BAD_REQUEST);

        }
        repository.delete(userFound.get());
        log.info("Eliminando usuario");
        return new ResponseEntity<>(new Message("Usuario eliminado exitosamente", TypesResponse.SUCCESS), HttpStatus.OK);
    }

}
