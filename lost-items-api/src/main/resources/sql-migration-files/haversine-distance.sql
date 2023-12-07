CREATE OR REPLACE
       FUNCTION calculate_haversine_distance(
                    other_range double precision,
                    in_lat1 double precision,
                    in_lon1 double precision,
                    in_lat2 double precision,
                    in_lon2 double precision)
       RETURNS double precision AS '
            DECLARE earth_radius double precision := 6371000;
                    delta_lat double precision := radians(in_lat2 - in_lat1);
                    delta_lon double precision := radians(in_lon2 - in_lon1);
                    a double precision;
                    c double precision;
                    distance double precision;
                    BEGIN a := sin(delta_lat / 2) * sin(delta_lat / 2) + cos(radians(in_lat1)) * cos(radians(in_lat2)) * sin(delta_lon / 2) * sin(delta_lon / 2);
                    c := 2 * atan2(sqrt(a), sqrt(1 - a)); distance := (earth_radius * c) - other_range;
            RETURN distance; END; ' LANGUAGE PLPGSQL;