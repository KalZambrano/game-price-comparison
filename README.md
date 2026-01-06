# 🎮 Game Price Comparison

Una aplicación web moderna para comparar precios de videojuegos en múltiples tiendas online, construida con **Astro**, **React** y **Tailwind CSS**.

## 🚀 Características

- **Búsqueda en tiempo real**: Encuentra juegos rápidamente con autocompletado
- **Comparación de precios**: Compara precios entre múltiples tiendas (Steam, Epic Games, GOG, etc.)
- **Filtros avanzados**: Filtra por tienda, ordenar por precio, descuento, calificación, etc.
- **Ofertas en vivo**: Visualiza las mejores ofertas del momento con descuentos destacados
- **Detalles del juego**: Página dedicada con historial de precios y todas las ofertas disponibles
- **Calificaciones integradas**: Metacritic y Steam ratings para cada juego
- **Diseño responsive**: Funciona perfectamente en desktop, tablet y móvil

## 🛠️ Tecnologías

- **[Astro](https://astro.build/)**: Framework web moderno para sitios rápidos
- **[React](https://react.dev/)**: Para componentes interactivos
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS utility-first
- **[CheapShark API](https://apidocs.cheapshark.com/)**: API gratuita para precios de videojuegos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`

## 🏗️ Estructura del Proyecto

```
/
├── public/
├── src/
│   ├── components/
│   │   ├── DealsGrid.tsx      # Grid de ofertas con paginación
│   │   ├── FilterBar.tsx      # Barra de filtros
│   │   ├── GameCard.tsx       # Tarjeta individual de juego
│   │   └── SearchBar.tsx      # Barra de búsqueda con autocompletado
│   ├── layouts/
│   │   └── Layout.astro       # Layout principal
│   ├── pages/
│   │   ├── index.astro        # Página principal
│   │   └── game/
│   │       └── [id].astro     # Página de detalles del juego
│   └── services/
│       └── cheapshark.ts      # Cliente API de CheapShark
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

## 🎯 Uso de la API

La aplicación utiliza la API pública de CheapShark que **no requiere autenticación**. Los endpoints principales utilizados son:

- `GET /deals` - Obtener ofertas con filtros
- `GET /stores` - Listar todas las tiendas
- `GET /games?title={title}` - Buscar juegos por título
- `GET /games?id={id}` - Obtener detalles de un juego específico

## 📝 Scripts Disponibles

```bash
npm run dev       # Inicia servidor de desarrollo
npm run build     # Construye para producción
npm run preview   # Vista previa de la build de producción
```

## 🌟 Características Destacadas

### Búsqueda Inteligente
- Autocompletado mientras escribes
- Resultados instantáneos con imágenes
- Precio más bajo destacado

### Filtros Potentes
- Filtrar por tienda específica
- Ordenar por: mejor oferta, descuento, precio, calificaciones
- Soporte para paginación infinita

### Detalles Completos
- Precio histórico más bajo
- Comparación entre todas las tiendas disponibles
- Enlaces directos para comprar
- Cálculo automático de ahorros

### Diseño Moderno
- Interfaz limpia y atractiva
- Animaciones suaves
- Indicadores visuales de descuentos
- Responsive design completo

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

- [CheapShark](https://www.cheapshark.com/) por proporcionar la API gratuita
- La comunidad de Astro por un framework increíble

---

Desarrollado con ❤️ usando Astro + React + Tailwind CSS
