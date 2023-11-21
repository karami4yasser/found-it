package com.lostitems.lostitemsapi.utils;

import com.github.dockerjava.api.model.ExposedPort;
import com.github.dockerjava.api.model.HostConfig;
import com.github.dockerjava.api.model.PortBinding;
import com.github.dockerjava.api.model.Ports;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.wait.strategy.LogMessageWaitStrategy;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

public class BaseTest {

    private static final LostItemsDbContainer CONTAINER;
    private static String DATABASE_NAME = "lostitemsdb";
    private static String USERNAME = "lostitemsdbadmin";
    private static String PASSWORD = "p8zDrj6LbuOGlhH+";


    static {
        CONTAINER =
                new LostItemsDbContainer()
                        .withDatabaseName(DATABASE_NAME)
                        .withUsername(USERNAME)
                        .withPassword(PASSWORD)
                        .withExposedPorts(5432)
                        .withCreateContainerCmdModifier(cmd -> cmd.withHostConfig(
                                new HostConfig().withPortBindings(new PortBinding(Ports.Binding.bindPort(5432), new ExposedPort(5432)))
                        ))
                        .withInitScript("sql-migration-files/initdb.sql");
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

        DataSource dataSource = DataSourceBuilder.create()
                .url(CONTAINER.getJdbcUrl())
                .username(CONTAINER.getUsername())
                .password(CONTAINER.getPassword())
                .build();

        JdbcTemplate template = new JdbcTemplate(dataSource);

        final InputStream inputStream =
                BaseTest.class.getResourceAsStream(
                        "/sql-migration-files/init-schema.sql");
        assert inputStream != null;
        final BufferedReader reader =
                new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        String sqlStatement;
        while ((sqlStatement = reader.readLine()) != null) {
            template.update(sqlStatement);
        }
        template.update("COMMIT");
    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.liquibase.change-log", () -> "db/testdb-changelog.xml");
    }
}
