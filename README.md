# 🐾 PetCare IoT

Una aplicación web para monitorear la salud de tus mascotas en tiempo real usando dispositivos IoT.

![PetCare Banner](src/assets/hero.png)

---

## 🎯 ¿Qué es esto?

PetCare IoT te permite:

- **Ver todos tus dispositivos** conectados en un solo lugar
- **Monitorear sensores** como temperatura, humedad, movimiento y más
- **Visualizar datos históricos** en gráficos fáciles de entender
- **Agregar o eliminar dispositivos** de tu cuenta
- **Recibir alertas** cuando algo no esté bien con tu mascota

---

## 🏠 ¿Cómo funciona?

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Dispositivo│ ───▶ │   Backend   │ ───▶ │  Frontend   │
│    IoT      │      │   (API)     │      │  (Web App)  │
│  (Sensor)   │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

1. Los **dispositivos IoT** (sensores)采集 datos de tu mascota
2. Un **servidor** recibe y guarda esa información
3. Esta **aplicación web** muestra los datos de forma visual

---

## 🚀 Cómo empezar

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn
- Un servidor backend conectado (o usa el nuestro)

### Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/BR4Y4NEXE/PetCare-UI.git

# 2. Entra a la carpeta
cd PetCare-UI

# 3. Instala las dependencias
npm install

# 4. Inicia la aplicación
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Cambia la URL por la dirección de tu servidor backend.

---

## 📱 Uso

### Panel Principal (Dashboard)

Aquí verás un resumen de todos tus dispositivos y sus estados actuales.

### Gestión de Dispositivos

- **Agregar dispositivo:** Click en el botón "+" y completa el formulario
- **Ver detalles:** Click en cualquier tarjeta de dispositivo
- **Eliminar dispositivo:** Click en el icono de basura en la tarjeta

### Gráficos de Sensores

- Selecciona un rango de tiempo (1 hora, 24 horas, 7 días)
- Visualiza las lecturas históricas en gráficos interactivos
- Pasa el cursor sobre los puntos para ver valores exactos

---

## 🛠️ Tecnologías

| Tecnología | Para qué se usa |
|------------|-----------------|
| Vue 3 | Interfaz de usuario |
| TypeScript | Código más seguro y organizado |
| Tailwind CSS | Diseños modernos y responsivos |
| Pinia | Guardar datos de la aplicación |
| Chart.js | Gráficos de datos |
| Axios | Comunicarse con el servidor |
| Vite | Herramienta de desarrollo |

---

## 📁 Estructura del proyecto

```
PetCare-UI/
├── src/
│   ├── api/          # Conexión con el servidor
│   ├── components/   # Partes de la interfaz
│   ├── composables/  # Funciones reutilizables
│   ├── stores/       # Datos de la aplicación
│   ├── types/        # Definiciones de datos
│   ├── views/        # Páginas principales
│   └── router/       # Rutas de navegación
├── public/           # Archivos públicos
├── cypress/          # Pruebas automáticas
└── package.json      # Dependencias del proyecto
```

---

## 🧪 Pruebas

```bash
# Pruebas unitarias
npm run test:unit

# Pruebas de interfaz
npm run test:e2e
```

---

## 🔧 Desarrollo

### Compilar para producción

```bash
npm run build
```

Los archivos se generan en la carpeta `dist/`

### Verificar código

```bash
npm run lint
```

---

## 📝 API del Backend

La aplicación espera un backend con los siguientes endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/devices` | Lista todos los dispositivos |
| GET | `/api/devices/:id` | Detalle de un dispositivo |
| POST | `/api/devices` | Crear nuevo dispositivo |
| DELETE | `/api/devices/:id` | Eliminar dispositivo |
| GET | `/api/devices/:id/readings` | Obtener lecturas del sensor |

---

## 🤝 Contribuir

1. Haz un fork del proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -m 'Agregar nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## 👤 Autor

- GitHub: [@BR4Y4NEXE](https://github.com/BR4Y4NEXE)

---

## 💡 ¿Dudas?

Si tienes preguntas o problemas, abre un issue en el repositorio.

⭐ Si te gusta el proyecto, dale una estrella!
