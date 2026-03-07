Instrucciones de Ejecución:

Levantar base de datos: docker-compose up -d

Aplicar migraciones: dotnet ef database update --project Asisya.Infrastructure --startup-project Asisya.API

Cargar 100k datos: Usar el endpoint POST /api/Products/seed-100k (Tiempo estimado: < 7s).

Consultar datos: Usar GET /api/Products con parámetros de paginación para optimizar el consumo de recursos.