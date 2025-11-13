# Dockerfile for Render deployment
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY backend/PostManagementAPI/PostManagementAPI.csproj ./
RUN dotnet restore

# Copy everything and build
COPY backend/PostManagementAPI/ ./
RUN dotnet build -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Render configuration
ENV ASPNETCORE_ENVIRONMENT=Production

# Expose port 10000 for Render
EXPOSE 10000
ENTRYPOINT ["dotnet", "PostManagementAPI.dll"]
