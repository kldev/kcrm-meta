SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[api_File_GetStoreId]
@id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    select TOP 1 cast(StoreId as nvarchar(max) ) as id from dbo.Files where Id = @id
END