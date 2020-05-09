CREATE PROCEDURE [dbo].[api_LoginUser]
    @username NVARCHAR(200), @password NVARCHAR(MAX)
as
BEGIN
    set NOCOUNT ON

    DECLARE @result NVARCHAR(MAX);

    if LEN(@username) < 1 OR LEN (@password) < 1 BEGIN select null; return; end;

    declare @userId  UNIQUEIDENTIFIER = (select id from dbo.Users where [Username] = @username and [Password] = dbo.hashPassword(@password));

    select TOP 1 * from dbo.v_UsersExtended where @userId is not null and id = @userId for json path, without_array_wrapper;
end
GO