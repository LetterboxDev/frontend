CREATE TABLE rooms (
  hash CHAR(32) PRIMARY KEY,
  userId CHAR(32) NOT NULL,
  userName VARCHAR(256) NOT NULL,
  thumbnail TEXT NOT NULL,
  profilePicture TEXT NOT NULL,
  createdAt DATETIME NOT NULL
);

CREATE TABLE messages (
  roomHash CHAR(32) NOT NULL REFERENCES rooms(hash),
  sender VARCHAR(256) NOT NULL,
  content TEXT NOT NULL,
  timeSent BIGINT NOT NULL,
  isRead BOOLEAN NOT NULL DEFAULT 0,
  type VARCHAR(256) NOT NULL DEFAULT 'message',
  DealId INTEGER,
  PRIMARY KEY (roomHash, sender, timeSent)
);

PRAGMA user_version=1;
