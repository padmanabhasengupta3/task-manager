package com.Padmanabha.Task.Manager.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.Padmanabha.Task.Manager.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(String status);
    List<Task> findByAssignedTo(Long assignedTo);
    List<Task> findByStatusAndAssignedTo(String status, Long assignedTo);
}
