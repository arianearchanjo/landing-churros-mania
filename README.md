# 🍩 Churros Mania — Site de Delivery

Site institucional e de pedidos online para a **Churros Mania**, uma confeitaria artesanal de delivery localizada em Campina Grande do Sul (PR). Desenvolvido como projeto freelance.

## 🔗 Deploy

> **Live:** [churrosmania.netlify.app](https://churrosmania.netlify.app/) *(atualize com o link real após o deploy)*

---

## ✨ Funcionalidades

- **Cardápio interativo** com 4 categorias: Tradicionais, Gourmet, Gourmet Especial e Premium
- **Carrinho de pedidos** com painel lateral deslizante
- **Seleção de confeito por unidade** — cada churro pode ter um confeito diferente (Granulado, Amendoim, Chocoball, Confete ou Coco Ralado)
- **Envio do pedido via WhatsApp** com mensagem formatada automaticamente (itens, confeitos, total e endereço)
- **Navegação responsiva** com menu hambúrguer para mobile
- **Scroll spy** — link ativo no menu conforme a seção visível
- **Animações reveal** ao rolar a página (IntersectionObserver)
- Header com efeito de transparência ao scroll

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 puro (variáveis, Flexbox, Grid, animações) |
| Lógica | JavaScript vanilla (ES6+) |
| Ícones | [Bootstrap Icons 1.11](https://icons.getbootstrap.com/) via CDN |
| Fontes | [Fredoka One + Quicksand](https://fonts.google.com/) via Google Fonts |
| Deploy | Netlify (static hosting) |

> Sem frameworks, sem dependências de build. Apenas HTML, CSS e JS.

---

## 📁 Estrutura de Arquivos

```
churros-mania/
├── index.html      # Estrutura e conteúdo da página
├── style.css       # Todos os estilos e responsividade
├── script.js       # Carrinho, WhatsApp, navegação e animações
└── logo.jpg        # Logotipo da marca
```

---

## 🚀 Como rodar localmente

Sem necessidade de instalar nada. Basta clonar e abrir:

```bash
git clone https://github.com/seu-usuario/churros-mania.git
cd churros-mania
# Abra o index.html no navegador
```

> **Dica:** Use a extensão **Live Server** no VS Code para evitar problemas com carregamento de arquivos locais.

---

## 📦 Deploy no Netlify

1. Faça push do repositório para o GitHub
2. Acesse [netlify.com](https://netlify.com) e clique em **Add new site → Import an existing project**
3. Conecte ao repositório no GitHub
4. Configurações de build: deixe em branco (site estático)
5. Clique em **Deploy site**

O Netlify detecta automaticamente que é um site estático e publica sem nenhuma configuração adicional.

---

## ⚙️ Configuração do WhatsApp

O número de WhatsApp para recebimento dos pedidos está definido no topo do `script.js`:

```js
const WHATSAPP = '554184241052';
```

Para alterar, basta trocar pelo número desejado no formato `DDI + DDD + número` (sem espaços ou símbolos).

---

## 📱 Responsividade

O layout foi desenvolvido **mobile-first** e testado nas seguintes larguras:

- 📱 Mobile: até 480px
- 📟 Tablet: 481px – 768px
- 🖥️ Desktop: 769px+

---

## 📄 Licença

Projeto desenvolvido sob encomenda. Todos os direitos reservados ao cliente **Churros Mania**.
