CREATE view [dbo].[v_UsersExtended] as

select cast(id as NVARCHAR(max)) as id, username, json_value([data], '$.name') as name, json_Value([data], '$.surname') as surname, json_Value([data], '$.email') as email, json_Value([data], '$.country') as country from dbo.Users

