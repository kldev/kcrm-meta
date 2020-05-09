CREATE table dbo.LeadNotes (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Type] INT NOT NULL,
    [LeadId] UNIQUEIDENTIFIER NOT NULL,
    [Body] NVARCHAR(MAX) NOT NULL,
    [Created] Datetime NOT NULL,
    [AttachmentId] UNIQUEIDENTIFIER NULL,
    CONSTRAINT [PK_kcrm_LeadNotes_Id] PRIMARY KEY ([Id] ASC),
    CONSTRAINT [FK_kcrm_LeadNotes_LeadId] FOREIGN KEY (LeadId) REFERENCES dbo.Lead(Id)
);

