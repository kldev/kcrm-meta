SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_ContactsExtended] as

select cast(id as nvarchar(100)) as id, 
       [modify] as modify, 
       cast(avatarId as nvarchar(100)) as avatarId, 
       json_value([data], '$.firstName') as name, 
       json_Value([data], '$.lastName') as surname, 
       json_value([data], '$.email') as email, 
       json_query([data], '$.phones') as phones, 
       json_value([data], '$.country') as country from dbo.Contacts

GO