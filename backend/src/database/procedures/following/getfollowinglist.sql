-- USE Tweet



CREATE OR ALTER PROCEDURE getFollowingListProc
  @user_id VARCHAR(200)
AS
BEGIN
  SELECT * FROM Follower WHERE follower_user_id = @user_id;
END;
