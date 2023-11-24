package com.lostitems.lostitemsapi.utils;

import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

public class FoundItDbContainer extends PostgreSQLContainer<FoundItDbContainer> {

    public FoundItDbContainer() {
        super(DockerImageName.parse("docker.io/library/postgres:latest").asCompatibleSubstituteFor("postgres"));
    }
}
