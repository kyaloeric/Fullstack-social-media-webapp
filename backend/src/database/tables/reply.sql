-- USE Tweet

--   CREATE TABLE Reply (
--     reply_id VARCHAR(200) PRIMARY KEY,
--     tweet_id VARCHAR(200),
--     reply VARCHAR(8000),
--     user_id VARCHAR(200),
--     date_time DATETIME,
--     CONSTRAINT FK_Reply_Tweet FOREIGN KEY (tweet_id) REFERENCES Tweet(tweet_id),
--     CONSTRAINT FK_Reply_User FOREIGN KEY (user_id) REFERENCES Users(user_id)
--   );

