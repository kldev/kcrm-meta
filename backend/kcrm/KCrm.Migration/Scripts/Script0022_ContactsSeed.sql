DECLARE @RC int
DECLARE @data nvarchar(max)
DECLARE @avatarId uniqueidentifier
DECLARE @newId UNIQUEIDENTIFIER

-- select value as phone from string_split('48500501502,48500501503', ',')

set @data = (select 'John' as firstName, 'Smith' as lastName, 'PL' as country, 'john.smith@company.co' as email, (select value as phone, IIF(value = 48500501502, 1, 0 ) as [primary] from string_split('48500501502,48500501503', ',') for json path) as phones for json path, without_array_wrapper)

select @data

EXECUTE @RC = [dbo].[api_Contacts_Insert]
              @data
    ,@avatarId
    , @newId OUTPUT

GO



DECLARE @RC int
DECLARE @data nvarchar(max)
DECLARE @avatarId uniqueidentifier
DECLARE @newId UNIQUEIDENTIFIER

-- select value as phone from string_split('48560501539,48560501540', ',')

set @data = (select 'Alice' as firstName, 'Coben' as lastName, 'PL' as country, 'alice.coben@company.co' as email, (select value as phone, IIF(value = 48560501539, 1, 0 ) as [primary] from string_split('48560501539,48560501540', ',') for json path) as phones for json path, without_array_wrapper)

select @data

EXECUTE @RC = [dbo].[api_Contacts_Insert]
              @data
    ,@avatarId
    , @newId OUTPUT

GO

DECLARE @RC int
DECLARE @data nvarchar(max)
DECLARE @avatarId uniqueidentifier
DECLARE @newId UNIQUEIDENTIFIER

-- select value as phone from string_split('44360501539,44360501540', ',')

set @data = (select 'Boris' as firstName, 'Johnson' as lastName, 'UK' as country, 'boris.johnson@company.co' as email, (select value as phone, IIF(value = 44360501539, 1, 0 ) as [primary] from string_split('44360501539,44360501540', ',') for json path) as phones for json path, without_array_wrapper)

select @data

EXECUTE @RC = [dbo].[api_Contacts_Insert]
              @data
    ,@avatarId
    , @newId OUTPUT

GO