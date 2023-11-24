package com.lostitems.lostitemsapi.utils;

import com.github.dockerjava.api.model.ExposedPort;
import com.github.dockerjava.api.model.HostConfig;
import com.github.dockerjava.api.model.PortBinding;
import com.github.dockerjava.api.model.Ports;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.wait.strategy.LogMessageWaitStrategy;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class BaseTest {

    private static final FoundItDbContainer CONTAINER;
    private static String DATABASE_NAME = "founditdb";
    private static String USERNAME = "founditdbadmin";
    private static String PASSWORD = "p8zDrj6LbuOGlhH+";

    static {
        CONTAINER =
                new FoundItDbContainer()
                        .withDatabaseName(DATABASE_NAME)
                        .withUsername(USERNAME)
                        .withPassword(PASSWORD)
                        .withExposedPorts(5432)
                        .withCreateContainerCmdModifier(cmd -> cmd.withHostConfig(
                                new HostConfig().withPortBindings(new PortBinding(Ports.Binding.bindPort(5432), new ExposedPort(5432)))
                        ))
                        .withInitScript("sql-migration-files/init-db.sql");
        CONTAINER.setWaitStrategy(
                new LogMessageWaitStrategy()
                        .withRegEx(".*database system is ready to accept connections.*\\s")
                        .withTimes(1)
                        .withStartupTimeout(Duration.of(60, ChronoUnit.SECONDS))
        );
        CONTAINER.start();
        try {
            setupSchema();
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    }

    public static void setupSchema() throws Throwable {

        log.info("Setting up Schema...");
        log.info("Init data source and template...");
        DataSource dataSource = DataSourceBuilder.create()
                .url(CONTAINER.getJdbcUrl())
                .username(CONTAINER.getUsername())
                .password(CONTAINER.getPassword())
                .build();
        JdbcTemplate template = new JdbcTemplate(dataSource);
        log.info("Data source and template initialized...");

        log.info("Running data initialization script...");
        final String initSchemaSqlPath = "/sql-migration-files/init-schema.sql";
        final InputStream inputStream =
                BaseTest.class.getResourceAsStream(
                        initSchemaSqlPath);
        assert inputStream != null;
        log.info("Initialization script read from : " + initSchemaSqlPath);
        final BufferedReader reader =
                new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        String sqlStatement;
        log.info("Running sql script...");
        while ((sqlStatement = reader.readLine()) != null) {
            template.update(sqlStatement);
            log.info("Running statement: " + sqlStatement);
        }
        template.update("COMMIT");
        log.info("Initialization Completed.");
    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.liquibase.change-log", () -> "db/testdb-changelog.xml");
    }
}
