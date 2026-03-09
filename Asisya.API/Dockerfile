# 1. Runtime - Usamos 'slim' para reducir vulnerabilidades
FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim AS base
WORKDIR /app
EXPOSE 8080

# 2. SDK para compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim AS build
WORKDIR /src

# Copiamos archivos de proyecto
COPY ["Asisya.API/Asisya.API.csproj", "Asisya.API/"]
COPY ["Asisya.Domain/Asisya.Domain.csproj", "Asisya.Domain/"]
COPY ["Asisya.Infrastructure/Asisya.Infrastructure.csproj", "Asisya.Infrastructure/"]
COPY ["Asisya.Application/Asisya.Application.csproj", "Asisya.Application/"]

RUN dotnet restore "Asisya.API/Asisya.API.csproj"

# Copiamos todo lo demás y compilamos
COPY . .
WORKDIR "/src/Asisya.API"
RUN dotnet build "Asisya.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Asisya.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# 3. Imagen Final - Extremadamente ligera y segura
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Asisya.API.dll"]