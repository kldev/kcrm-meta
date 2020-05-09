CREATE TABLE dbo.Roles
(
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Name] NVARCHAR(200) NOT NULL,
    [Description]  NVARCHAR(512) NOT NULL,
    CONSTRAINT [PK_kcrm_Roles_Id] PRIMARY KEY ([Id] ASC),
    CONSTRAINT [UQ_kcrm_Roles_Name] UNIQUE (Name)
)

insert into dbo.Roles(id, name, Description) select newid(), 'root', 'the root role';
insert into dbo.Roles(id, name, Description) select newid(), 'admin', 'the admin role';
insert into dbo.Roles(id, name, Description) select newid(), 'customer', 'the customer role';
insert into dbo.Roles(id, name, Description) select newid(), 'seller', 'the seller role';