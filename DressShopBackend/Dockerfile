FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["DressShopBackend/DressShopBackend.csproj", "DressShopBackend/"]
RUN dotnet restore "DressShopBackend/DressShopBackend.csproj"
COPY . .
WORKDIR "/src/DressShopBackend"
RUN dotnet build "DressShopBackend.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "DressShopBackend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DressShopBackend.dll"]