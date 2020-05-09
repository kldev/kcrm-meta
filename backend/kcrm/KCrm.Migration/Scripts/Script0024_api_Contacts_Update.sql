SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[api_Contacts_Update]
@id uniqueidentifier null,
                     @data NVARCHAR(MAX),
    @avatarId uniqueidentifier NULL 
AS
BEGIN
    SET NOCOUNT ON;

    if @id is not null begin
        update dbo.Contacts
        set [data] = @data,
            [AvatarId] = @avatarId
        where id = @id
    end


END