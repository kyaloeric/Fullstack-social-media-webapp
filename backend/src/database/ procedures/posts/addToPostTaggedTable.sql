-- USE Talky


-- CREATE OR ALTER PROCEDURE addToPostTaggedTable
--     @post_user_tag_id VARCHAR(500),
--     @post_id VARCHAR(100),
--     @user_id VARCHAR(100)
-- AS
-- BEGIN
--     INSERT INTO post_user_tag (post_user_tag_id, post_id, user_id, created_at)
--     VALUES (@post_user_tag_id, @post_id, @user_id, GETDATE());
-- END