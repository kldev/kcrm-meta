SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[api_File_Insert]
    @originalName NVARCHAR(512),
    @metadata NVARCHAR(MAX),
    @storeId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    declare @newID UNIQUEIDENTIFIER = newID();

    INSERT INTO dbo.Files([id], [OriginalName], [Metadata], [Created], [StoreId]) VALUES(@newID, @originalName, @metadata, GETUTCDATE(), @storeId);

    -- cast for Dapper serialization
    select cast(@newID as nvarchar(100)) as id
END