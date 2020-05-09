CREATE function dbo.hashPassword( @input NVARCHAR(1024)) returns NVARCHAR(1024) as begin
    declare @result NVARCHAR(1024) = HASHBYTES('SHA2_512', @input);
    return @result;
end