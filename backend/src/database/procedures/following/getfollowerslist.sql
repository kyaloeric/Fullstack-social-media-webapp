-- USE Tweet


CREATE OR ALTER PROCEDURE getFollowersListProc
  @user_id VARCHAR(200)
AS
BEGIN
  SELECT * FROM Follower WHERE following_user_id = @user_id;
END;
