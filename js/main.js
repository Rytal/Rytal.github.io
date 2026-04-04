var app = new Vue({
  el: "#article",
  data: {
    products: [
      { id: 1, title: "Ківі Хейворд", short_text: 'Зелений, кисло-солодкий', image: 'kiwi1.jpg', desc: "Класичний сорт із пухнастою шкіркою." },
      { id: 2, title: "Золотий ківі", short_text: 'Солодкий, без кислинки', image: 'kiwi2.jpg', desc: "Гладенька шкірка, жовта м'якоть." },
      { id: 3, title: "Сік із ківі", short_text: 'Натуральний напій', image: 'kiwi3.jpg', desc: "Свіжовичавлений, без цукру." },
      { id: 4, title: "Джем із ківі", short_text: 'Густий та ароматний', image: 'kiwi4.jpg', desc: "Ідеальний до тостів." },
      { id: 5, title: "Органічний ківі", short_text: 'Вирощений без хімії', image: 'kiwi5.jpg', desc: "Сертифікований еко-продукт." }
    ],
    product: [],          // для детальної сторінки
    btnVisible: 0,        // для детальної сторінки
    cart: [],             // масив товарів у кошику (об'єкти)
    contactFields: {      // поля форми
      name: '',
      company: '',
      position: '',
      city: '',
      country: '',
      telephone: '',
      email: '',
      youAre: '',
      otherSpecify: '',
      interest: '',
      code: ''
    },
    orderSubmitted: false // чи показано підтвердження замовлення
  },
  mounted: function() {
    this.getProduct();    // для детальної сторінки (якщо є хеш)
    this.checkInCart();   // для детальної сторінки
    this.getCart();       // завжди оновлюємо кошик при завантаженні
  },
  methods: {
    addItem: function(id) {
      window.localStorage.setItem('prod', id);
    },
    getProduct: function() {
      if (window.location.hash) {
        var id = parseInt(window.location.hash.replace('#', ''));
        if (this.products && this.products.length > 0) {
          for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
              this.product = [this.products[i]];
              break;
            }
          }
        }
      }
    },
    checkInCart: function() {
      if (this.product.length > 0 && window.localStorage.getItem('cart')) {
        var cart = window.localStorage.getItem('cart').split(',');
        if (cart.indexOf(String(this.product[0].id)) !== -1) {
          this.btnVisible = 1;
        } else {
          this.btnVisible = 0;
        }
      } else {
        this.btnVisible = 0;
      }
    },
    addToCart: function(id) {
      var cart = [];
      if (window.localStorage.getItem('cart')) {
        cart = window.localStorage.getItem('cart').split(',');
      }
      if (cart.indexOf(String(id)) === -1) {
        cart.push(id);
        window.localStorage.setItem('cart', cart.join());
      }
      this.btnVisible = 1;
      this.getCart(); // оновлюємо кошик після додавання
    },
    goToCart: function() {
      window.location.href = 'index4.html';
    },
    // ========== НОВІ МЕТОДИ ДЛЯ КОШИКА ТА ЗАМОВЛЕННЯ ==========
    getCart: function() {
      var storedCart = window.localStorage.getItem('cart');
      if (storedCart) {
        var ids = storedCart.split(',');
        this.cart = [];
        for (var i = 0; i < ids.length; i++) {
          var id = parseInt(ids[i]);
          var found = this.products.find(p => p.id === id);
          if (found) {
            this.cart.push(found);
          }
        }
      } else {
        this.cart = [];
      }
    },
    removeFromCart: function(id) {
      // видаляємо з localStorage
      var storedCart = window.localStorage.getItem('cart');
      if (storedCart) {
        var ids = storedCart.split(',');
        var newIds = ids.filter(i => parseInt(i) !== id);
        if (newIds.length > 0) {
          window.localStorage.setItem('cart', newIds.join());
        } else {
          window.localStorage.removeItem('cart');
        }
        // оновлюємо масив cart
        this.getCart();
        // якщо ми на детальній сторінці цього товару – оновити btnVisible
        if (this.product.length > 0 && this.product[0].id === id) {
          this.checkInCart();
        }
      }
    },
    makeOrder: function() {
      // показуємо підтвердження замість форми
      this.orderSubmitted = true;
      // очищаємо кошик
      window.localStorage.removeItem('cart');
      this.cart = [];
      // якщо на детальній сторінці – скидаємо btnVisible (але це не обов'язково)
      if (this.product.length > 0) {
        this.checkInCart();
      }
    }
  }
});