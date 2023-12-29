package com.lostitems.lostitemsapi.repository;

import com.lostitems.lostitemsapi.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReportRepository extends JpaRepository<Report, UUID> {
}
