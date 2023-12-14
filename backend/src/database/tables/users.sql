--   USE Tweet
  
  
  CREATE TABLE Users (
    user_id VARCHAR(200) PRIMARY KEY,
    name VARCHAR(200),
    email VARCHAR(200),
    username VARCHAR(200) UNIQUE,
    password VARCHAR(200),
    gender VARCHAR(200)
  );


-- Drop the table
-- Drop foreign key constraints referencing the table
-- DECLARE @Sql NVARCHAR(MAX);

-- SELECT @Sql = COALESCE(@Sql + '; ', '') + 'ALTER TABLE ' + OBJECT_NAME(parent_object_id) + ' DROP CONSTRAINT ' + name
-- FROM sys.foreign_keys
-- WHERE referenced_object_id = OBJECT_ID('Users');

-- EXEC sp_executesql @Sql;

-- DROP TABLE Users;