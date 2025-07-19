
const products = [
  { title: "Adidas", price: "19 990₸", img: "adidas1-removebg-preview.png", cat: "men" },
  { title: "Nike Women", price: "25 000₸", img: "nike-women.png", cat: "women" },
  { title: "Kids Puma", price: "15 000₸", img: "puma-kids.png", cat: "kids" }
];

const productGrid = document.querySelector('.product-grid');
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-img');
const modalTitle = document.querySelector('.modal-title');
const modalPrice = document.querySelector('.modal-price');
const modalSize = document.querySelector('.modal-size');
const modalWhatsapp = document.querySelector('.modal-whatsapp');

function renderProducts(category) {
  productGrid.innerHTML = '';
  products.filter(p => p.cat === category).forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = \`
      <img src="\${product.img}" alt="\${product.title}" loading="lazy"/>
      <h3>\${product.title}</h3>
      <p>\${product.price}</p>
    \`;
    div.addEventListener('click', () => openModal(product));
    productGrid.appendChild(div);
  });
}

function openModal(product) {
  document.body.style.overflow = 'hidden';
  modalImg.src = product.img;
  modalTitle.textContent = product.title;
  modalPrice.textContent = product.price;
  modalWhatsapp.href = \`https://wa.me/77001234567?text=Сәлеметсіз бе! Мен \${product.title} (\${modalSize.value}) алғым келеді.\`;
  modalOverlay.classList.remove('hidden');
  modal.focus();
}

function closeModal() {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    const cat = tab.dataset.cat;
    renderProducts(cat);
  });
});

document.querySelector('.close-modal').addEventListener('click', closeModal);
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Инициализация
renderProducts('men');
