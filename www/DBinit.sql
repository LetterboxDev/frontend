CREATE TABLE messages ( 
roomHash CHAR(32) NOT NULL,
sender VARCHAR(256) NOT NULL,
content TEXT NOT NULL,
timeSent INT NOT NULL,
isRead BOOLEAN NOT NULL DEFAULT 0,
PRIMARY KEY (roomHash, sender, timeSent)
);
