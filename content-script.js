const STORAGE_KEY = "collapsedCategories";
const TOGGLE_ICON = "▼";
const CONTAINER_CLASS = "custom-categories-container";

// Toggle colapsado/expandido
async function toggleCategory(category, isCollapsed) {
  const storage = await chrome.storage.sync.get(STORAGE_KEY);
  const collapsed = new Set(storage[STORAGE_KEY] || []);

  isCollapsed ? collapsed.add(category) : collapsed.delete(category);

  await chrome.storage.sync.set({ [STORAGE_KEY]: [...collapsed] });
  applyCollapsedState();
}

// Crea encabezados interactivos
function createHeader(category, isCollapsed) {
  const header = document.createElement('div');
  header.className = `category-header ${isCollapsed ? 'collapsed' : ''}`;

  header.innerHTML = `
    <button class="toggle-btn">${TOGGLE_ICON}</button>
    <span>${category}</span>
    <span class="counter"></span>
  `;

  header.querySelector('.toggle-btn').onclick = () =>
    toggleCategory(category, !isCollapsed);

  return header;
}

// Aplica estado desde el storage
async function applyCollapsedState() {
  const { [STORAGE_KEY]: collapsed } = await chrome.storage.sync.get(STORAGE_KEY);
  document.querySelectorAll('.category-header').forEach(header => {
    const category = header.querySelector('span').textContent;
    header.classList.toggle('collapsed', collapsed?.includes(category));
  });
}

// Grupo canales con persistencia
async function groupChannels() {
  const { [STORAGE_KEY]: collapsed } = await chrome.storage.sync.get(STORAGE_KEY);
  const container = document.querySelector(CONTAINER_SELECTOR);
  if (!container) return;

  // ... (misma lógica de agrupación previa) ...

  const newContainer = document.createElement('div');
  newContainer.className = CONTAINER_CLASS;

  Object.entries(grouped).forEach(([category, nodes]) => {
    const isCollapsed = collapsed?.includes(category);
    const header = createHeader(category, isCollapsed);
    const wrapper = document.createElement('div');

    wrapper.append(header, ...nodes);
    wrapper.classList.toggle('collapsed-section', isCollapsed);
    newContainer.append(wrapper);
  });

  container.replaceWith(newContainer);
}

// Event delegation para clicks
document.addEventListener('click', e => {
  if (e.target.closest('.toggle-btn')) {
    const header = e.target.closest('.category-header');
    const wrapper = header.parentElement;
    wrapper.classList.toggle('collapsed-section');
  }
});