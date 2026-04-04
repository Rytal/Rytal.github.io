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
    product: [],
    btnVisible: 0,
    cart: [],
    contactFields: {
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
    orderSubmitted: false
  },
  mounted: function() {
    this.getProduct();
    this.checkInCart();
    this.getCart();
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
      this.getCart();
    },
    goToCart: function() {
      window.location.href = 'index4.html';
    },
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
      var storedCart = window.localStorage.getItem('cart');
      if (storedCart) {
        var ids = storedCart.split(',');
        var newIds = ids.filter(i => parseInt(i) !== id);
        if (newIds.length > 0) {
          window.localStorage.setItem('cart', newIds.join());
        } else {
          window.localStorage.removeItem('cart');
        }
        this.getCart();
        if (this.product.length > 0 && this.product[0].id === id) {
          this.checkInCart();
        }
      }
    },
    makeOrder: function() {
      this.orderSubmitted = true;
      window.localStorage.removeItem('cart');
      this.cart = [];
      if (this.product.length > 0) {
        this.checkInCart();
      }
    }
  }
});
