package com.lostitems.lostitemsapi.utils;

import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.type.BasicTypeReference;
import org.hibernate.type.SqlTypes;

public class calculateHaversineDistanceSQLFunction extends StandardSQLFunction {

    private static final BasicTypeReference<Double> RETURN_TYPE = new BasicTypeReference<>("double", Double.class, SqlTypes.DOUBLE);

    calculateHaversineDistanceSQLFunction(final String functionName) {
        super(functionName, RETURN_TYPE);
    }

}