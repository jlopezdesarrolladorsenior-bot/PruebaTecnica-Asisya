# 🚀 Asisya Inventory Control System - Prueba Técnica 2026

Solución integral para la gestión de inventarios masivos, desarrollada con una arquitectura desacoplada, alto rendimiento en el procesamiento de datos y seguridad basada en estándares industriales.

## 🏛️ Arquitectura del Proyecto
La solución implementa **Clean Architecture** (Arquitectura Limpia) para garantizar la separación de responsabilidades y facilitar la testabilidad:

* **Asisya.Domain**: Entidades puras de negocio y lógica base.
* **Asisya.Application**: Lógica de aplicación, interfaces de repositorio y DTOs.
* **Asisya.Infrastructure**: Persistencia con **PostgreSQL**, Entity Framework Core y patrones de acceso a datos.
* **Asisya.API**: Capa de entrada con controladores REST, seguridad JWT y Swagger.
* **asisya-frontend**: Interfaz de usuario moderna construida con **React + Vite**.



---

## 🛠️ Stack Tecnológico
* **Backend**: .NET 8 (C#).
* **Frontend**: React JS, Axios (Interceptors), Bootstrap.
* **Base de Datos**: PostgreSQL.
* **DevOps**: Docker & Docker Compose (Orquestación multi-contenedor).
* **Librerías Clave**:
    * **EFCore.BulkExtensions**: Para la carga masiva de datos.
    * **Moq & Testcontainers**: Para pruebas unitarias e integración.
    * **SweetAlert2**: Para notificaciones y experiencia de usuario fluida.

---

## ⚙️ Configuración y Ejecución (Docker)

El proyecto está totalmente contenedorizado para garantizar que se ejecute correctamente en cualquier entorno.

1.  **Levantar el ecosistema**:
    ```bash
    docker-compose up -d --build
    ```
    * **API**: [http://localhost:5000](http://localhost:5000)
    * **Frontend**: [http://localhost:3000](http://localhost:3000)
    * **Swagger**: [http://localhost:5000/swagger/index.html](http://localhost:5000/swagger/index.html)

2.  **Aplicar Migraciones**:
    ```bash
    dotnet ef database update --project Asisya.Infrastructure --startup-project Asisya.API
    ```

3.  **Carga Masiva (Seed)**:
    Acceda al endpoint `POST /api/Products/seed-100k`.
    > **Métrica de Rendimiento**: Se logró la carga y asociación de **100,000 registros** en aproximadamente **2.32 segundos**.

---

## 🔐 Seguridad y Autenticación
El sistema utiliza **JWT (JSON Web Tokens)** para proteger los recursos sensibles.

* **Credenciales de acceso**:
    * **Usuario**: `admin@asisya.com`
    * **Contraseña**: `Admin123`
* **Interceptor Axios**: El frontend implementa un interceptor global que inyecta automáticamente el `Bearer Token` desde el `localStorage` en cada petición saliente hacia la API.

---

## 📈 Decisiones de Ingeniería y Optimización
* **Bulk Operations**: Se utilizó `BulkInsert` para evitar el rastreo excesivo de entidades en memoria y bajar los tiempos de respuesta de minutos a escasos segundos.
* **Paginación de Alto Volumen**: Se implementó paginación dinámica (`Skip/Take`) calculada desde el servidor para manejar los 100,000 registros sin degradar el rendimiento del navegador.
* **Patrón Repositorio**: El desacoplamiento mediante interfaces (`IProductRepository`) permite el uso de **Mocks** para pruebas unitarias rápidas y confiables.

---

## 🧪 Pruebas y CI/CD
* **Pruebas Unitarias**: El proyecto incluye validaciones de lógica de negocio ejecutables mediante `dotnet test`.
* **Pipeline CI/CD**: Se configuró un workflow en **GitHub Actions** que automatiza la restauración, compilación y testeo de la solución en cada integración.

---
**Desarrollado para la Evaluación Técnica Asisya 2026.**