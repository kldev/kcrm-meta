CREATE table dbo.Lead (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Code] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(1024) NOT NULL,
    [Created] Datetime NOT NULL,
    [StatusId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_kcrm_Lead_Id] PRIMARY KEY ([Id] ASC),
    CONSTRAINT [FK_kcrm_Lead_StatusId] FOREIGN KEY (StatusId) REFERENCES dbo.LeadStatus(Id)
);
