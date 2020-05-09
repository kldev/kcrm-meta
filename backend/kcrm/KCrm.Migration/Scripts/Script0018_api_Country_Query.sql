SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[api_Country_Query](
    @query NVARCHAR(100)
)
as
BEGIN
    SET NOCOUNT ON;

    declare @likeQuery NVARCHAR(100);

    if (LEN( isnull(@query, '')) > 0 and CHARINDEX('%', @query) = 0) set @likeQuery = '%' + @query + '%';

    SELECT TOP 25
        [name]
                ,[iso2]
                ,[code]
    FROM [dbo].[Country]
    where
            LEN( isnull(@query, '')) = 0 OR
        (
                    Name like @likeQuery
                OR
                    iso2 like @likeQuery
            )    order by name desc
    for json  auto

end