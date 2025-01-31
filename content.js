// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar el panel izquierdo
  const leftPanel = document.querySelector(".side-bar-contents"); // Ajustar al selector real
  if (!leftPanel) return;

  // Obtener los canales en directo
  const channels = [...leftPanel.querySelectorAll(".channel-item-selector")]; // Ajustar al selector real

  // Agrupar canales por categoría
  const categories = {};
  channels.forEach(channel => {
    const category = channel.querySelector(".category-selector")?.textContent || "Sin categoría";
    if (!categories[category]) categories[category] = [];
    categories[category].push(channel);
  });

  // Limpiar el panel y agrupar los canales
  leftPanel.innerHTML = ""; // Vaciar el panel
  Object.entries(categories).forEach(([category, channels]) => {
    // Crear encabezado de categoría
    const categoryHeader = document.createElement("div");
    categoryHeader.className = "category-header";
    categoryHeader.textContent = category;
    leftPanel.appendChild(categoryHeader);

    // Añadir los canales de la categoría
    channels.forEach(channel => leftPanel.appendChild(channel));
  });
});
