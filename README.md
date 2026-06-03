# 🚀 User Manager App

Una aplicación web desarrollada en **Next.js (App Router)** para la gestión completa de usuarios con autenticación, persistencia en **MongoDB**.

# Credenciales de prueba
```bash
email: admin@example.com
password: 1234567890
```
## 📌 Características Principales

* **Autenticación de Usuarios:** Login con email y contraseña.
* **Protección de Rutas (Role-based Access):**

    * Dashboard para cualquier usuario autenticado.
    * Administración de usuarios exclusiva para usuarios con rol `admin`.
* **CRUD Completo:** Crear, consultar, actualizar y eliminar usuarios.
* **Seguridad:** Contraseñas almacenadas mediante hashing con `bcryptjs`.
* **Notificaciones por Email:** Envío automático de correo de bienvenida con credenciales mediante `Nodemailer`.
* **UI Neo-Brutalista:** Interfaz construida con Tailwind CSS utilizando colores vibrantes, bordes gruesos y tipografía en mayúsculas.

---

## 🛠️ Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* **Node.js** v18 o superior.
* **pnpm**.
* Una instancia de **MongoDB** (local o MongoDB Atlas).
* Una cuenta de Gmail con **Contraseña de Aplicación** habilitada para el envío de correos.

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd user-manager
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/user-manager

# Gmail (Nodemailer)
GMAIL_USER=tu-correo@gmail.com
GMAIL_PASS=tu-clave-de-aplicacion
```

> Puedes obtener la contraseña de aplicación en:
>
> Google Account → Seguridad → Verificación en dos pasos → Contraseñas de aplicaciones.

---

## 🚀 Ejecutar el proyecto

Inicia el servidor de desarrollo:

```bash
pnpm dev
```

Abre:

```text
http://localhost:3000
```

La aplicación redirigirá automáticamente a:

```text
/login
```

---

## 👤 Crear el primer administrador

Para acceder al panel administrativo (`/admin/users`) necesitas al menos un usuario con rol `admin`.

Puedes crearlo directamente en MongoDB o mediante una petición POST a:

```text
http://localhost:3000/api/users
```

Body:

```json
{
  "nombre": "Admin Principal",
  "cc": "123456789",
  "email": "admin@example.com",
  "password": "passwordSeguro",
  "role": "admin"
}
```

---

## 📂 Estructura General

```text
src/
├── app/
│   ├── login/
│   ├── dashboard/
│   ├── admin/
│   └── api/
├── components/
├── lib/
├── models/
└── services/
```

---

## 🌐 Despliegue en Vercel

### 1. Subir a GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Conectar el repositorio en Vercel

* Importa el repositorio desde GitHub.
* Configura las variables de entorno.

### 3. Agregar variables de entorno

```env
MONGODB_URI=
GMAIL_USER=
GMAIL_PASS=
```

### 4. Desplegar

Haz clic en **Deploy** y Vercel construirá automáticamente la aplicación.

---

## 🔐 Tecnologías Utilizadas

* Next.js 15 (App Router)
* React
* TypeScript
* MongoDB
* Mongoose
* Tailwind CSS
* bcryptjs
* Nodemailer

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.
