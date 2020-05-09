create table dbo.Contacts (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Data] NVARCHAR(MAX) NOT NULL,  --- { "name": "", surname: "", phones:[], emails:[]}
    [AvatarId] UNIQUEIDENTIFIER NULL,
    [Modify] Datetime NULL DEFAULT GETUTCDATE()
    CONSTRAINT [PK_kcrm_Contacts_Id] PRIMARY KEY ([Id] ASC),
)