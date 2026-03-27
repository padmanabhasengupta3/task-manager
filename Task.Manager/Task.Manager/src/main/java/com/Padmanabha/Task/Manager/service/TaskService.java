package com.Padmanabha.Task.Manager.service;

import com.Padmanabha.Task.Manager.entity.Task;
import com.Padmanabha.Task.Manager.repository.TaskRepository;
import com.Padmanabha.Task.Manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private UserRepository userRepo;

//  FIXED createTask (assignedTo is Long)

    public Task createTask(Task task) {

        task.setStatus("TODO");

        // assignedTo is Long → no User fetch
        if (task.getAssignedTo() != null) {
            task.setAssignedTo(task.getAssignedTo());
        }

        return taskRepo.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public List<Task> getByStatus(String status) {
        return taskRepo.findByStatus(status);
    }

    public List<Task> filterTasks(String status, Long assignedTo) {

        if (status != null && assignedTo != null) {
            return taskRepo.findByStatusAndAssignedTo(status, assignedTo);
        } else if (status != null) {
            return taskRepo.findByStatus(status);
        } else if (assignedTo != null) {
            return taskRepo.findByAssignedTo(assignedTo);
        } else {
            return taskRepo.findAll();
        }
    }

    public ResponseEntity<Object> getTaskById(Long id) {

        Optional<Task> task = taskRepo.findById(id);

        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        } else {
            return ResponseEntity.status(404).body("Task not found");
        }
    }

    //  FIXED VERSION (your assignedTo is Long, not User)

    public ResponseEntity<?> updateTask(Long id, Task updatedTask) {

        Optional<Task> optionalTask = taskRepo.findById(id);

        if (optionalTask.isEmpty()) {
            return ResponseEntity.status(404).body("Task not found");
        }

        Task task = optionalTask.get();

        if (updatedTask.getTitle() != null) {
            task.setTitle(updatedTask.getTitle());
        }

        if (updatedTask.getDescription() != null) {
            task.setDescription(updatedTask.getDescription());
        }

        if (updatedTask.getStatus() != null) {
            task.setStatus(updatedTask.getStatus());
        }

        // ✅ assignedTo is Long → direct set
        if (updatedTask.getAssignedTo() != null) {
            task.setAssignedTo(updatedTask.getAssignedTo());
        }

        taskRepo.save(task);

        return ResponseEntity.ok(task);
    }

    public ResponseEntity<?> deleteTask(Long id, String role) {

        if (!"ROLE_ADMIN".equals(role)) {
            return ResponseEntity.status(403).body("Only admin can delete tasks");
        }

        if (!taskRepo.existsById(id)) {
            return ResponseEntity.status(404).body("Task not found");
        }

        taskRepo.deleteById(id);

        return ResponseEntity.ok("Task deleted");
    }
}