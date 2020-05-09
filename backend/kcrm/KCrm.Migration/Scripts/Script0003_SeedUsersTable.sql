INSERT INTO dbo.Users (Id, Username, [Password], [Data]) 
    select NEWID(), 'root', dbo.hashPassword('secret'), (select 'Admin' as name, '' as surname, 'admin@root' as email for json path, without_array_wrapper);
INSERT INTO dbo.Users (Id, Username, [Password], [Data]) 
    select NEWID(), 'user1', dbo.hashPassword('user1'), (select 'John' as name, 'Smith' as surname, 'john.smith@local.com' as email, 'US' as country for json path, without_array_wrapper);