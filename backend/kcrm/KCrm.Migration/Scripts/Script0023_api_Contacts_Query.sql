SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure api_Contacts_Query
    @query NVARCHAR(max),
    @offset bigint null,
    @limit INT null
as
BEGIN
    declare @result NVARCHAR(MAX) = ( SELECT [id]
                                           ,[name]
                                           ,[surname]
                                           ,[email]
                                           ,[phones]
                                           ,[country]
                                      FROM [dbo].[v_ContactsExtended]
                                      where
                                              LEN( isnull(@query, '')) < 1 OR
                                          (
                                                  exists (select phone from Openjson([phones]) with (phone NVarchar(32) '$.phone') where phone like @query  )
                                                  OR email like @query
                                                  OR name like @query
                                                  OR surname like @query
                                              )
                                      order by [modify] desc
                                          OFFSET ISNULL(@offset, 0) ROWS
                                          FETCH NEXT ISNULL(@limit, (SELECT COUNT(*) FROM v_ContactsExtended)+1) ROWS ONLY

                                      for json  auto
    )

    select @result

end
