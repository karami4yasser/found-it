package com.lostitems.lostitemsapi.utils;

import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

public class LostItemsDbContainer extends PostgreSQLContainer<LostItemsDbContainer> {

    public LostItemsDbContainer() {
        super(DockerImageName.parse("docker.io/library/postgres:latest").asCompatibleSubstituteFor("postgres"));
    }
}
