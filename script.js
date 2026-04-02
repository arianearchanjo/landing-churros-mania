/* =============================================
   CHURROS MANIA — script.js v5
   - Cada unidade é um item individual com confeito próprio
   - Envio do pedido completo via WhatsApp
   - Menu mobile, scroll ativo, reveal animations
   ============================================= */

const WHATSAPP = '554184241052';
const CONFEITOS = ['Granulado', 'Amendoim', 'Chocoball', 'Confete', 'Coco Ralado'];

// Carrinho: array de { id, nome, preco, confeito }
// Cada unidade = um item separado
let carrinho = [];
let nextId = 1;

// =============================================
// CARRINHO
// =============================================
function toggleCart() {
  const panel   = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  const isOpen  = panel.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function adicionarAoCarrinho(btn) {
  const card  = btn.closest('.card');
  const nome        = card.dataset.nome;
  const preco       = parseInt(card.dataset.preco, 10);
  const semConfeito = card.dataset.semConfeito === 'true';

  // Adiciona uma unidade nova com id único
  carrinho.push({ id: nextId++, nome, preco, confeito: '', semConfeito });

  const original = btn.innerHTML;
  btn.classList.add('added');
  btn.innerHTML = '<i class="bi bi-check-lg"></i> Adicionado!';
  setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = original; }, 1500);

  renderizarCarrinho();
  atualizarContadores();
  animarFab();
}

function removerItem(id) {
  carrinho = carrinho.filter(i => i.id !== id);
  renderizarCarrinho();
  atualizarContadores();
}

function definirConfeito(id, valor, btn) {
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.confeito = valor;
  const pills = btn.closest('.confeito-pills').querySelectorAll('.confeito-pill');
  pills.forEach(p => p.classList.remove('ativo'));
  btn.classList.add('ativo');
}

function limparCarrinho() {
  carrinho = [];
  renderizarCarrinho();
  atualizarContadores();
}

function renderizarCarrinho() {
  const list   = document.getElementById('cartList');
  const empty  = document.getElementById('cartEmpty');
  const footer = document.getElementById('cartFooter');
  const total  = document.getElementById('cartTotal');

  list.innerHTML = '';

  if (carrinho.length === 0) {
    empty.style.display  = 'block';
    footer.style.display = 'none';
    return;
  }

  empty.style.display  = 'none';
  footer.style.display = 'flex';

  // Agrupa visualmente por nome para mostrar subtotal
  // mas cada unidade mantém seu próprio confeito
  let soma = 0;

  // Renderiza cada unidade individualmente
  carrinho.forEach((item, idx) => {
    soma += item.preco;

    // Número da unidade entre itens do mesmo sabor
    const mesmosAntes = carrinho.slice(0, idx).filter(i => i.nome === item.nome).length;
    const total_mesmo = carrinho.filter(i => i.nome === item.nome).length;
    const labelNumero = total_mesmo > 1 ? ` <span class="cart-item__unit">#${mesmosAntes + 1}</span>` : '';

    const pillsHTML = ['', ...CONFEITOS].map(c => {
      const label     = c === '' ? 'Sem confeito' : c;
      const ativo     = item.confeito === c ? 'ativo' : '';
      const noneClass = c === '' ? 'confeito-pill--none' : '';
      return `<button class="confeito-pill ${noneClass} ${ativo}" onclick="definirConfeito(${item.id}, '${c}', this)">${label}</button>`;
    }).join('');

    const confeitoHTML = item.semConfeito ? `
      <div class="cart-item__confeito cart-item__confeito--none">
        <div class="cart-item__confeito-label"><i class="bi bi-info-circle"></i> Sem opção de confeito para este sabor</div>
      </div>` : `
      <div class="cart-item__confeito">
        <div class="cart-item__confeito-label"><i class="bi bi-magic"></i> Confeito</div>
        <div class="confeito-pills">${pillsHTML}</div>
      </div>`;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.itemId = item.id;
    li.innerHTML = `
      <div class="cart-item__top">
        <div class="cart-item__icon"><i class="bi bi-bag-fill"></i></div>
        <div class="cart-item__info">
          <div class="cart-item__name">${item.nome}${labelNumero}</div>
          <div class="cart-item__price">R$ ${item.preco},00</div>
        </div>
        <button class="cart-item__remove" onclick="removerItem(${item.id})" title="Remover">
          <i class="bi bi-x"></i>
        </button>
      </div>
      ${confeitoHTML}
    `;
    list.appendChild(li);
  });

  total.textContent = `R$ ${soma},00`;
}

function atualizarContadores() {
  const qtd         = carrinho.length;
  const fab         = document.getElementById('cartCount');
  const headerCount = document.getElementById('headerCartCount');
  fab.textContent            = qtd;
  headerCount.textContent    = qtd;
  headerCount.style.display  = qtd > 0 ? 'inline-flex' : 'none';
}

function animarFab() {
  const count = document.getElementById('cartCount');
  count.classList.remove('bump');
  void count.offsetWidth;
  count.classList.add('bump');
}

// =============================================
// WHATSAPP
// =============================================
function enviarPedido() {
  if (carrinho.length === 0) return;

  const soma     = carrinho.reduce((s, i) => s + i.preco, 0);
  const endereco = (document.getElementById('inputEndereco')?.value || '').trim();

  // Agrupa para mensagem legível: nome → lista de confeitos
  const grupos = {};
  carrinho.forEach(item => {
    if (!grupos[item.nome]) grupos[item.nome] = { preco: item.preco, confeitos: [] };
    grupos[item.nome].confeitos.push(item.confeito || 'Sem confeito');
  });

  let msg = `*NOVO PEDIDO — CHURROS MANIA*\n\n`;
  
  msg += `*ITENS:* \n`;
  Object.entries(grupos).forEach(([nome, g]) => {
    const qty = g.confeitos.length;
    const valorTotalItem = g.preco * qty;
    msg += `- *${qty}x ${nome}* (R$ ${valorTotalItem},00)\n`;
    msg += `  Confeitos: ${g.confeitos.join(', ')}\n\n`;
  });

  msg += `*TOTAL DOS PRODUTOS:* R$ ${soma},00\n`;
  msg += `*(O valor do frete será calculado abaixo)*\n\n`;

  msg += `*ENDEREÇO DE ENTREGA:* \n`;
  msg += `${endereco || 'Não informado (combinar no chat)'}\n\n`;

  msg += `Pode confirmar a disponibilidade e o valor do frete?`;

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// =============================================
// NAVEGAÇÃO
// =============================================
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');
const header    = document.querySelector('.header');
const navLinks  = document.querySelectorAll('.nav__link');

hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

navLinks.forEach(l => l.addEventListener('click', () => {
  nav.classList.remove('open');
  hamburger.classList.remove('open');
}));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
});

function updateActiveLink() {
  const y = window.scrollY + 100;
  document.querySelectorAll('section[id], header[id]').forEach(sec => {
    if (y >= sec.offsetTop) {
      navLinks.forEach(l => l.classList.toggle(
        'active', l.getAttribute('href') === `#${sec.id}`
      ));
    }
  });
}

// =============================================
// REVEAL ON SCROLL
// =============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// =============================================
// CARDÁPIO — Toggle
// =============================================
function toggleCardapio() {
  const conteudo = document.getElementById('cardapioConteudo');
  const txt      = document.getElementById('btnVerCardapioTxt');
  const icon     = document.getElementById('btnVerCardapioIcon');
  const aberto   = conteudo.classList.toggle('aberto');

  txt.textContent = aberto ? 'Fechar Cardápio' : 'Ver Cardápio';
  icon.className  = aberto ? 'bi bi-x-lg' : 'bi bi-list-ul';

  if (aberto) {
    setTimeout(() => {
      document.getElementById('cardapio').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

function abrirCardapio() {
  const conteudo = document.getElementById('cardapioConteudo');
  if (!conteudo.classList.contains('aberto')) toggleCardapio();
}
