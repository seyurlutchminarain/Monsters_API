CREATE TABLE monsters(
    id serial,
    name character varying(50),
    personality character varying(50)
);

CREATE TABLE habitats(
    id serial,
    name character varying(50),
    climate character varying(50),
    temperature int
);

CREATE TABLE lives(
  monster character varying(50),
  habitat character varying(50)
);

INSERT INTO monsters(name, personality)
VALUES
('Fluffy','Aggressive'),
('Noodles','Impatient'),
('Rusty','Passionate');

INSERT INTO habitats(name, climate, temperature)
VALUES
('Desert','Dry', 100),
('Forest','Haunted', 70),
('Mountain','Icy', 30);

INSERT INTO lives(monster, habitat) -- one to one relationship
VALUES
('Fluffy','Desert'),
('Noodles','Forest'),
('Rusty','Mountain');

