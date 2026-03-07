FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# Copiamos los archivos de proyecto para restaurar dependencias
COPY ["Asisya.API/Asisya.API.csproj", "Asisya.API/"]
COPY ["Asisya.Domain/Asisya.Domain.csproj", "Asisya.Domain/"]
COPY ["Asisya.Infrastructure/Asisya.Infrastructure.csproj", "Asisya.Infrastructure/"]
RUN dotnet restore "Asisya.API/Asisya.API.csproj"

# Copiamos todo lo demás y compilamos
COPY . .
WORKDIR "/src/Asisya.API"
RUN dotnet build "Asisya.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Asisya.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Asisya.API.dll"]