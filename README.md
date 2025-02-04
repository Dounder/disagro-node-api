# Descripción del proyecto

Este es el backend de la prueba técnica de la empresa [**_Disagro_**](https://www.disagro.com.gt/), el cual fue desarrollado en **Node.js** y **Express.js**. El proyecto consiste en una API REST para el manejo de asistencia a un evento de promoción de productos y servicios.

# Instalación

1. Clona el repositorio
2. Copia el archivo `.env.template` a `.env` y completa las variables de entorno requeridas
3. Ejecuta `pnpm install` para instalar las dependencias
4. Ejecuta `docker compose up -d` para iniciar la base de datos
5. Ejecuta `pnpm prisma generate` para generar el cliente de Prisma
6. Ejecuta `pnpm prisma migrate dev` para aplicar las migraciones
7. Ejecuta `pnpm dev` para iniciar el servidor de desarrollo

# Docker

Para ejecutar el proyecto en modo desarrollo con hot reload, se puede utilizar el siguiente comando:

```bash
docker compose -f compose.dev.yml up -d
```

Para ejecutar el proyecto en modo producción, se puede utilizar el siguiente comando:

```bash
docker compose -f compose.prod.yml up -d
```

Para la creación de la imagen de Docker, se puede utilizar el siguiente comando:

```bash
docker compose -f compose.build.yml build
```

# Tecnologías

- [Node.js](https://nodejs.org/) - Utilizado como entorno de ejecución principal para el servidor
- [Express.js](https://expressjs.com/) - Framework para la creación de la API REST y manejo de rutas
- [Prisma](https://www.prisma.io/) - Implementado para la gestión y modelado de la base de datos
- [PostgreSQL](https://www.postgresql.org/) - Base de datos para almacenar información de usuarios y asistencias
- [Docker](https://www.docker.com/) - Usado para la contenerización y despliegue del proyecto
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Implementado para la seguridad en el manejo de contraseñas
- [JWT](https://jwt.io/) - Utilizado para la autenticación y autorización de usuarios
- [Zod](https://zod.dev/) - Implementado para la validación de datos de entrada en la API
