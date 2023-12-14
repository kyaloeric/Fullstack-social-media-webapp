-- USE Tweet


CREATE OR ALTER PROCEDURE UpdateUser
  @user_id VARCHAR(200),
  @name VARCHAR(200),
  @email VARCHAR(200),
  @password VARCHAR(200),
  @gender VARCHAR(200)
AS
BEGIN
  UPDATE Users
  SET name = @name,
      email = @email,
      password = @password, -- Note: You may want to hash the new password
      gender = @gender
  WHERE user_id = @user_id;
END;
