FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /build

COPY KCrm.Data/*.csproj KCrm.Data/ 
RUN  cd KCrm.Data && dotnet restore

COPY KCrm.Storage/*.csproj KCrm.Storage/ 
RUN  cd KCrm.Storage && dotnet restore

COPY KCrm.Web/*.csproj KCrm.Web/ 
RUN cd KCrm.Web && dotnet restore

COPY . .
RUN ls -la

RUN cd KCrm.Web && dotnet publish -c release -o /build/out
RUN ls -la /build/out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

WORKDIR /app
COPY --from=build /build/out .
RUN ls -la
ENV ASPNETCORE_ENVIRONMENT Docker 
ENV ASPNETCORE_URLS http://*:80
EXPOSE 80
ENTRYPOINT ["dotnet", "KCrm.Web.dll"]