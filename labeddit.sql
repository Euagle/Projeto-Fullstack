-- Active: 1679331199331@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);


INSERT INTO users (id, name, email, password, role)
VALUES
   ("u001", "Gleice", "gleice@email.com", "gleice123@", "admin"),
      ("u002", "Paola", "paola@email.com", "paola123@", "normal"),
         ("u003", "Josué", "Josué@email.com", "Josué123@", "normal"),
                  ("u004", "Bruna", "bruna@email.com", "bruna123@", "normal"),
                                    ("u005", "Matheus", "matheus@email.com", "matheus123@", "normal");


SELECT * FROM users;

DROP TABLE users;


CREATE TABLE posts (
    id TEXT UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    comments INTEGER,
    created_at TEXT DEFAULT(DATETIME()),
    updated_at TEXT DEFAULT(DATETIME()),
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

INSERT INTO posts(id, creator_id, content, likes)
VALUES
    ("p001", "u001", "Hoje o dia render", 1),
        ("p002", "u002", "Sextô", 1),
                ("p003", "u003", "#Partiu rodeio", 1),
                        ("p004", "u004", "Praiou?", 1),
                                ("p005", "u005", "Fala aí uma série boa", 1);

;
;
;
;

SELECT * FROM posts;

DROP TABLE posts;


CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER, 
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);


INSERT INTO likes_dislikes (user_id, post_id)
VALUES
   ("u001", "p001"),
      ("u002", "p002"),
   ("u003", "p003"),
   ("u004", "p004"),
      ("u005", "p005");
   


SELECT * FROM likes_dislikes;

DROP TABLE likes_dislikes;


CREATE TABLE comments(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    comment TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);


INSERT INTO comments(id, user_id, post_id, likes, dislikes, comment )
VALUES("c001", "u001", "p001",200, 1, "Vai sim" ),
("c002", "u001", "p001",200, 1, "rendeu" ),
("c003", "u002", "p002",20, 2, "Onde vai ser?" ),
("c004", "u003", "p003",333, 0, "rendeu" ),
("c005", "u004", "p004",124, 1, "Praiou" );



SELECT * FROM comments;

DROP TABLE comments;


CREATE TABLE likes_dislikes_comments (
    comment_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER, 
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (comment_id) REFERENCES comments (id)
);



INSERT INTO( comment_id, user_id, post_id, like)
VALUES("c001", "u001", "p002", 2),
("c002", "u002", "p003", 2),
("c003", "u003", "p004", 1),
("c004", "u004", "p005", 2);


SELECT * FROM likes_dislikes_comments;

DROP TABLE likes_dislikes_comments;
