// Bản sao theo tài liệu cô: var, function, if/for, mảng và DOM/jQuery.
// Giữ tên hàm, cấu trúc trang và dữ liệu để đối chiếu bản nhóm nộp.
(function () {
  "use strict";

  var MENU = [{
    id: 'home',
    href: 'index.html',
    text: 'Trang chủ'
  }, {
    id: 'products',
    href: 'products.html',
    text: 'Sản phẩm'
  }, {
    id: 'skincare',
    href: 'products.html?category=skincare',
    text: 'Skincare',
    category: 'skincare'
  }, {
    id: 'makeup',
    href: 'products.html?category=makeup',
    text: 'Makeup',
    category: 'makeup'
  }, {
    id: 'body',
    href: 'products.html?category=body',
    text: 'Body',
    category: 'body'
  }, {
    id: 'hair',
    href: 'products.html?category=hair',
    text: 'Hair',
    category: 'hair'
  }, {
    id: 'news',
    href: 'news.html',
    text: 'Cẩm nang'
  }, {
    id: 'about',
    href: 'about.html',
    text: 'Giới thiệu'
  }, {
    id: 'sitemap',
    href: 'sitemap.html',
    text: 'Sơ đồ website'
  }];

  // Tách chuỗi ?ten=gia_tri&... để đọc thông tin truyền giữa các trang.
  function getParam(name) {
    var pairs = window.location.search.substring(1).split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');
      var key = pairs[i].substring(0, pos);
      if (key === name) {
        return decodeURIComponent(pairs[i].substring(pos + 1).replace(/\+/g, ' '));
      }
    }
    return null;
  }
  function currentFile() {
    var name = window.location.pathname.split('/').pop();
    return name === '' ? 'index.html' : name;
  }
  function isActive(item) {
    var file = currentFile();
    var category = getParam('category');
    if (item.id === 'home') return file === 'index.html';
    if (item.category) return file === 'products.html' && category === item.category;
    if (item.id === 'products') {
      return file === 'products.html' && !getParam('category') || file === 'product-detail.html';
    }
    if (item.id === 'news') return file === 'news.html' || file === 'news-detail.html';
    if (item.id === 'about') return file === 'about.html';
    if (item.id === 'sitemap') return file === 'sitemap.html';
    return false;
  }
  function buildHeader() {
    var items = '';
    for (var i = 0; i < MENU.length; i++) {
      var m = MENU[i];
      items += '<li class="nav-item"><a class="nav-link' + (isActive(m) ? ' active' : '') + '" href="' + m.href + '">' + m.text + '</a></li>';
    }
    return '<div class="site-topbar">Miễn phí vận chuyển cho đơn từ 500.000đ | Beauty N Beat - Mỹ phẩm chọn lọc cho làn da khỏe</div>' + '<div class="site-header-main py-3"><div class="container"><div class="row align-items-center g-2">' + '<div class="col-12 col-md-3"><a class="site-logo" href="index.html">Beauty<span>N</span>Beat</a></div>' + '<div class="col-12 col-md-4">' + '<form id="site-search-form" class="site-search input-group" role="search">' + '<input id="site-search-input" type="search" class="form-control" placeholder="Tìm sản phẩm, thương hiệu..." aria-label="Từ khóa tìm kiếm">' + '<button class="btn" type="submit">Tìm kiếm</button></form></div>' + '<div class="col-12 col-md-5 site-actions d-flex justify-content-md-end align-items-center gap-3">' + '<div id="account-area"></div>' + '<a href="cart.html">Giỏ hàng <span id="cart-count" class="site-cart-badge">0</span></a>' + '</div></div></div></div>' + '<nav class="site-nav navbar navbar-expand-lg" aria-label="Menu chính"><div class="container">' + '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#site-menu" aria-controls="site-menu" aria-expanded="false" aria-label="Mở menu">' + '<span class="navbar-toggler-icon"></span></button>' + '<div class="collapse navbar-collapse" id="site-menu"><ul class="navbar-nav">' + items + '</ul></div></div></nav>';
  }
  function buildFooter() {
    return '<div class="container"><div class="row g-4">' + '<div class="col-md-4"><h5>Beauty N Beat</h5><p>Website giới thiệu và bán mỹ phẩm trực tuyến, làm cho bài tập lớn môn Hệ thống và Công nghệ Web.</p></div>' + '<div class="col-6 col-md-2"><h5>Danh mục</h5><ul>' + '<li><a href="products.html?category=skincare">Skincare</a></li>' + '<li><a href="products.html?category=makeup">Makeup</a></li>' + '<li><a href="products.html?category=body">Body</a></li>' + '<li><a href="products.html?category=hair">Hair</a></li></ul></div>' + '<div class="col-6 col-md-3"><h5>Khám phá</h5><ul>' + '<li><a href="news.html">Cẩm nang làm đẹp</a></li>' + '<li><a href="about.html">Giới thiệu</a></li>' + '<li><a href="sitemap.html">Sơ đồ website</a></li>' + '<li><a href="cart.html">Giỏ hàng</a></li></ul></div>' + '<div class="col-md-3"><h5>Tài khoản</h5><ul>' + '<li><a href="login.html">Đăng nhập</a></li>' + '<li><a href="register.html">Đăng ký</a></li></ul></div>' + '</div>' + '<div class="site-footer-bottom">&copy; 2026 Beauty N Beat - Bài tập lớn môn Hệ thống và Công nghệ Web. Bố cục có tham khảo ý tưởng từ website Hasaki.</div></div>';
  }
  function updateCartCount() {
    var total = 0;
    try {
      var cart = JSON.parse(localStorage.getItem('cart'));
      if (Array.isArray(cart)) {
        for (var i = 0; i < cart.length; i++) {
          total += Number(cart[i].quantity) || 0;
        }
      }
    } catch (e) {
      total = 0;
    }
    var badges = document.querySelectorAll('#cart-count, #cart-badge-count, .js-cart-count');
    for (var j = 0; j < badges.length; j++) {
      badges[j].textContent = total;
    }
  }
  window.updateCartCount = updateCartCount;
  function getCurrentUserName() {
    var raw = null;
    try {
      raw = localStorage.getItem('currentUser');
      if (!raw) raw = sessionStorage.getItem('currentUser');
    } catch (e) {
      return '';
    }
    if (!raw) return '';
    try {
      var obj = JSON.parse(raw);
      if (obj && typeof obj === 'object') {
        return obj.fullName || obj.name || obj.username || '';
      }
      return String(obj);
    } catch (e) {
      return raw;
    }
  }
  function renderAccount() {
    var area = document.getElementById('account-area');
    if (!area) return;
    var name = getCurrentUserName();
    if (name) {
      area.innerHTML = '';
      var hello = document.createElement('span');
      hello.className = 'me-2';
      hello.appendChild(document.createTextNode('Xin chào, '));
      var strong = document.createElement('strong');
      strong.textContent = name;
      hello.appendChild(strong);
      var out = document.createElement('a');
      out.href = '#';
      out.textContent = 'Đăng xuất';
      out.addEventListener('click', function (e) {
        e.preventDefault();
        try {
          localStorage.removeItem('currentUser');
          sessionStorage.removeItem('currentUser');
        } catch (err) {}
        window.location.href = 'index.html';
      });
      area.appendChild(hello);
      area.appendChild(out);
    } else {
      area.innerHTML = '<a href="login.html">Đăng nhập</a> <span class="mx-1">|</span> <a href="register.html">Đăng ký</a>';
    }
  }
  function setupSearch() {
    var form = document.getElementById('site-search-form');
    var input = document.getElementById('site-search-input');
    if (!form || !input) return;
    // Đang ở trang tìm kiếm thì điền lại từ khóa
    if (currentFile() === 'search.html' && getParam('q')) {
      input.value = getParam('q');
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var keyword = input.value.trim();
      try {
        localStorage.setItem('searchKeyword', keyword);
      } catch (err) {}
      window.location.href = 'search.html?q=' + encodeURIComponent(keyword);
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('site-header') || document.getElementById('header');
    var footer = document.getElementById('site-footer') || document.getElementById('footer');
    if (header) header.innerHTML = buildHeader();
    if (footer) {
      footer.classList.add('site-footer');
      footer.innerHTML = buildFooter();
    }
    updateCartCount();
    renderAccount();
    setupSearch();
    window.addEventListener('storage', function (e) {
      if (e.key === 'cart') updateCartCount();
    });
    if (window.jQuery) {
      window.jQuery(document).on('cart:updated', updateCartCount);
    }
  });
})();
