CREATE table dbo.LeadStatus (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Code] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(1024) NOT NULL,
    CONSTRAINT [PK_kcrm_LeadStatus_Id] PRIMARY KEY ([Id] ASC),
    CONSTRAINT [UQ_kcrm_LeadStatus_Code] UNIQUE (Code)
)

insert into dbo.LeadStatus(id, code, Description)
select newid(), value, 'the ' + value + ' status' from  string_split('new,hot,cold,successful,failed', ',')
where not exists (select id from dbo.LeadStatus where code  = value )