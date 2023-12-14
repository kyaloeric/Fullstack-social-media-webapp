-- CREATE OR ALTER PROCEDURE CreateUser
--   @name VARCHAR(MAX),
--   @username VARCHAR(MAX),
--   @email VARCHAR(MAX),
--   @password VARCHAR(MAX),
-- AS
-- BEGIN
--   INSERT INTO Users (name,  username, email, password, gender)
--   VALUES (@name, @username, @email, @password, @gender);
-- END;

-- USE Tweet

CREATE OR ALTER PROCEDURE CreateUser
  @user_id VARCHAR(200), 
  @name VARCHAR(MAX),
  @email VARCHAR(MAX),
  @password VARCHAR(MAX),
  @gender VARCHAR(200)

AS
BEGIN
  -- Generate a unique username based on the name
  DECLARE @username VARCHAR(MAX);
  SET @username = '@' + REPLACE(@name, ' ', ''); -- Replace spaces with an empty string

  -- Check if the generated username already exists
  DECLARE @usernameExists INT;
  SELECT @usernameExists = COUNT(*) FROM Users WHERE username = @username;

  -- If the generated username already exists, append a unique suffix
  IF @usernameExists > 0
  BEGIN
    DECLARE @suffix INT = 1;
    WHILE @usernameExists > 0
    BEGIN
      SET @username = '@' + REPLACE(@name, ' ', '') + '_' + CAST(@suffix AS VARCHAR(MAX));
      SELECT @usernameExists = COUNT(*) FROM Users WHERE username = @username;
      SET @suffix = @suffix + 1;
    END;
  END;

  -- Insert the new user into the Users table
  INSERT INTO Users (user_id, name, username, email, password, gender)
  VALUES (@user_id, @name, @username, @email, @password, @gender);
END;
