
--   USE Tweet
  
--   CREATE TABLE Tweet (
--     tweet_id VARCHAR(200) PRIMARY KEY,
--     tweet VARCHAR(8000),
--     user_id VARCHAR(200),
--     date_time DATETIME,
--     CONSTRAINT FK_Tweet_User FOREIGN KEY (user_id) REFERENCES Users(user_id)
--   );



-- Drop foreign key constraints
-- IF OBJECT_ID('FK_Tweet_User', 'F') IS NOT NULL
--     ALTER TABLE Tweet DROP CONSTRAINT FK_Tweet_User;

-- Drop the table
-- Drop foreign key constraints referencing the table
-- DECLARE @Sql NVARCHAR(MAX);

-- SELECT @Sql = COALESCE(@Sql + '; ', '') + 'ALTER TABLE ' + OBJECT_NAME(parent_object_id) + ' DROP CONSTRAINT ' + name
-- FROM sys.foreign_keys
-- WHERE referenced_object_id = OBJECT_ID('Tweet');

-- EXEC sp_executesql @Sql;

-- DROP TABLE Tweet;
