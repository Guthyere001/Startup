// Data
const professionals = [
  {
    name: "Dr. Ana Silva",
    specialty: "Nutricionista",
    experience: "8 anos",
    rating: 4.9,
    description: "Especialista em nutrição esportiva e emagrecimento saudável",
  },
  {
    name: "Carlos Santos",
    specialty: "Treinador de Futebol/Futsal",
    experience: "12 anos",
    rating: 4.8,
    description: "Ex-jogador profissional, especialista em técnica e tática",
  },
  {
    name: "Marina Costa",
    specialty: "Treinadora de Vôlei",
    experience: "6 anos",
    rating: 4.9,
    description: "Campeã estadual, foco em fundamentos e estratégia",
  },
  {
    name: "Roberto Lima",
    specialty: "Treinador de Basquete",
    experience: "10 anos",
    rating: 4.7,
    description: "Especialista em desenvolvimento de jovens talentos",
  },
  {
    name: "Juliana Ferreira",
    specialty: "Treinadora de Handebol",
    experience: "7 anos",
    rating: 4.8,
    description: "Técnica certificada, foco em condicionamento físico",
  },
]

const exercises = {
  Bíceps: ["Rosca Direta com Barra", "Rosca Scott", "Rosca Martelo", "Rosca Concentrada", "Rosca 21"],
  Tríceps: ["Tríceps Pulley", "Tríceps Testa", "Mergulho em Paralelas", "Tríceps Coice", "Rosca Francesa"],
  Peito: ["Supino Reto", "Supino Inclinado", "Crucifixo", "Flexão de Braço", "Peck Deck"],
  Costas: ["Puxada Frontal", "Remada Curvada", "Pullover", "Remada Unilateral", "Levantamento Terra"],
  Pernas: ["Agachamento", "Leg Press", "Extensão de Pernas", "Flexão de Pernas", "Panturrilha em Pé"],
  Ombros: ["Desenvolvimento com Halteres", "Elevação Lateral", "Elevação Frontal", "Remada Alta", "Encolhimento"],
}

// AI Responses (simuladas)
const aiResponses = {
  exercicio:
    "Para exercícios eficazes, recomendo começar com 3 séries de 8-12 repetições. Sempre mantenha a forma correta e progrida gradualmente!",
  nutricao:
    "Uma alimentação balanceada deve incluir proteínas, carboidratos complexos e gorduras saudáveis. Beba bastante água e evite alimentos ultraprocessados.",
  treino:
    "Um bom treino deve incluir aquecimento, exercícios principais e alongamento. Descanse adequadamente entre os treinos para permitir a recuperação muscular.",
  peso: "Para ganhar massa muscular, combine treino de força com alimentação rica em proteínas. Para perder peso, crie um déficit calórico com exercícios e dieta balanceada.",
  default:
    "Ótima pergunta! Para te ajudar melhor, posso dar dicas sobre exercícios, nutrição, treinos ou objetivos específicos. O que você gostaria de saber?",
}

// Navigation
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn")
  const sections = document.querySelectorAll(".section")
  const heroButtons = document.querySelectorAll("[data-section]")

  // Navigation functionality
  function showSection(sectionId) {
    sections.forEach((section) => section.classList.remove("active"))
    navButtons.forEach((btn) => btn.classList.remove("active"))

    document.getElementById(sectionId).classList.add("active")
    document.querySelector(`[data-section="${sectionId}"]`).classList.add("active")
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.getAttribute("data-section")
      showSection(sectionId)
    })
  })

  heroButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.getAttribute("data-section")
      showSection(sectionId)
    })
  })

  // Load professionals
  loadProfessionals()

  // Load exercises
  loadExercises()

  // Setup chat
  setupChat()
})

// Load Professionals
function loadProfessionals() {
  const grid = document.getElementById("professionalsGrid")

  professionals.forEach((professional) => {
    const card = document.createElement("div")
    card.className = "professional-card"

    card.innerHTML = `
            <div class="professional-header">
                <div>
                    <div class="professional-name">${professional.name}</div>
                    <div class="specialty-badge">${professional.specialty}</div>
                </div>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${professional.rating}</span>
                </div>
            </div>
            <div class="professional-description">${professional.description}</div>
            <div class="experience">
                <i class="fas fa-trophy"></i>
                ${professional.experience} de experiência
            </div>
            <button class="btn contact-btn">Entrar em Contato</button>
        `

    grid.appendChild(card)
  })
}

// Load Exercises
function loadExercises() {
  const grid = document.getElementById("exercisesGrid")

  Object.entries(exercises).forEach(([muscle, exerciseList]) => {
    const card = document.createElement("div")
    card.className = "exercise-card"

    const exerciseItems = exerciseList.map((exercise) => `<div class="exercise-item">${exercise}</div>`).join("")

    card.innerHTML = `
            <div class="exercise-header">
                <i class="fas fa-dumbbell"></i>
                <h3>${muscle}</h3>
            </div>
            <div class="exercise-list">
                ${exerciseItems}
            </div>
        `

    grid.appendChild(card)
  })
}

// Chat Setup
function setupChat() {
  const chatInput = document.getElementById("chatInput")
  const sendBtn = document.getElementById("sendBtn")
  const chatMessages = document.getElementById("chatMessages")

  function sendMessage() {
    const message = chatInput.value.trim()
    if (!message) return

    // Add user message
    addMessage(message, "user")
    chatInput.value = ""

    // Show typing indicator
    showTypingIndicator()

    // Simulate AI response
    setTimeout(() => {
      hideTypingIndicator()
      const response = getAIResponse(message)
      addMessage(response, "ai")
    }, 1500)
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}`

    const contentDiv = document.createElement("div")
    contentDiv.className = "message-content"
    contentDiv.textContent = text

    messageDiv.appendChild(contentDiv)
    chatMessages.appendChild(messageDiv)

    // Remove welcome message if it exists
    const welcome = chatMessages.querySelector(".chat-welcome")
    if (welcome) {
      welcome.remove()
    }

    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement("div")
    typingDiv.className = "message ai typing-message"
    typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `
    chatMessages.appendChild(typingDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  function hideTypingIndicator() {
    const typingMessage = chatMessages.querySelector(".typing-message")
    if (typingMessage) {
      typingMessage.remove()
    }
  }

  function getAIResponse(message) {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("exercicio") || lowerMessage.includes("treino") || lowerMessage.includes("musculacao")) {
      return aiResponses.exercicio
    } else if (
      lowerMessage.includes("nutricao") ||
      lowerMessage.includes("dieta") ||
      lowerMessage.includes("alimentacao")
    ) {
      return aiResponses.nutricao
    } else if (lowerMessage.includes("treino") || lowerMessage.includes("rotina")) {
      return aiResponses.treino
    } else if (lowerMessage.includes("peso") || lowerMessage.includes("emagrecer") || lowerMessage.includes("massa")) {
      return aiResponses.peso
    } else {
      return aiResponses.default
    }
  }

  sendBtn.addEventListener("click", sendMessage)

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })
}

// Contact button functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("contact-btn")) {
    alert("Funcionalidade de contato será implementada em breve!")
  }
})

// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Exercise tabs functionality
const tabButtons = document.querySelectorAll(".tab-btn")
const exerciseGroups = document.querySelectorAll(".exercise-group")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-target")

    // Remove active class from all tabs and groups
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    exerciseGroups.forEach((group) => group.classList.remove("active"))

    // Add active class to clicked tab and corresponding group
    button.classList.add("active")
    document.getElementById(target).classList.add("active")
  })
})

// Store filtering functionality
const filterButtons = document.querySelectorAll(".filter-btn")
const productCards = document.querySelectorAll(".product-card")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category")

    // Remove active class from all filter buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Show/hide products based on category
    productCards.forEach((card) => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.classList.remove("hidden")
        card.style.display = "block"
      } else {
        card.classList.add("hidden")
        card.style.display = "none"
      }
    })
  })
})

// Shopping cart functionality
let cart = []
let cartTotal = 0

const cartBtn = document.getElementById("cart-btn")
const cartSidebar = document.getElementById("cart")
const closeCartBtn = document.getElementById("close-cart")
const cartItems = document.getElementById("cart-items")
const cartCount = document.getElementById("cart-count")
const cartTotalElement = document.getElementById("cart-total")
const addToCartButtons = document.querySelectorAll(".add-to-cart")

// Add to cart functionality
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.getAttribute("data-product")
    const price = Number.parseFloat(button.getAttribute("data-price"))

    addToCart(product, price)
    updateCartDisplay()

    // Show feedback
    const originalText = button.innerHTML
    button.innerHTML = '<i class="fas fa-check"></i> Adicionado!'
    button.style.background = "#27ae60"

    setTimeout(() => {
      button.innerHTML = originalText
      button.style.background = "#e74c3c"
    }, 1500)
  })
})

function addToCart(product, price) {
  const existingItem = cart.find((item) => item.product === product)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      product: product,
      price: price,
      quantity: 1,
    })
  }

  cartTotal += price
}

function removeFromCart(index) {
  const item = cart[index]
  cartTotal -= item.price * item.quantity
  cart.splice(index, 1)
  updateCartDisplay()
}

function updateCartDisplay() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems

  // Update cart total
  cartTotalElement.textContent = cartTotal.toFixed(2).replace(".", ",")

  // Update cart items
  cartItems.innerHTML = ""

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Carrinho vazio</p>'
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.product}</h4>
          <p>Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}</p>
        </div>
        <button class="remove-item" onclick="removeFromCart(${index})">
          <i class="fas fa-trash"></i>
        </button>
      `
      cartItems.appendChild(cartItem)
    })
  }
}

// Cart sidebar toggle
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("open")
})

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("open")
})

// Close cart when clicking outside
document.addEventListener("click", (e) => {
  if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
    cartSidebar.classList.remove("open")
  }
})

// Checkout functionality
document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!")
    return
  }

  alert(
    `Pedido realizado com sucesso!\nTotal: R$ ${cartTotal.toFixed(2).replace(".", ",")}\n\nObrigado pela preferência!`,
  )

  // Clear cart
  cart = []
  cartTotal = 0
  updateCartDisplay()
  cartSidebar.classList.remove("open")
})

// Contact form functionality
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const name = e.target.querySelector('input[type="text"]').value
  const email = e.target.querySelector('input[type="email"]').value
  const message = e.target.querySelector("textarea").value

  if (name && email && message) {
    // Show success message
    const successDiv = document.createElement("div")
    successDiv.className = "success-message"
    successDiv.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve."

    e.target.appendChild(successDiv)
    e.target.reset()

    // Remove success message after 5 seconds
    setTimeout(() => {
      successDiv.remove()
    }, 5000)
  } else {
    // Show error message
    const errorDiv = document.createElement("div")
    errorDiv.className = "error-message"
    errorDiv.textContent = "Por favor, preencha todos os campos."

    e.target.appendChild(errorDiv)

    // Remove error message after 5 seconds
    setTimeout(() => {
      errorDiv.remove()
    }, 5000)
  }
})

// Professional contact functionality
function contactProfessional(professionalName) {
  alert(
    `Agendamento solicitado com ${professionalName}.\n\nEntraremos em contato para confirmar o horário!\n\nTelefone: (11) 9999-9999\nEmail: contato@fitlife.com.br`,
  )
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-slide-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".professional-card, .exercise-item, .product-card").forEach((el) => {
  observer.observe(el)
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "#ffffff"
    header.style.backdropFilter = "none"
  }
})

// Initialize cart display
updateCartDisplay()

// Add hover effects to buttons
document.querySelectorAll(".cta-button, .contact-btn, .add-to-cart").forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.05)"
  })

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)"
  })
})

// Loading animation for the page
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // Close cart with Escape key
  if (e.key === "Escape" && cartSidebar.classList.contains("open")) {
    cartSidebar.classList.remove("open")
  }

  // Close mobile menu with Escape key
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }
})

// Add to favorites functionality (localStorage)
function addToFavorites(productName) {
  const favorites = JSON.parse(localStorage.getItem("fitlife-favorites")) || []

  if (!favorites.includes(productName)) {
    favorites.push(productName)
    localStorage.setItem("fitlife-favorites", JSON.stringify(favorites))

    // Show notification
    const notification = document.createElement("div")
    notification.className = "success-message"
    notification.textContent = `${productName} adicionado aos favoritos!`
    notification.style.position = "fixed"
    notification.style.top = "100px"
    notification.style.right = "20px"
    notification.style.zIndex = "9999"
    notification.style.maxWidth = "300px"

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }
}

// Newsletter subscription
function subscribeNewsletter(email) {
  if (email && email.includes("@")) {
    // Simulate API call
    setTimeout(() => {
      alert("Obrigado por se inscrever em nossa newsletter!")
    }, 500)
  } else {
    alert("Por favor, insira um email válido.")
  }
}

// Search functionality
function searchProducts(query) {
  const products = document.querySelectorAll(".product-card")
  const searchTerm = query.toLowerCase()

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase()
    const productDescription = product.querySelector(".product-description").textContent.toLowerCase()

    if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
      product.style.display = "block"
    } else {
      product.style.display = "none"
    }
  })
}

// Price filter
function filterByPrice(minPrice, maxPrice) {
  const products = document.querySelectorAll(".product-card")

  products.forEach((product) => {
    const priceText = product.querySelector(".product-price").textContent
    const price = Number.parseFloat(priceText.replace("R$ ", "").replace(",", "."))

    if (price >= minPrice && price <= maxPrice) {
      product.style.display = "block"
    } else {
      product.style.display = "none"
    }
  })
}

// Initialize tooltips
function initTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]")

  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", (e) => {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = e.target.getAttribute("data-tooltip")
      tooltip.style.position = "absolute"
      tooltip.style.background = "#333"
      tooltip.style.color = "#fff"
      tooltip.style.padding = "5px 10px"
      tooltip.style.borderRadius = "5px"
      tooltip.style.fontSize = "12px"
      tooltip.style.zIndex = "9999"
      tooltip.style.pointerEvents = "none"

      document.body.appendChild(tooltip)

      const rect = e.target.getBoundingClientRect()
      tooltip.style.left = rect.left + "px"
      tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + "px"

      element.tooltip = tooltip
    })

    element.addEventListener("mouseleave", (e) => {
      if (e.target.tooltip) {
        e.target.tooltip.remove()
        delete e.target.tooltip
      }
    })
  })
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTooltips()
  updateCartDisplay()

  // Add some interactive features
  console.log("FitLife website loaded successfully!")

  // Performance monitoring
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      console.log(`Page load time: ${loadTime}ms`)
    })
  }
})
