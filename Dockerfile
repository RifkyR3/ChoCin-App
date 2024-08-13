FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
RUN apt-get -y update \
    && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_22.x | bash - \ 
    && apt-get install -y nodejs \
    && apt-get clean
COPY . /src/
WORKDIR "/src/ChoCin-App.Server"
RUN dotnet restore "ChoCin-App.Server.csproj"

FROM build AS publish
RUN dotnet publish "ChoCin-App.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build runtime image.
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ChoCin-App.Server.dll"]