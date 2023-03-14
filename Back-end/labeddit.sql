-- Active: 1678637269146@@127.0.0.1@3306


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
   ("u001", "gleice", "gleice@email.com", "gleice123", "admin");

INSERT INTO users (id, name, email, password, role)
VALUES
   ("u002", "Paulo", "paulo@email.com", "paulo123", "admin");



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
    ("p001", "u001", "feriass", 1);

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
   ("u001", "p001");

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

INSERT INTO comments (id, user_id, post_id, likes, dislikes, comment )
VALUES
   ("c001","u001", "p001", 1, 2, "uau" );

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
INSERT INTO likes_dislikes_comments (comment_id, user_id, post_id, like )
VALUES
   ("c001","u001", "p001", 1 );

SELECT * FROM likes_dislikes_comments;

DROP TABLE likes_dislikes_comments;
