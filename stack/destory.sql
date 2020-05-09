use master
go

DECLARE	@Spid int;
DECLARE	@ExecSQL nvarchar(255);

DECLARE	KillCursor CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY FOR SELECT DISTINCT SPID FROM	MASTER..SysProcesses
WHERE DBID = DB_ID('K_CRM_Dev')
OPEN KillCursor; FETCH NEXT FROM KillCursor INTO @Spid;
WHILE @@FETCH_STATUS = 0 BEGIN;
SET	@ExecSQL = 'KILL ' + CAST(@Spid AS VARCHAR(50))
EXEC (@ExecSQL);
FETCH NEXT FROM KillCursor INTO @Spid;
END;
CLOSE KillCursor; DEALLOCATE KillCursor;


IF EXISTS(select * from sys.databases where name= 'K_CRM_Dev')
ALTER DATABASE [K_CRM_Dev] SET SINGLE_USER WITH ROLLBACK IMMEDIATE

IF EXISTS(select * from sys.databases where name='K_CRM_Dev')
DROP DATABASE [K_CRM_Dev];