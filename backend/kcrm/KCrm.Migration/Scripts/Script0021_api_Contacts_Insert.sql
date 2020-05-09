SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[api_Contacts_Insert]
    @data NVARCHAR(MAX),
    @avatarId UNIQUEIDENTIFIER NULL,
    @newId UNIQUEIDENTIFIER NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    set @newID = newID();

    INSERT INTO dbo.contacts([id], [data], [AvatarId]) VALUES(@newID, @data, @avatarId)

END
GO