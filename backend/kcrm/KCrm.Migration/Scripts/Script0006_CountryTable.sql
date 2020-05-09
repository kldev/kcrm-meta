CREATE TABLE dbo.Country
(
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Name] NVARCHAR(200) NOT NULL,
    [Iso2] VARCHAR(2) NOT NULL,
    [Code] NVARCHAR(5) NULL

        CONSTRAINT [PK_kcrm_Country_Id] PRIMARY KEY ([Id] ASC),
    CONSTRAINT [UQ_kcrm_Country_Code] UNIQUE (Code),
    CONSTRAINT [UQ_kcrm_Country_Iso2] UNIQUE (Iso2)
)