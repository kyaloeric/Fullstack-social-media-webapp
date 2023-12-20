-- USE Talky



-- CREATE TABLE posts (
--     post_id VARCHAR(100) PRIMARY KEY,
--     created_by_user_id VARCHAR(100) ,
--     caption VARCHAR(500) ,   
--     postImage VARCHAR(500) ,
--     created_at DATETIME ,
--     isDeleted BIT Default 0,

--     FOREIGN KEY (created_by_user_id) REFERENCES users(user_id)   
-- );



-- SELECT
--     fk.name AS constraint_name,
--     tp.name AS referencing_table,
--     ref.name AS referenced_table
-- FROM
--     sys.foreign_keys fk
-- INNER JOIN 
--     sys.tables tp ON fk.parent_object_id = tp.object_id
-- INNER JOIN 
--     sys.tables ref ON fk.referenced_object_id = ref.object_id
-- WHERE
--     ref.name = 'posts';

-- Drop the foreign key constraint on the 'likes' table
ALTER TABLE likes
DROP CONSTRAINT FK__likes__post_id__4E88ABD4;

-- Drop the foreign key constraint on the 'comment' table
ALTER TABLE comment
DROP CONSTRAINT FK__comment__post_id__5629CD9C;

-- Now, you should be able to drop the 'posts' table
-- DROP TABLE posts;


DECLARE @Sql NVARCHAR(MAX);

-- Drop foreign key constraints on the 'likes' table
SELECT @Sql = COALESCE(@Sql + '; ', '') + 'ALTER TABLE ' + OBJECT_NAME(parent_object_id) + ' DROP CONSTRAINT ' + name
FROM sys.foreign_keys
WHERE referenced_object_id = OBJECT_ID('likes');

-- Execute the dynamic SQL to drop foreign key constraints
EXEC sp_executesql @Sql;

-- Now, drop the 'posts' table
