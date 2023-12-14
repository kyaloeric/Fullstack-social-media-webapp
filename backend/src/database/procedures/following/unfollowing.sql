-- USE Tweet

-- Stored procedure for unfollowing a user
CREATE OR ALTER PROCEDURE unfollowUserProc
  @follower_user_id VARCHAR(200),
  @following_user_id VARCHAR(200)
AS
BEGIN
  -- Check if the user is being followed
  IF EXISTS (SELECT 1 FROM Follower WHERE follower_user_id = @follower_user_id AND following_user_id = @following_user_id)
  BEGIN
    -- Delete the record from the Follower table
    DELETE FROM Follower WHERE follower_user_id = @follower_user_id AND following_user_id = @following_user_id;
  END
END;