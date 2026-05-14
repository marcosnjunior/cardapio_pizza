// ----- CATEGORIAS E ITENS (com imagens genéricas) -----
// Utilizamos placeholders realistas com pizza e números aleatórios controlados
// Todas as imagens são genéricas (placehold.co com emoji de pizza + fundo quente)

const generatePizzaImage = (pizzaName) => {
    // Gera uma imagem genérica com texto e cor baseada no nome da pizza
    const encodedName = encodeURIComponent(pizzaName.slice(0, 20));
    // Placehold.co oferece fundo agradável com ícone de pizza
    return `https://placehold.co/400x300/FFB66D/white?text=🍕+${encodedName}`;
};

// Catálogo de pizzas por categoria
const menuData = [
    {
        id: "classicas",
        icon: "🍕",
        title: "Clássicas Italianas",
        items: [
            { name: "Margherita", desc: "Molho de tomate, muçarela de búfala, manjericão fresco e azeite.", price: "R$ 49,90", image: null },
            { name: "Pepperoni", desc: "Molho especial, muçarela, pepperoni defumado e orégano.", price: "R$ 59,90", image: null },
            { name: "Quattro Formaggi", desc: "Muçarela, gorgonzola, parmesão e provolone.", price: "R$ 64,90", image: null },
            { name: "Portuguesa", desc: "Presunto, ovos, cebola, azeitonas e muçarela.", price: "R$ 57,90", image: null }
        ]
    },
    {
        id: "especiais",
        icon: "🔥",
        title: "Especiais do Forno",
        items: [
            { name: "Frango com Catupiry", desc: "Frango desfiado, catupiry original, milho e azeitonas.", price: "R$ 62,90", image: null },
            { name: "Calabresa Premium", desc: "Calabresa fatiada, cebola roxa, muçarela e azeitonas verdes.", price: "R$ 58,90", image: null },
            { name: "Parmegiana", desc: "Molho de tomate, muçarela, parmesão ralado e manjericão.", price: "R$ 67,90", image: null },
            { name: "Camarão ao Limão", desc: "Camarões salteados, limão siciliano, alho-poró e muçarela.", price: "R$ 79,90", image: null }
        ]
    },
    {
        id: "doces",
        icon: "🍫",
        title: "Pizzas Doces",
        items: [
            { name: "Chocolate com Morango", desc: "Chocolate meio amargo, morangos frescos e granulado.", price: "R$ 54,90", image: null },
            { name: "Romeu e Julieta", desc: "Goiabada cremosa e queijo mussarela de minas.", price: "R$ 49,90", image: null },
            { name: "Banoffee", desc: "Doce de leite, banana, creme de baunilha e canela.", price: "R$ 56,90", image: null },
            { name: "Nutella com Morango", desc: "Nutella generosa, morangos e castanhas.", price: "R$ 69,90", image: null }
        ]
    },
    {
        id: "veganas",
        icon: "🌱",
        title: "Veganas & Sem Lactose",
        items: [
            { name: "Vegana Rústica", desc: "Queijo vegano, tomate seco, rúcula e cogumelos.", price: "R$ 62,90", image: null },
            { name: "Berinjela ao Pesto", desc: "Pesto de manjericão, berinjela assada, azeitonas pretas.", price: "R$ 59,90", image: null },
            { name: "Abobrinha com Limão", desc: "Abobrinha grelhada, limão tahiti, hortelã e base de tomate.", price: "R$ 54,90", image: null },
            { name: "Palmito Cremoso", desc: "Palmito pupunha, molho de castanhas e orégano.", price: "R$ 61,90", image: null }
        ]
    }
];

// Função para adicionar imagem genérica a cada item (caso não tenha sido definida)
function fillGenericImages() {
    for (let category of menuData) {
        for (let item of category.items) {
            if (!item.image) {
                // Cria uma imagem personalizada mas genérica baseada no nome da pizza
                item.image = `https://placehold.co/600x400/FAD6A5/5D2E1A?text=🍕+${encodeURIComponent(item.name)}`;
            }
        }
    }
}

// Gera o HTML de cada card de pizza
function createPizzaCard(pizza) {
    return `
        <div class="pizza-card">
            <img class="pizza-img" src="${pizza.image}" alt="${pizza.name}" loading="lazy">
            <div class="pizza-info">
                <div class="pizza-name">
                    <span>${pizza.name}</span>
                    <span class="pizza-price">${pizza.price}</span>
                </div>
                <p class="pizza-desc">${pizza.desc}</p>
                <button class="order-btn" data-name="${pizza.name}" data-price="${pizza.price}">
                    <i class="fas fa-cart-shopping"></i> Pedir agora
                </button>
            </div>
        </div>
    `;
}

// Renderiza todas as categorias e seus respectivos itens no DOM
function renderMenu() {
    const root = document.getElementById('categories-root');
    if (!root) return;
    
    fillGenericImages(); // garante imagens genéricas

    let htmlString = '';
    
    for (let category of menuData) {
        const itemsHtml = category.items.map(item => createPizzaCard(item)).join('');
        
        htmlString += `
            <section class="category-section" data-category="${category.id}">
                <div class="category-header">
                    <div class="category-icon">${category.icon}</div>
                    <h2 class="category-title">${category.title}</h2>
                </div>
                <div class="pizzas-grid">
                    ${itemsHtml}
                </div>
            </section>
        `;
    }
    
    root.innerHTML = htmlString;
    
    // Adiciona eventos aos botões "Pedir agora"
    attachOrderEvents();
}

// Simula adição ao pedido com um pequeno feedback (alerta estilizado)
function attachOrderEvents() {
    const buttons = document.querySelectorAll('.order-btn');
    buttons.forEach(btn => {
        btn.removeEventListener('click', handleOrderClick);
        btn.addEventListener('click', handleOrderClick);
    });
}

function handleOrderClick(event) {
    const button = event.currentTarget;
    const pizzaName = button.getAttribute('data-name');
    const pizzaPrice = button.getAttribute('data-price');
    
    // Pequena notificação interativa (sem ser invasiva)
    const toast = document.createElement('div');
    toast.className = 'order-toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${pizzaName} adicionada! - ${pizzaPrice}`;
    document.body.appendChild(toast);
    
    // Estilo dinâmico do toast (rápido)
    toast.style.position = 'fixed';
    toast.style.bottom = '25px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#2c1a12';
    toast.style.color = '#ffefdb';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '60px';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '0.9rem';
    toast.style.zIndex = '999';
    toast.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
    toast.style.backdropFilter = 'blur(4px)';
    toast.style.fontFamily = "'Inter', sans-serif";
    toast.style.border = '1px solid #f3bc7c';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 400);
    }, 2200);
    
    // Opcional: console para simular pedido
    console.log(`🍕 Pedido simulado: ${pizzaName} - ${pizzaPrice}`);
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});