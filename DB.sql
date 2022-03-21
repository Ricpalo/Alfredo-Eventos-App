DROP DATABASE IF EXISTS sw17_eventos;
CREATE DATABASE IF NOT EXISTS sw17_eventos;

USE sw17_eventos;

CREATE TABLE tb_ubicaciones(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(50),
	direccion TEXT 
);

CREATE TABLE tb_instructores(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(50),
	email VARCHAR(255) UNIQUE
);

CREATE TABLE tb_cursos(
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(255),
	duracion VARCHAR(50),
	precio FLOAT,
	descripcion TEXT
);

CREATE TABLE tb_alumnos(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100),
	direccion TEXT
);

CREATE TABLE tb_eventos_cursos(
	id INT PRIMARY KEY AUTO_INCREMENT,
	fecha_inicio DATE,
	fecha_fin DATE,
	id_instructor INT,
	id_curso INT,
	id_ubicacion INT,
	FOREIGN KEY (id_instructor) REFERENCES tb_instructores(id),
	FOREIGN KEY (id_curso) REFERENCES tb_cursos(id),
	FOREIGN KEY (id_ubicacion) REFERENCES tb_ubicaciones(id)
);