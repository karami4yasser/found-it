-- run only on psql!

CREATE DATABASE founditdb;
CREATE USER founditdbadmin WITH ENCRYPTED PASSWORD 'p8zDrj6LbuOGlhH+';
GRANT ALL PRIVILEGES ON database founditdb TO founditdbadmin;

\c founditdb postgres;

CREATE SCHEMA founditschema;
GRANT USAGE, CREATE ON SCHEMA founditschema TO founditdbadmin;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA founditschema TO founditdbadmin;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA founditschema TO founditdbadmin;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA founditschema TO founditdbadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA founditschema GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO founditdbadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA founditschema GRANT USAGE ON SEQUENCES TO founditdbadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA founditschema GRANT EXECUTE ON FUNCTIONS TO founditdbadmin;