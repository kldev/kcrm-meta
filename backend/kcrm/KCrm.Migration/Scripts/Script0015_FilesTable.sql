create table dbo.Files (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [OriginalName] NVARCHAR(2048) NULL,
    [Metadata] NVARCHAR(MAX) NULL,
    [Created] Datetime NULL,
    [StoreId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_kcrm_Files_Id] PRIMARY KEY ([Id] ASC)
)