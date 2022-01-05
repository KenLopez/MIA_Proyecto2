CREATE TABLE Jugador (
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	nombre VARCHAR2(200) NOT NULL,
	fecha_nac DATE,
	nacionalidad VARCHAR2(100) NOT NULL,
	posicion VARCHAR2(50) NOT NULL,
	estado VARCHAR2(50) NOT NULL,
	PRIMARY KEY(id)
); 

CREATE TABLE Equipo(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	nombre VARCHAR2(100) NOT NULL,
	fecha_fundacion DATE NOT NULL,
	pais VARCHAR2(50) NOT NULL,
	logo BLOB,
	estado VARCHAR2(50) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Estadio(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	nombre VARCHAR2(100) NOT NULL,
	capacidad INTEGER,
	pais VARCHAR2(100) NOT NULL,
	direccion VARCHAR2(100) NOT NULL,
	estado VARCHAR2(50) NOT NULL,
	foto BLOB,
	PRIMARY KEY(id)
);

CREATE TABLE Usuario(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	nombre VARCHAR2(100) NOT NULL,
	apellidos VARCHAR2(100) NOT NULL,
	clave VARCHAR2(100) NOT NULL,
	correo VARCHAR2(100) NOT NULL,
	telefono INTEGER,
	foto BLOB,
	genero VARCHAR2(1) NOT NULL,
	fecha_nac DATE NOT NULL,
	fecha_registro DATE NOT NULL,
	direccion VARCHAR2(100),
	pais VARCHAR2(50),
	tipo VARCHAR2(1) NOT NULL,
	registrado NUMBER NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Director_tecnico(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	nombre VARCHAR2(100) NOT NULL,
	apellido VARCHAR2(100) NOT NULL,
	fecha_nac DATE NOT NULL,
	nacionalidad VARCHAR2(50) NOT NULL,
	estado VARCHAR2(50) NOT NULL,
	foto BLOB,
	PRIMARY KEY(id)
);

CREATE TABLE Competencia(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	nombre VARCHAR2(100) NOT NULL,
	anio INTEGER NOT NULL,
	tipo VARCHAR2(100),
	pais VARCHAR2(100),
	campeon INTEGER,
	PRIMARY KEY(id),
	FOREIGN KEY (campeon) REFERENCES Equipo(id)
);

CREATE TABLE Contrato_jugador(
	id_equipo INTEGER NOT NULL,
	id_jugador INTEGER NOT NULL,
	fecha_ini DATE NOT NULL,
	fecha_fin DATE,
	PRIMARY KEY(id_equipo, id_jugador),
	FOREIGN KEY (id_equipo) REFERENCES Equipo(id),
	FOREIGN KEY (id_jugador) REFERENCES Jugador(id)
);

CREATE TABLE Suscripcion(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	fecha_ini DATE NOT NULL,
	fecha_fin DATE,
	id_usuario INTEGER NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

CREATE TABLE Bitacora(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	descripcion VARCHAR2(200),
	accion VARCHAR2(25),
	fecha DATE NOT NULL,
	id_autor INTEGER NOT NULL,
	id_objeto INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_autor) REFERENCES Usuario(id),
	FOREIGN KEY (id_objeto) REFERENCES Usuario(id)
);

CREATE TABLE Seguido(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	id_usuario INTEGER NOT NULL,
	id_equipo INTEGER NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id),
	FOREIGN KEY (id_equipo) REFERENCES Equipo(id)
);

CREATE TABLE Contrato_tecnico(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	fecha_ini DATE NOT NULL,
	fecha_fin DATE,
	id_equipo INTEGER NOT NULL,
	id_tecnico INTEGER NOT NULL,
	PRIMARY KEY (id_equipo, id_tecnico),
	FOREIGN KEY (id_equipo) REFERENCES Equipo(id),
	FOREIGN KEY (id_tecnico) REFERENCES Director_tecnico(id)
);

CREATE TABLE Partido(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	asistencia INTEGER,
	estado VARCHAR2(1),
	goles_local INTEGER,
	goles_visita INTEGER,
	id_estadio INTEGER NOT NULL,
	id_local INTEGER NOT NULL,
	id_visita INTEGER NOT NULL,
	id_competencia INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY (id_estadio) REFERENCES Estadio(id),
	FOREIGN KEY (id_local) REFERENCES Equipo(id),
	FOREIGN KEY (id_visita) REFERENCES Equipo(id),
	FOREIGN KEY (id_competencia) REFERENCES  Competencia(id)
);

CREATE TABLE Participacion_torneo(
	posicion INTEGER,
	fase VARCHAR2(50),
	id_equipo INTEGER NOT NULL,
	id_competencia INTEGER NOT NULL,
	PRIMARY KEY (id_equipo, id_competencia),
	FOREIGN KEY (id_equipo) REFERENCES Equipo(id),
	FOREIGN KEY (id_competencia) REFERENCES Competencia(id)
);

CREATE TABLE Participacion_partido(
	minutos FLOAT,
	id_jugador INTEGER NOT NULL,
	id_partido INTEGER NOT NULL,
	PRIMARY KEY (id_jugador, id_partido),
	FOREIGN KEY (id_jugador) REFERENCES Jugador(id),
	FOREIGN KEY (id_partido) REFERENCES Partido(id)
);

CREATE TABLE Gol(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	distancia FLOAT,
	tipo VARCHAR2(1) NOT NULL,
	minuto INTEGER NOT NULL,
	id_partido INTEGER NOT NULL,
	id_jugador INTEGER NOT NULL,
	id_asistencia INTEGER,
	PRIMARY KEY(id),
	FOREIGN KEY (id_partido) REFERENCES Partido(id),
	FOREIGN KEY (id_jugador) REFERENCES Jugador(id),
	FOREIGN KEY (id_asistencia) REFERENCES Jugador(id)
);

CREATE TABLE Tarjeta(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	minuto INTEGER NOT NULL,
	id_partido INTEGER NOT NULL,
	id_jugador INTEGER NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (id_partido) REFERENCES Partido(id),
	FOREIGN KEY (id_jugador) REFERENCES Jugador(id)
);

CREATE TABLE Tarjeta_credito(
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
	numero INTEGER NOT NULL,
	nombre VARCHAR2(50) NOT NULL,
	codigo_seguridad VARCHAR2(3) NOT NULL,
	fecha_venc DATE NOT NULL,
	id_usuario INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

INSERT INTO USUARIO(
	NOMBRE,
	APELLIDOS,
	CLAVE,
	CORREO,
	TELEFONO,
	FOTO,
	GENERO,
	FECHA_NAC,
	FECHA_REGISTRO,
	DIRECCION,
	PAIS,
	TIPO,
	REGISTRADO
) VALUES(
	'Admin',
	'Default',
	'123',
	'admin@soccerstats.com',
	NULL,
	NULL,
	'M',
	'21-09-2000',
	'22-12-2021',
	NULL,
	NULL,
	'A',
	1
);

CREATE OR REPLACE PROCEDURE entrada_bitacora(id_autor IN INTEGER, id_objeto IN INTEGER, descripcion IN VARCHAR, accion IN VARCHAR) IS 
BEGIN 
	INSERT INTO BITACORA(
		ACCION,
		DESCRIPCION,
		ID_AUTOR,
		ID_OBJETO,
		FECHA
	) VALUES(
		accion,
		descripcion,
		id_autor,
		id_objeto,
		SYSDATE
	);
END;

