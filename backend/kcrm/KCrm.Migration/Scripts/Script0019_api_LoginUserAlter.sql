ALTER PROCEDURE [dbo].[api_LoginUser]
    @username NVARCHAR(200), @password NVARCHAR(MAX)
as
BEGIN
    set NOCOUNT ON
    
    if LEN(@username) < 1 OR LEN (@password) < 1 BEGIN select null; return; end;

    declare @userId  UNIQUEIDENTIFIER = (select id from dbo.Users where [Username] = @username and [Password] = dbo.hashPassword(@password));

    select TOP 1 users.*, 
                 (select dbo.Roles.Name as name from dbo.UserHasRole
                     inner join dbo.Roles on dbo.UserHasRole.RoleId = dbo.Roles.Id 
                                                 and dbo.UserHasRole.UserId = users.id for json path) as roles 
    from dbo.v_UsersExtended users where id = @userId for json path, without_array_wrapper;
end
GO