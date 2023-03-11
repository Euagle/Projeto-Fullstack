-- Active: 1677811070107@@127.0.0.1@3306


CREATE TABLE users (
  id TEXT PK UNIQUE NOT NULL ,
  name TEXT  NOT NULL,
  email TEXT  NOT  NULL,
  password TEXT NOT  NULL,
  role TEXT NOT NULL ,
  created_at TEXT DEFAULT (DATETIME('now')) NOT NULL
);
DROP TABLE users;

CREATE TABLE posts (
  id TEXT PK UNIQUE NOT  NULL,
  creator_id TEXT NOT  NULL,
  content TEXT NOT  NULL,
  likes INTEGER NOT  NULL,
  dislikes INTEGER NOT  NULL,
  created_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
     FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE

);
DROP TABLE posts;

CREATE TABLE likes_dislikes (
  user_id TEXT NOT  NULL,
  post_id TEXT NOT  NULL,
  like INTEGER NOT  NULL,
   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);

CREATE TABLE likes_dislikes_comments(
    user_id TEXT NOT NULL, 
    comment_id TEXT NOT NULL, 
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY (comment_id) REFERENCES comments(id));


CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL, 
    content TEXT,
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    post_id TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

DROP TABLE likes_dislikes;



INSERT INTO users(id, name, email, password, role )
VALUES("a01", "Gleice", "gleiscylima@gmail.com", "gleicea123", "ADMIN"),
("a02", "Pedro", "pedrolima@gmail.com", "pedroa123", "NORMAL"),
("a03", "Layane", "layanelima@gmail.com", "layane123", "NORMAL"),
("a04", "Bruna", "brunalima@gmail.com", "gleicea123", "NORMAL"), 
("a05", "Ricardo", "ricardolima@gmail.com", "ricardoa123", "NORMAL");
INSERT INTO users(id, name, email, password, role )
VALUES

("a06", "tathy", "tathylima@gmail.com", "tathya123", "NORMAL");



INSERT INTO posts(id, creator_id,  content, likes, dislikes  )
VALUES("p01", "a01", "Foto na praia", 1, 0 ),
("p02", "a02", "Foto do céu", 0, 1 ),
("p03", "a03", "Foto da cachoeira", 1, 0 ),
("p04", "a04", "Foto do por do sol", 1, 0 ),
("p05", "a05", "Foto do mar", 1 , 0 );

DROP TABLE posts;

INSERT INTO likes_dislikes( user_id,  post_id,  like  )
VALUES("a01", "p01", 300 ),
("a02", "p01", 101 ),
("a03", "p01", 800 ),
("a04", "p04", 505 ),
("a05", "p05", 700 )
;

INSERT INTO likes_dislikes_comments( user_id,  comment_id,  like  )
VALUES("a01", "f001", 100 ),
("a02", "f001", 12 ),
("a03", "f002", 334 ),
("a04", "f003", 3 )
;


INSERT INTO comments(id, creator_id, content, post_id)
VALUES("f001", "a01", "Incrivel", "p01"),
("f002", "a02", "Uau", "p02"),
("f003", "a03", "Lugar maravilhoso", "p02");


DROP TABLE likes_dislikes;
--verificando as tabelas
SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;

DROP TABLE posts;

SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;
SELECT comments.id, 
comments.content,
comments.likes,
comments.dislikes,
comments.created_at,
comments.updated_at,
users.id,
users.name
FROM comments LEFT JOIN users
ON users.id = comments.creator_id;



