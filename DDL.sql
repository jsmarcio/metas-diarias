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


ALTER TABLE metaDiaria RENAME COLUMN data TO dataCreated;

ALTER TABLE metaDiaria ALTER COLUMN dataCreated TYPE TIMESTAMP;

ALTER TABLE metaDiaria ADD COLUMN dataUpdate timestamp;

ALTER TABLE metaDiaria ADD COLUMN isConcluida boolean DEFAULT false;

ALTER TABLE metaDiaria ADD CONSTRAINT meta_diaria_unique UNIQUE (nome, descricao);

DELETE FROM metaDiaria where 1=1;

SELECT * FROM metaDiaria;
