// Enhanced Products Page with Professional Features
class ProductsManager {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.currentCategory = 'all';
    this.searchTerm = '';
    this.isLoading = false;
    
    this.init();
  }

  async init() {
    await this.loadProducts();
    this.setupEventListeners();
    this.renderCategoryFilters();
    this.renderProducts();
    this.setupIntersectionObserver();
  }

  async loadProducts() {
    this.showLoading(true);
    
    try {
      // Simulate API call with enhanced product data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.products = [
        // رواد الأعمال - Entrepreneurs
        {
          id: 1,
          name: "خلطة الكبسة الملكية",
          category: "entrepreneurs",
          subCategory: "rice-dishes",
          image: "images/product1.jpeg",
          description: "خلطة فاخرة للكبسة بنكهة أصيلة ومميزة",
          features: ["طبيعية 100%", "خالية من المواد الحافظة", "تكفي 8 أشخاص"],
          rating: 4.9,
          reviews: 156,
          popular: true
        },
        {
          id: 2,
          name: "بهارات الفاهيتا المكسيكية",
          category: "entrepreneurs",
          subCategory: "international",
          image: "images/product2.jpg",
          description: "نكهة مكسيكية أصيلة لأطباق الفاهيتا المميزة",
          features: ["حار متوسط", "مزيج 12 نوع بهارات", "للمحترفين"],
          rating: 4.8,
          reviews: 89,
          popular: false
        },
        {
          id: 3,
          name: "تتبيلة السمك الفاخرة",
          category: "entrepreneurs",
          subCategory: "seafood",
          image: "images/product3.jpg",
          description: "تتبيلة مخصصة للمأكولات البحرية بنكهة استثنائية",
          features: ["للأسماك والجمبري", "نكهة البحر المتوسط", "سريعة التتبيل"],
          rating: 4.7,
          reviews: 67,
          popular: true
        },
        {
          id: 4,
          name: "خلطة الشاورما التركية",
          category: "entrepreneurs",
          subCategory: "meat-dishes",
          image: "images/product1.jpeg",
          description: "خلطة أصيلة للشاورما بالطريقة التركية التقليدية",
          features: ["وصفة تركية أصيلة", "للحم والدجاج", "نكهة غنية"],
          rating: 4.9,
          reviews: 203,
          popular: true
        },
        {
          id: 5,
          name: "بهارات الكاري الهندي",
          category: "entrepreneurs",
          subCategory: "international",
          image: "images/product2.jpg",
          description: "مزيج بهارات الكاري الهندي الأصيل بنكهة متوازنة",
          features: ["وصفة هندية تقليدية", "حار خفيف", "غني بالكركم"],
          rating: 4.6,
          reviews: 94,
          popular: false
        },

        // ست البيت - Housewives
        {
          id: 6,
          name: "بهارات الطبخ اليومي",
          category: "housewives",
          subCategory: "daily-cooking",
          image: "images/product3.jpg",
          description: "خلطة متوازنة للاستخدام اليومي في جميع الأطباق",
          features: ["متعددة الاستخدامات", "اقتصادية", "نكهة معتدلة"],
          rating: 4.8,
          reviews: 312,
          popular: true
        },
        {
          id: 7,
          name: "خلطة الملوخية الشامية",
          category: "housewives",
          subCategory: "traditional",
          image: "images/product1.jpeg",
          description: "خلطة تقليدية للملوخية بالطريقة الشامية الأصيلة",
          features: ["وصفة شامية أصيلة", "سهلة التحضير", "نكهة منزلية"],
          rating: 4.7,
          reviews: 128,
          popular: false
        },
        {
          id: 8,
          name: "بهارات الشوربات",
          category: "housewives",
          subCategory: "soups",
          image: "images/product2.jpg",
          description: "مزيج مثالي لجميع أنواع الشوربات والحساء",
          features: ["لجميع الشوربات", "دافئة ومريحة", "غنية بالفيتامينات"],
          rating: 4.5,
          reviews: 87,
          popular: false
        },
        {
          id: 9,
          name: "خلطة الأرز البخاري",
          category: "housewives",
          subCategory: "rice-dishes",
          image: "images/product3.jpg",
          description: "خلطة خاصة للأرز البخاري بنكهة أصيلة ولذيذة",
          features: ["للأرز البخاري", "نكهة غنية", "سهلة الاستخدام"],
          rating: 4.9,
          reviews: 245,
          popular: true
        },
        {
          id: 10,
          name: "بهارات الخضار المشوية",
          category: "housewives",
          subCategory: "vegetables",
          image: "images/product1.jpeg",
          description: "مزيج مثالي لشوي وطبخ جميع أنواع الخضروات",
          features: ["للخضروات المشوية", "صحية ولذيذة", "غنية بالأعشاب"],
          rating: 4.4,
          reviews: 76,
          popular: false
        }
      ];
      
      this.filteredProducts = [...this.products];
      
    } catch (error) {
      console.error('Error loading products:', error);
      this.showError('حدث خطأ في تحميل المنتجات');
    } finally {
      this.showLoading(false);
    }
  }

  setupEventListeners() {
    // Search functionality
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
      let searchTimeout;
      searchBox.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.searchTerm = e.target.value.toLowerCase().trim();
          this.filterProducts();
        }, 300);
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchBox?.focus();
      }
    });
  }

  renderCategoryFilters() {
    const filtersContainer = document.getElementById('categoryFilters');
    if (!filtersContainer) return;

    const categories = [
      { id: 'all', name: 'جميع المنتجات', count: this.products.length },
      { id: 'entrepreneurs', name: 'رواد الأعمال', count: this.products.filter(p => p.category === 'entrepreneurs').length },
      { id: 'housewives', name: 'ست البيت', count: this.products.filter(p => p.category === 'housewives').length }
    ];

    filtersContainer.innerHTML = categories.map(category => `
      <button 
        class="category-button ${category.id === this.currentCategory ? 'active' : ''}"
        data-category="${category.id}"
        aria-label="تصفية حسب ${category.name}"
      >
        ${category.name} (${category.count})
      </button>
    `).join('');

    // Add event listeners
    filtersContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('category-button')) {
        this.currentCategory = e.target.dataset.category;
        this.updateActiveFilter(e.target);
        this.filterProducts();
      }
    });
  }

  updateActiveFilter(activeButton) {
    document.querySelectorAll('.category-button').forEach(btn => {
      btn.classList.remove('active');
    });
    activeButton.classList.add('active');
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.currentCategory === 'all' || product.category === this.currentCategory;
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm) ||
        product.description.toLowerCase().includes(this.searchTerm) ||
        product.features.some(feature => feature.toLowerCase().includes(this.searchTerm));
      
      return matchesCategory && matchesSearch;
    });

    this.renderProducts();
    this.updateResultsCount();
  }

  renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    if (this.filteredProducts.length === 0) {
      container.innerHTML = this.renderEmptyState();
      return;
    }

    // Group products by category
    const groupedProducts = this.groupProductsByCategory();
    
    container.innerHTML = Object.entries(groupedProducts).map(([category, products]) => {
      const categoryName = this.getCategoryName(category);
      const subGroups = this.groupProductsBySubCategory(products);
      
      return `
        <div class="product-category" data-category="${category}">
          <h2>${categoryName}</h2>
          ${Object.entries(subGroups).map(([subCategory, subProducts]) => {
            const subCategoryName = this.getSubCategoryName(subCategory);
            return `
              <div class="sub-category">
                <h3 class="sub-category-title">${subCategoryName}</h3>
                <div class="product-grid">
                  ${subProducts.map(product => this.renderProductCard(product)).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }).join('');

    // Add stagger animation
    this.animateProductCards();
  }

  groupProductsByCategory() {
    return this.filteredProducts.reduce((groups, product) => {
      const category = product.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
      return groups;
    }, {});
  }

  groupProductsBySubCategory(products) {
    return products.reduce((groups, product) => {
      const subCategory = product.subCategory;
      if (!groups[subCategory]) {
        groups[subCategory] = [];
      }
      groups[subCategory].push(product);
      return groups;
    }, {});
  }

  renderProductCard(product) {
    const popularBadge = product.popular ? '<div class="popular-badge">الأكثر مبيعاً</div>' : '';
    const stars = this.renderStars(product.rating);
    
    return `
      <div class="product-card" data-product-id="${product.id}">
        ${popularBadge}
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-overlay">
            <button class="quick-view-btn" data-product-id="${product.id}">
              <i class="fas fa-eye"></i>
              عرض سريع
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-features">
            ${product.features.slice(0, 2).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
          </div>
          <div class="product-rating">
            ${stars}
            <span class="rating-text">${product.rating} (${product.reviews} تقييم)</span>
          </div>
          <div class="product-actions">
            <button class="btn-primary add-to-cart" data-product-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
              أضف للسلة
            </button>
            <button class="btn-secondary wishlist-btn" data-product-id="${product.id}">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `
      <div class="stars">
        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
        ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
      </div>
    `;
  }

  renderEmptyState() {
    return `
      <div class="empty-state">
        <div class="empty-state-content">
          <i class="fas fa-search empty-state-icon"></i>
          <h3>لم يتم العثور على منتجات</h3>
          <p>جرب البحث بكلمات مختلفة أو تصفح جميع المنتجات</p>
          <button class="btn-primary" onclick="productsManager.clearFilters()">
            عرض جميع المنتجات
          </button>
        </div>
      </div>
    `;
  }

  getCategoryName(category) {
    const names = {
      'entrepreneurs': 'رواد الأعمال',
      'housewives': 'ست البيت'
    };
    return names[category] || category;
  }

  getSubCategoryName(subCategory) {
    const names = {
      'rice-dishes': 'أطباق الأرز',
      'international': 'المأكولات العالمية',
      'seafood': 'المأكولات البحرية',
      'meat-dishes': 'أطباق اللحوم',
      'daily-cooking': 'الطبخ اليومي',
      'traditional': 'الأطباق التقليدية',
      'soups': 'الشوربات',
      'vegetables': 'الخضروات'
    };
    return names[subCategory] || subCategory;
  }

  animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    // Observe product cards as they're added
    const observeCards = () => {
      document.querySelectorAll('.product-card:not(.observed)').forEach(card => {
        card.classList.add('observed');
        observer.observe(card);
      });
    };

    // Initial observation
    setTimeout(observeCards, 100);
    
    // Re-observe after filtering
    this.observeCards = observeCards;
  }

  updateResultsCount() {
    const count = this.filteredProducts.length;
    const searchBox = document.getElementById('searchBox');
    
    if (searchBox) {
      const placeholder = count > 0 
        ? `🔍 ابحث في ${count} منتج...`
        : '🔍 ابحث عن منتج...';
      searchBox.placeholder = placeholder;
    }
  }

  clearFilters() {
    this.currentCategory = 'all';
    this.searchTerm = '';
    
    const searchBox = document.getElementById('searchBox');
    if (searchBox) searchBox.value = '';
    
    this.filterProducts();
    this.renderCategoryFilters();
  }

  showLoading(show) {
    const container = document.getElementById('products-container');
    if (!container) return;

    if (show) {
      container.innerHTML = `
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>جاري تحميل المنتجات...</p>
        </div>
      `;
    }
  }

  showError(message) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle error-icon"></i>
        <h3>حدث خطأ</h3>
        <p>${message}</p>
        <button class="btn-primary" onclick="location.reload()">
          إعادة المحاولة
        </button>
      </div>
    `;
  }
}

// Enhanced Product Interactions
class ProductInteractions {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart')) {
        const productId = e.target.closest('.add-to-cart').dataset.productId;
        this.addToCart(productId);
      }
      
      if (e.target.closest('.wishlist-btn')) {
        const productId = e.target.closest('.wishlist-btn').dataset.productId;
        this.toggleWishlist(productId);
      }
      
      if (e.target.closest('.quick-view-btn')) {
        const productId = e.target.closest('.quick-view-btn').dataset.productId;
        this.showQuickView(productId);
      }
    });
  }

  addToCart(productId) {
    const product = productsManager.products.find(p => p.id == productId);
    if (!product) return;

    const existingItem = this.cart.find(item => item.id == productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    this.showNotification(`تم إضافة ${product.name} إلى السلة`, 'success');
    this.updateCartUI();
  }

  toggleWishlist(productId) {
    const product = productsManager.products.find(p => p.id == productId);
    if (!product) return;

    const index = this.wishlist.findIndex(item => item.id == productId);
    const button = document.querySelector(`[data-product-id="${productId}"].wishlist-btn`);
    
    if (index > -1) {
      this.wishlist.splice(index, 1);
      button.innerHTML = '<i class="far fa-heart"></i>';
      this.showNotification(`تم إزالة ${product.name} من المفضلة`, 'info');
    } else {
      this.wishlist.push(product);
      button.innerHTML = '<i class="fas fa-heart"></i>';
      this.showNotification(`تم إضافة ${product.name} إلى المفضلة`, 'success');
    }

    this.saveWishlist();
  }

  showQuickView(productId) {
    const product = productsManager.products.find(p => p.id == productId);
    if (!product) return;

    const modal = this.createQuickViewModal(product);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }

  createQuickViewModal(product) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-body">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-details">
            <h2>${product.name}</h2>
            <div class="product-rating">
              ${productsManager.renderStars(product.rating)}
              <span>${product.rating} (${product.reviews} تقييم)</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-features">
              <h4>المميزات:</h4>
              <ul>
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
            <div class="modal-actions">
              <button class="btn-primary add-to-cart" data-product-id="${product.id}">
                <i class="fas fa-shopping-cart"></i>
                أضف للسلة
              </button>
              <button class="btn-secondary wishlist-btn" data-product-id="${product.id}">
                <i class="far fa-heart"></i>
                المفضلة
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Close modal functionality
    const closeModal = () => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });

    return modal;
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  updateCartUI() {
    const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
    // Update cart badge if exists
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
    }
  }

  showNotification(message, type) {
    // Use the global notification system
    if (typeof showNotification === 'function') {
      showNotification(message, type);
    }
  }
}

// Add enhanced styles
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
  /* Enhanced Product Cards */
  .product-card {
    position: relative;
    overflow: hidden;
  }

  .popular-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
    z-index: 2;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .product-image-container {
    position: relative;
    overflow: hidden;
  }

  .product-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .product-card:hover .product-overlay {
    opacity: 1;
  }

  .quick-view-btn {
    background: white;
    color: var(--primary);
    border: none;
    padding: 12px 20px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .quick-view-btn:hover {
    transform: scale(1.05);
  }

  .product-description {
    font-size: 14px;
    color: var(--text-medium);
    margin-bottom: 12px;
    line-height: 1.5;
  }

  .product-features {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }

  .feature-tag {
    background: var(--bg-section);
    color: var(--text-medium);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
  }

  .product-rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .stars {
    display: flex;
    gap: 2px;
  }

  .stars i {
    color: #fbbf24;
    font-size: 14px;
  }

  .rating-text {
    font-size: 12px;
    color: var(--text-light);
  }

  .product-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .product-actions .btn-primary {
    flex: 1;
    padding: 10px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .wishlist-btn {
    background: none;
    border: 2px solid var(--primary);
    color: var(--primary);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .wishlist-btn:hover {
    background: var(--primary);
    color: white;
  }

  /* Loading States */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--bg-section);
    border-top: 4px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Empty State */
  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    padding: 40px 20px;
  }

  .empty-state-content {
    text-align: center;
    max-width: 400px;
  }

  .empty-state-icon {
    font-size: 4rem;
    color: var(--text-light);
    margin-bottom: 20px;
  }

  .empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: var(--text-dark);
  }

  .empty-state p {
    color: var(--text-medium);
    margin-bottom: 24px;
    line-height: 1.6;
  }

  /* Error State */
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    padding: 40px 20px;
    text-align: center;
  }

  .error-icon {
    font-size: 4rem;
    color: #ef4444;
    margin-bottom: 20px;
  }

  /* Quick View Modal */
  .quick-view-modal {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .quick-view-modal.show {
    opacity: 1;
    visibility: visible;
  }

  .modal-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(4px);
  }

  .modal-content {
    position: relative;
    background: white;
    border-radius: 20px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }

  .quick-view-modal.show .modal-content {
    transform: scale(1);
  }

  .modal-close {
    position: absolute;
    top: 16px;
    left: 16px;
    background: rgba(0,0,0,0.1);
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    z-index: 1;
    transition: background 0.3s ease;
  }

  .modal-close:hover {
    background: rgba(0,0,0,0.2);
  }

  .modal-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding: 40px;
  }

  .modal-body .product-image img {
    width: 100%;
    border-radius: 12px;
  }

  .product-details h2 {
    font-size: 1.8rem;
    margin-bottom: 12px;
    color: var(--text-dark);
  }

  .product-details .product-features h4 {
    margin-bottom: 8px;
    color: var(--text-dark);
  }

  .product-details .product-features ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .product-details .product-features li {
    padding: 4px 0;
    color: var(--text-medium);
    position: relative;
    padding-right: 16px;
  }

  .product-details .product-features li::before {
    content: "✓";
    position: absolute;
    right: 0;
    color: var(--primary);
    font-weight: bold;
  }

  .modal-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .modal-actions .btn-primary {
    flex: 1;
  }

  @media (max-width: 768px) {
    .modal-body {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 20px;
    }
    
    .modal-content {
      width: 95%;
      margin: 20px;
    }
  }

  /* Enhanced Animations */
  .animate-in {
    animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(enhancedStyles);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.productsManager = new ProductsManager();
  window.productInteractions = new ProductInteractions();
});

// Initialize hamburger menu for products page
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger-btn');
  const menu = document.getElementById('navbar-menu');

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }
});

console.log('Enhanced Products Manager Loaded ✨');