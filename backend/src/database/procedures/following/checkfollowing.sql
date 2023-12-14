-- USE Tweet


-- Stored procedure for checking if a user is being followed
CREATE OR ALTER PROCEDURE checkFollowingProc
  @follower_user_id VARCHAR(200),
  @following_user_id VARCHAR(200)
AS
BEGIN
  -- Select records from the Follower table based on follower_user_id and following_user_id
  SELECT 1 AS isFollowing FROM Follower WHERE follower_user_id = @follower_user_id AND following_user_id = @following_user_id;
END;