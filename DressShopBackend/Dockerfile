# Use the official .NET SDK Images for build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the .csproj and restore as distinct layers
COPY ["DressShopBackend/DressShopBackend.csproj", "DressShopBackend/"]
RUN dotnet restore "DressShopBackend/DressShopBackend.csproj"

# Copy the rest of the project files and build
COPY ["DressShopBackend/", "DressShopBackend/"]
WORKDIR "/src/DressShopBackend"
RUN dotnet build "DressShopBackend.csproj" -c Release -o /app/build

# Publish the project
RUN dotnet publish "DressShopBackend.csproj" -c Release -o /app/publish

# Use the official ASP.NET Core Images as a base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Copy the published output and static files
COPY --from=build /app/publish .

# Copy static files (Images folder)
COPY ["DressShopBackend/Images", "/app/Images"]

# Set the entrypoint for the container
ENTRYPOINT ["dotnet", "DressShopBackend.dll"]