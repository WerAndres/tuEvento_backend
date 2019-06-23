CREATE SCHEMA tuev;


CREATE TABLE tuev.tipo_documento (
	id_tipo_documento int NOT NULL,
	nombre_documento varchar(100) NULL,	
	CONSTRAINT tipo_documento_pk PRIMARY KEY (id_tipo_documento)
);


CREATE TABLE tuev.tipo_usuario(
	id_tipo_usuario int NOT NULL,
	nombre_tipo_usuario varchar(100) NULL,	
	CONSTRAINT tipo_usuario_pk PRIMARY KEY (id_tipo_usuario)
);

CREATE TABLE tuev.usuarios (
	id_usuario serial NOT NULL,
	tipo_usuario int NOT NULL,
	identificacion_usuario int NOT NULL,
	tipo_identificacion int NOT NULL,
	nombre_usuario varchar(100) NULL,
	email_usuario varchar(100) NOT NULL UNIQUE,
	pass_usuario varchar(100) NOT NULL,
	fecha_nacimiento_usuario date NOT NULL,
	url_foto_usuario varchar(100) NULL,
	CONSTRAINT usuarios_pk PRIMARY KEY (id_usuario),
	CONSTRAINT usuarios_tipo_usuario_fk FOREIGN KEY (tipo_usuario) REFERENCES tuev.tipo_usuario(id_tipo_usuario),
	CONSTRAINT usuarios_tipo_documento_fk FOREIGN KEY (tipo_identificacion) REFERENCES tuev.tipo_documento(id_tipo_documento)
);

CREATE TABLE tuev.estado_evento (
	id_estado_evento serial NOT NULL,
	nombre_estado_evento varchar(100) NULL,	
	CONSTRAINT estado_evento_pk PRIMARY KEY (id_estado_evento)	
);

CREATE TABLE tuev.eventos (
	id_evento serial NOT NULL,
	nombre_evento varchar(100) NULL,
	lugar_evento varchar(100) NULL,	
	numero_boletas int NOT NULL,
	numero_compradas_boletas int NOT NULL,
	id_estado_evento int NOT NULL,
	CONSTRAINT eventos_pk PRIMARY KEY (id_evento),
	CONSTRAINT eventos_estado_evento_fk FOREIGN KEY (id_estado_evento) REFERENCES tuev.estado_evento(id_estado_evento)
);

CREATE TABLE tuev.estado_boletas (
	id_estado_boleta serial NOT NULL,
	nombre_estado_boleta varchar(100) NULL,	
	CONSTRAINT estado_boletas_pk PRIMARY KEY (id_estado_boleta)	
);

CREATE TABLE tuev.boletas (	
	id_boleta serial NOT NULL,
	id_evento int NOT NULL,
	id_usuario int NULL,
	id_estado_boleta int NOT NULL,
	CONSTRAINT boletas_pk PRIMARY KEY (id_boleta),
	CONSTRAINT boletas_eventos_fk FOREIGN KEY (id_evento) REFERENCES tuev.eventos(id_evento),
	CONSTRAINT boletas_usuarios_fk FOREIGN KEY (id_usuario) REFERENCES tuev.usuarios(id_usuario),
	CONSTRAINT boletas_estado_boletas_fk FOREIGN KEY (id_estado_boleta) REFERENCES tuev.estado_boletas(id_estado_boleta)
);



CREATE OR REPLACE FUNCTION update_boletas()
  RETURNS trigger AS
$BODY$
begin
	UPDATE tuev.eventos
	SET numero_compradas_boletas=(numero_compradas_boletas + 1) where id_evento = new.id_evento;    
    RETURN NEW;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
 
 CREATE TRIGGER update_boletas
  AFTER INSERT
  ON tuev.boletas
  FOR EACH ROW
  EXECUTE PROCEDURE update_boletas();
