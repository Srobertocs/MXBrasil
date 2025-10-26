CREATE SCHEMA site;

CREATE TABLE IF NOT EXISTS site.usuarios( 
  id SERIAL PRIMARY KEY,
  usuario   VARCHAR(100) NOT NULL UNIQUE,
  senha     VARCHAR(100) NOT NULL
)

CREATE TABLE IF NOT EXISTS site.trilhas(
  id serial PRIMARY KEY,
  trilha    VARCHAR(100) NOT NULL UNIQUE
)

CREATE TABLE IF NOT EXISTS site.participantes(
  id serial     PRIMARY KEY,
  nome          VARCHAR(100) NOT NULL,
  sobrenome     VARCHAR(100) NOT NULL,
  modelo_moto   VARCHAR(100) NOT NULL,
  placa         VARCHAR(100) NOT NULL,
  CPF           VARCHAR(14) NOT NULL UNIQUE,
  email         VARCHAR(100) NOT NULL UNIQUE
)  

CREATE TABLE IF NOT EXISTS site.inscricoes(
  id_participante   INTEGER NOT NULL,
  id_trilha         INTEGER NOT NULL,

  PRIMARY KEY (id_participante, id_trilha),

  CONSTRAINT fk_inscricao_participante 
  FOREIGN KEY (id_participante)
  REFERENCES site.participantes(id),

  CONSTRAINT fk_inscricao_trilha
  FOREIGN KEY (id_trilha)
  REFERENCES site.trilhas(id)
)

INSERT INTO site.trilhas (trilha) VALUES ('Serra da Canastra')
INSERT INTO site.trilhas (trilha) VALUES ('Jalapão')
INSERT INTO site.trilhas (trilha) VALUES ('Vale Europeu')
INSERT INTO site.trilhas (trilha) VALUES ('Lençois Maranhenses')
INSERT INTO site.trilha  (trilha) VALUES ('Jericoacoara')


ALTER TABLE site.inscricoes
ADD COLUMN data_inscricao TIMESTAMP;


