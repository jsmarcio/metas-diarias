-- SCHEMA: meta_diaria

-- DROP SCHEMA IF EXISTS meta_diaria ;

CREATE SCHEMA IF NOT EXISTS meta_diaria
    AUTHORIZATION postgres;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA meta_diaria
GRANT ALL ON TABLES TO postgres;

SET search_path TO meta_diaria;

SHOW search_path;

CREATE TABLE
	metaDiaria (
		id serial PRIMARY KEY,
		nome VARCHAR(50) NOT NULL,
		data DATE NOT NULL,
		descricao VARCHAR(255) NULL
	);



SELECT * FROM metaDiaria;
