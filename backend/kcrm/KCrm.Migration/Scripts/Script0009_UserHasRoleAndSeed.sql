CREATE TABLE dbo.UserHasRole
(
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [RoleId]  UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_kcrm_UserHasRole_Id] PRIMARY KEY ([Id] ASC),
    CONSTRAINT [FK_kcrm_UserHasRole_UserId] FOREIGN KEY (UserId) REFERENCES dbo.Users (Id),
    CONSTRAINT [FK_kcrm_UserHasRole_RoleId] FOREIGN KEY (RoleId) REFERENCES dbo.Roles (Id)
)

insert into dbo.UserHasRole ([id], [userId], [roleId])
select newid(), (select top 1 id from users where username = 'root'), (select top 1 id from roles where name = 'root');

insert into dbo.UserHasRole ([id], [userId], [roleId])
select newid(), (select top 1 id from users where username = 'user1'), (select top 1 id from roles where name = 'customer');