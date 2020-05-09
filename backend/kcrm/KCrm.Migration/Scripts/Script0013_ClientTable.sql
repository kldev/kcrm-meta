create table dbo.Client (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Code] NVARCHAR(100) NOT NULL,
    [Data] NVARCHAR(MAX) NOT NULL,
    [PrimaryContact] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_kcrm_Client_Id] PRIMARY KEY ([Id] ASC),
    CONSTRAINT [UQ_kcrm_Client_Code] UNIQUE (Code)
)