# Twitch_StreamOrganizer

## **Descripción General de la Extensión**

**Nombre**: Twitch Live Grouper+
**Propósito**: Organiza automáticamente los canales en vivo del panel izquierdo de Twitch por categoría, permitiendo colapsar/expandir secciones y recordando las preferencias del usuario entre sesiones.

---

### **Archivos del Proyecto**

#### 1. **`manifest.json`**

- **Función**: Configuración básica de la extensión para Chrome.
- **Detalles**:
  - Define el nombre, versión e ícono de la extensión.
  - Especifica los permisos necesarios (ej: almacenamiento persistente).
  - Inyecta scripts y estilos **solo en páginas de Twitch**.

---

#### 2. **`content-script.js`**

- **Función**: Lógica principal de la extensión.
- **Responsabilidades**:
  - Detecta y agrupa dinámicamente los canales en vivo por categoría.
  - Gestiona la interacción del usuario (colapsar/expandir secciones).
  - Guarda y recupera el estado de las categorías colapsadas usando `chrome.storage`.
  - Observa cambios en tiempo real en el panel izquierdo de Twitch.

---

#### 3. **`styles.css`**

- **Función**: Estilizado visual de los elementos generados.
- **Aspectos clave**:
  - Diseña los encabezados de categoría y botones interactivos.
  - Define transiciones para animaciones al colapsar/expandir.
  - Mantiene coherencia con la estética de Twitch.

---

#### 4. **`icon.png`**

- **Función**: Identidad visual de la extensión.
- **Características**:
  - Aparece en la Chrome Web Store y la barra de extensiones.
  - Diseño temático (ej: ícono que sugiere "agrupación" o "categorización").

---

### **Flujo de Funcionamiento**

1. **Activación**: La extensión se ejecuta automáticamente al cargar Twitch.
2. **Detección**: Identifica el panel izquierdo y los canales en vivo.
3. **Agrupación**: Clasifica los canales por categoría y reorganiza el DOM.
4. **Persistencia**: Almacena las preferencias de colapso/expansión.
5. **Actualización**: Reacciona a cambios en la lista de canales en tiempo real.

---

### **Dependencias Clave**

- **MutationObserver**: Para detectar cambios dinámicos en la interfaz de Twitch.
- **chrome.storage.sync**: Para guardar preferencias del usuario de forma persistente.
- **Selectores del DOM**: Basados en la estructura HTML de Twitch para ubicar elementos.
