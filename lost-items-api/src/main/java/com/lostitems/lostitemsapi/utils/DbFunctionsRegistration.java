package com.lostitems.lostitemsapi.utils;

import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.type.StandardBasicTypes;

public class DbFunctionsRegistration implements FunctionContributor {

    @Override
    public void contributeFunctions(FunctionContributions functionContributions) {

        functionContributions.getFunctionRegistry().register( "founditschema.calculate_haversine_distance", new calculateHaversineDistanceSQLFunction( "founditschema.calculate_haversine_distance" ) );

        functionContributions.getFunctionRegistry().registerAlternateKey("founditschema.calculate_haversine_distance", "founditschema.calculate_haversine_distance");

        functionContributions.getFunctionRegistry().registerPattern("founditschema.calculate_haversine_distance", "founditschema.calculate_haversine_distance(?1, ?2, ?3, ?4, ?5)", functionContributions.getTypeConfiguration().getBasicTypeRegistry().resolve(StandardBasicTypes.DOUBLE));

    }
}
