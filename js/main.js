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
    btnVisible: 0
  },
  mounted: function() {
    this.getProduct();
    this.checkInCart();   
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
    },
    goToCart: function() {
      window.location.href = 'index4.html';
    }
  }
});