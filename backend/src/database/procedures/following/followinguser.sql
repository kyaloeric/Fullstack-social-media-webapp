-- USE Tweet

-- Stored procedure for following a user
CREATE OR ALTER PROCEDURE followUserProc
  @follower_user_id VARCHAR(200),
  @following_user_id VARCHAR(200)
AS
BEGIN
  -- Check if the user is already being followed
  IF NOT EXISTS (SELECT 1 FROM Follower WHERE follower_user_id = @follower_user_id AND following_user_id = @following_user_id)
  BEGIN
    -- Insert a new record in the Followers table
    INSERT INTO Follower (follower_user_id, following_user_id) VALUES (@follower_user_id, @following_user_id);
  END
END;
