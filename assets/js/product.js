// Bản sao theo tài liệu cô: var, function, if/for, mảng và DOM/jQuery.
// Giữ tên hàm, cấu trúc trang và dữ liệu để đối chiếu bản nhóm nộp.
function bnbProductPage($) {
  "use strict";

  var LIST = typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS) ? PRODUCTS : [];
  var CATS = typeof CATEGORIES !== 'undefined' ? CATEGORIES : {
    skincare: 'Chăm sóc da',
    makeup: 'Trang điểm',
    body: 'Chăm sóc cơ thể',
    hair: 'Chăm sóc tóc'
  };
  var PAGE_SIZE = 9;
  var OTHER_BRAND = '__other__';
  var MAIN_BRANDS = typeof FILTER_BRANDS !== 'undefined' && Array.isArray(FILTER_BRANDS) ? FILTER_BRANDS : null;
  function brandKey(brand) {
    if (!MAIN_BRANDS) return brand;
    return MAIN_BRANDS.indexOf(brand) !== -1 ? brand : OTHER_BRAND;
  }
  function formatPrice(n) {
    return Number(n).toLocaleString('vi-VN') + 'đ';
  }
  function discountPercent(p) {
    if (!p.oldPrice || p.oldPrice <= p.price) return 0;
    return Math.round((1 - p.price / p.oldPrice) * 100);
  }
  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function removeAccents(str) {
    return String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  }
  function findProduct(id) {
    var num = Number(id);
    for (var i = 0; i < LIST.length; i++) {
      if (LIST[i].id === num) return LIST[i];
    }
    return null;
  }
  function getParam(name) {
    var match = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
  }
  function fallbackImage(text) {
    var label = escapeHtml(text || 'Beauty N Beat');
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' + '<rect width="100%" height="100%" fill="#F7F6F1"/>' + '<text x="50%" y="50%" font-family="sans-serif" font-size="22" fill="#56745E" ' + 'text-anchor="middle" dominant-baseline="middle">' + label + '</text></svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }
  function bindImageFallback($scope) {
    $scope.find('img[data-fallback]').each(function () {
      var img = this;
      $(img).one('error', function () {
        img.src = fallbackImage($(img).data('fallback'));
      });
      if (img.complete && img.naturalWidth === 0 && img.src) {
        img.src = fallbackImage($(img).data('fallback'));
      }
    });
  }
  function getCart() {
    try {
      var data = JSON.parse(localStorage.getItem('cart'));
      if (!Array.isArray(data)) return [];
      var cart = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (!item || Number(item.quantity) <= 0 || isNaN(Number(item.quantity))) continue;
        var id = Number(item.productId);
        // Giữ các thông tin của dòng giỏ hàng để tương thích phần D.
        var row = {};
        for (var key in item) row[key] = item[key];
        row.productId = isNaN(id) ? item.productId : id;
        row.quantity = Number(item.quantity);
        cart.push(row);
      }
      return cart;
    } catch (e) {
      return [];
    }
  }
  function saveCart(cart) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {}
    if (typeof window.updateCartCount === 'function') window.updateCartCount();
    $(document).trigger('cart:updated', [cart]);
  }
  function getCartQty(productId) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].productId === Number(productId)) return cart[i].quantity;
    }
    return 0;
  }
  function addToCart(productId, qty) {
    var p = findProduct(productId);
    if (!p) return {
      added: 0,
      message: 'Không tìm thấy sản phẩm.'
    };
    if (p.stock <= 0) return {
      added: 0,
      message: 'Sản phẩm này đã hết hàng.'
    };
    var cart = getCart();
    var item = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].productId === p.id) {
        item = cart[i];
        break;
      }
    }
    var inCart = item ? item.quantity : 0;
    var canAdd = Math.min(qty, p.stock - inCart);
    if (canAdd <= 0) {
      return {
        added: 0,
        message: 'Giỏ đã có ' + inCart + ' sản phẩm, bằng số lượng còn trong kho.'
      };
    }
    if (item) item.quantity += canAdd;else cart.push({
      productId: p.id,
      quantity: canAdd
    });
    saveCart(cart);
    if (canAdd < qty) {
      return {
        added: canAdd,
        message: 'Chỉ thêm được ' + canAdd + ' sản phẩm vì kho còn ' + p.stock + '.'
      };
    }
    return {
      added: canAdd,
      message: 'Đã thêm ' + canAdd + ' "' + p.name + '" vào giỏ hàng.'
    };
  }
  function showToast(text) {
    $('#cartToastText').text(text);
    var el = document.getElementById('cartToast');
    if (el && window.bootstrap) {
      bootstrap.Toast.getOrCreateInstance(el, {
        delay: 2500
      }).show();
    } else {
      alert(text);
    }
  }
  function cardHtml(p, colClass) {
    var off = discountPercent(p);
    var out = p.stock <= 0;
    var name = escapeHtml(p.name);
    return '<div class="' + colClass + '">' + '<article class="card bnb-card' + (out ? ' is-out' : '') + '">' + '<a href="product-detail.html?id=' + p.id + '" class="bnb-card-img js-detail" data-id="' + p.id + '">' + (off ? '<span class="bnb-badge-sale">-' + off + '%</span>' : '') + (out ? '<span class="bnb-badge-out">Hết hàng</span>' : '') + '<img src="' + escapeHtml(p.image) + '" alt="' + name + '" loading="lazy" data-fallback="' + escapeHtml(p.brand) + '">' + '</a>' + '<div class="card-body bnb-card-body">' + '<p class="bnb-brand">' + escapeHtml(p.brand) + '</p>' + '<a href="product-detail.html?id=' + p.id + '" class="card-title bnb-card-name js-detail" data-id="' + p.id + '">' + name + '</a>' + '<div class="bnb-card-price">' + '<span class="bnb-price">' + formatPrice(p.price) + '</span>' + (off ? '<span class="bnb-old-price">' + formatPrice(p.oldPrice) + '</span>' : '') + '</div>' + '<button type="button" class="btn btn-sm bnb-btn-outline bnb-add js-add" data-id="' + p.id + '"' + (out ? ' disabled' : '') + '>' + (out ? 'Hết hàng' : 'Thêm vào giỏ') + '</button>' + '</div>' + '</article>' + '</div>';
  }
  $(document).on('click', '.js-detail', function () {
    try {
      localStorage.setItem('selectedProductId', String($(this).data('id')));
    } catch (e) {}
  });
  $(document).on('click', '.js-add', function () {
    var result = addToCart($(this).data('id'), 1);
    showToast(result.message);
  });
  if ($('#productGrid').length) {
    initListPage();
  }
  function initListPage() {
    var state = {
      category: 'all',
      keyword: '',
      price: 'all',
      brands: [],
      onlySale: false,
      onlyStock: false,
      sort: 'default',
      page: 1
    };
    var urlCat = getParam('category');
    if (CATS[urlCat]) state.category = urlCat;
    var urlKey = getParam('keyword');
    if (urlKey) {
      state.keyword = urlKey;
      $('#keywordInput').val(urlKey);
    }
    function renderCategories() {
      var html = radioHtml('all', 'Tất cả', LIST.length);
      $.each(CATS, function (key, label) {
        var count = 0;
        for (var i = 0; i < LIST.length; i++) {
          if (LIST[i].category === key) count++;
        }
        html += radioHtml(key, label, count);
      });
      $('#categoryList').html(html);
      $('input[name=category][value=' + state.category + ']').prop('checked', true);
    }
    function radioHtml(value, label, count) {
      var id = 'cat-' + value;
      return '<div class="form-check">' + '<input class="form-check-input" type="radio" name="category" id="' + id + '" value="' + value + '">' + '<label class="form-check-label" for="' + id + '">' + label + ' <span class="bnb-count">(' + count + ')</span></label>' + '</div>';
    }
    function renderBrands() {
      var counts = {};
      var brands = [];
      for (var i = 0; i < LIST.length; i++) {
        var key = brandKey(LIST[i].brand);
        if (!counts[key]) {
          counts[key] = 0;
          if (key !== OTHER_BRAND) brands.push(key);
        }
        counts[key]++;
      }
      brands.sort(function (a, b) {
        return a.localeCompare(b, 'vi');
      });
      if (counts[OTHER_BRAND]) brands.push(OTHER_BRAND);
      var html = '';
      for (var i = 0; i < brands.length; i++) {
        var b = brands[i];
        var id = 'brand-' + i;
        var label = b === OTHER_BRAND ? 'Khác' : b;
        html += '<div class="form-check">' + '<input class="form-check-input js-brand" type="checkbox" id="' + id + '" value="' + escapeHtml(b) + '">' + '<label class="form-check-label" for="' + id + '">' + escapeHtml(label) + ' <span class="bnb-count">(' + counts[b] + ')</span></label>' + '</div>';
      }
      $('#brandList').html(html);
    }

    // Mỗi từ khóa phải xuất hiện trong tên hoặc thương hiệu.
    function filterProducts() {
      var words = removeAccents(state.keyword.trim()).split(/\s+/);
      var range = null;
      if (state.price !== 'all') range = state.price.split('-');
      var result = [];
      for (var i = 0; i < LIST.length; i++) {
        var p = LIST[i];
        if (state.category !== 'all' && p.category !== state.category) continue;
        var text = removeAccents(p.name + ' ' + p.brand);
        var matches = true;
        for (var j = 0; j < words.length; j++) {
          if (text.indexOf(words[j]) === -1) matches = false;
        }
        if (!matches) continue;
        if (range && p.price < Number(range[0])) continue;
        if (range && Number(range[1]) > 0 && p.price > Number(range[1])) continue;
        if (state.brands.length && state.brands.indexOf(brandKey(p.brand)) === -1) continue;
        if (state.onlySale && !discountPercent(p)) continue;
        if (state.onlyStock && p.stock <= 0) continue;
        result.push(p);
      }
      return result;
    }
    function sortProducts(arr) {
      var list = arr.slice();
      switch (state.sort) {
        case 'price-asc':
          list.sort(function (a, b) {
            return a.price - b.price;
          });
          break;
        case 'price-desc':
          list.sort(function (a, b) {
            return b.price - a.price;
          });
          break;
        case 'name-asc':
          list.sort(function (a, b) {
            return a.name.localeCompare(b.name, 'vi');
          });
          break;
        case 'discount':
          list.sort(function (a, b) {
            return discountPercent(b) - discountPercent(a);
          });
          break;
        default:
          list.sort(function (a, b) {
            return (b.stock > 0) - (a.stock > 0);
          });
      }
      return list;
    }
    function renderPagination(total) {
      var pages = Math.ceil(total / PAGE_SIZE);
      var $pg = $('#pagination').empty();
      if (pages <= 1) return;
      function item(label, page, disabled, active, aria) {
        return '<li class="page-item' + (disabled ? ' disabled' : '') + (active ? ' active' : '') + '">' + '<a class="page-link" href="#" data-page="' + page + '"' + (aria ? ' aria-label="' + aria + '"' : '') + (active ? ' aria-current="page"' : '') + '>' + label + '</a>' + '</li>';
      }
      var html = item('‹', state.page - 1, state.page === 1, false, 'Trang trước');
      for (var i = 1; i <= pages; i++) html += item(i, i, false, i === state.page);
      html += item('›', state.page + 1, state.page === pages, false, 'Trang sau');
      $pg.html(html);
    }
    function render() {
      var result = sortProducts(filterProducts());
      var total = result.length;
      var pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (state.page > pages) state.page = pages;
      var start = (state.page - 1) * PAGE_SIZE;
      var pageItems = result.slice(start, start + PAGE_SIZE);
      var title = state.category === 'all' ? 'Tất cả sản phẩm' : CATS[state.category];
      $('#pageTitle, #crumbCurrent').text(title);
      document.title = title + ' | Beauty N Beat';
      $('#resultCount').text(total ? total + ' sản phẩm' : '0 sản phẩm');
      var $grid = $('#productGrid');
      if (!total) {
        $grid.empty();
        $('#emptyState').removeClass('d-none');
      } else {
        $('#emptyState').addClass('d-none');
        var html = '';
        for (var i = 0; i < pageItems.length; i++) {
          html += cardHtml(pageItems[i], 'col-6 col-md-4');
        }
        $grid.html(html);
        bindImageFallback($grid);
      }
      renderPagination(total);
    }
    function resetFilters() {
      state.category = 'all';
      state.keyword = '';
      state.price = 'all';
      state.brands = [];
      state.onlySale = false;
      state.onlyStock = false;
      state.page = 1;
      $('#keywordInput').val('');
      $('input[name=category][value=all]').prop('checked', true);
      $('#price-all').prop('checked', true);
      $('.js-brand, #onlySale, #onlyStock').prop('checked', false);
      render();
    }
    $('#categoryList').on('change', 'input[name=category]', function () {
      state.category = this.value;
      state.page = 1;
      render();
    });
    var typingTimer;
    $('#keywordInput').on('input', function () {
      var val = this.value;
      clearTimeout(typingTimer);
      typingTimer = setTimeout(function () {
        state.keyword = val;
        state.page = 1;
        render();
      }, 250);
    });
    $('input[name=price]').on('change', function () {
      state.price = this.value;
      state.page = 1;
      render();
    });
    $('#brandList').on('change', '.js-brand', function () {
      state.brands = [];
      $('.js-brand:checked').each(function () {
        state.brands.push(this.value);
      });
      state.page = 1;
      render();
    });
    $('#onlySale').on('change', function () {
      state.onlySale = this.checked;
      state.page = 1;
      render();
    });
    $('#onlyStock').on('change', function () {
      state.onlyStock = this.checked;
      state.page = 1;
      render();
    });
    $('#sortSelect').on('change', function () {
      state.sort = this.value;
      state.page = 1;
      render();
    });
    $('#pagination').on('click', 'a', function (e) {
      e.preventDefault();
      var page = Number($(this).data('page'));
      if (!page || $(this).parent().hasClass('disabled')) return;
      state.page = page;
      render();
      $('html, body').animate({
        scrollTop: $('#pageTitle').offset().top - 20
      }, 200);
    });
    $('#resetFilter, #emptyReset').on('click', resetFilters);
    renderCategories();
    renderBrands();
    render();
  }
  function initGallery(p) {
    var images = Array.isArray(p.images) && p.images.length ? p.images : [p.image];
    var current = 0;
    var $main = $('#dImage');
    var $thumbs = $('#dThumbs');
    var labels = ['Ảnh chính', 'Mặt sau', 'Kết cấu'];
    var html = '';
    for (var i = 0; i < images.length; i++) {
      var src = images[i];
      html += '<button type="button" class="bnb-thumb' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="' + (labels[i] || 'Ảnh ' + (i + 1)) + '">' + '<img src="' + escapeHtml(src) + '" alt="" data-fallback="' + escapeHtml(p.brand) + '">' + '</button>';
    }
    $thumbs.html(html);
    $main.attr({
      src: images[0],
      alt: p.name,
      'data-fallback': p.brand
    });
    if (images.length < 2) {
      $('#galleryPrev, #galleryNext').hide();
      $thumbs.hide();
    }
    function show(index) {
      current = (index + images.length) % images.length;
      $main.stop(true, true).fadeTo(120, 0.2, function () {
        $main.attr('src', images[current]).fadeTo(160, 1);
      });
      $thumbs.find('.bnb-thumb').removeClass('active').eq(current).addClass('active');
    }
    $thumbs.on('click', '.bnb-thumb', function () {
      show(Number($(this).data('index')));
    });
    $('#galleryPrev').on('click', function () {
      show(current - 1);
    });
    $('#galleryNext').on('click', function () {
      show(current + 1);
    });
    $main.on('error', function () {
      this.src = fallbackImage(p.brand);
    });
  }
  if ($('#detailBox').length) {
    initDetailPage();
  }
  function initDetailPage() {
    var id = getParam('id');
    if (!id) {
      try {
        id = localStorage.getItem('selectedProductId');
      } catch (e) {
        id = null;
      }
    }
    var p = findProduct(id);
    if (!p) {
      $('#notFound').removeClass('d-none');
      $('#crumbCategory').remove();
      $('#crumbName').text('Không tìm thấy');
      return;
    }
    try {
      localStorage.setItem('selectedProductId', String(p.id));
    } catch (e) {}
    var off = discountPercent(p);
    var catName = CATS[p.category] || p.category;
    document.title = p.name + ' | Beauty N Beat';
    $('#crumbCategory').html('<a href="products.html?category=' + p.category + '">' + escapeHtml(catName) + '</a>');
    $('#crumbName').text(p.name);
    initGallery(p);
    $('#dBrand').text(p.brand);
    $('#dName').text(p.name);
    $('#dId').text('BNB' + ('0000' + p.id).slice(-4));
    $('#dPrice').text(formatPrice(p.price));
    if (off) {
      $('#dOldPrice').text(formatPrice(p.oldPrice));
      $('#dSaleBadge').text('-' + off + '%').removeClass('d-none');
    }
    $('#dDesc').text(p.description);
    if (p.usage || p.ingredients) {
      $('#dUsage').text(p.usage || 'Đang cập nhật.');
      if (p.ingredients) $('#dIngredients').text(p.ingredients);else $('#dIngredientsBox').remove();
    } else {
      $('#tabUsageBtn').closest('li').remove();
      $('#tabUsage').remove();
    }
    $('#iBrand').text(p.brand);
    $('#dCategory').text(catName).attr('href', 'products.html?category=' + p.category);
    $('#iCode').text('BNB' + ('0000' + p.id).slice(-4));
    $('#iCategory').html('<a href="products.html?category=' + p.category + '">' + escapeHtml(catName) + '</a>');
    var stockText, stockClass;
    if (p.stock <= 0) {
      stockText = 'Hết hàng';
      stockClass = 'bnb-stock-out';
    } else if (p.stock <= 10) {
      stockText = 'Chỉ còn ' + p.stock + ' sản phẩm';
      stockClass = 'bnb-stock-low';
    } else {
      stockText = 'Còn hàng (' + p.stock + ' sản phẩm)';
      stockClass = 'bnb-stock-in';
    }
    $('#dStock').html('<span class="' + stockClass + '">' + stockText + '</span>');
    $('#iStock').text(stockText);
    $('#detailBox').removeClass('d-none');
    bindImageFallback($('#detailBox'));
    var $qty = $('#qtyInput');
    function maxQty() {
      return Math.max(0, p.stock - getCartQty(p.id));
    }
    function readQty() {
      var raw = $.trim($qty.val());
      var max = maxQty();
      if (!/^[1-9]\d*$/.test(raw)) {
        return {
          ok: false,
          msg: 'Số lượng phải là số nguyên lớn hơn 0.'
        };
      }
      var n = parseInt(raw, 10);
      if (n > max) {
        return {
          ok: false,
          msg: max > 0 ? 'Bạn chỉ có thể thêm tối đa ' + max + ' sản phẩm.' : 'Giỏ đã có đủ số lượng còn trong kho.'
        };
      }
      return {
        ok: true,
        value: n
      };
    }
    function refreshQtyUI() {
      var max = maxQty();
      var check = readQty();
      var n = parseInt($qty.val(), 10) || 0;
      $('#qtyMinus').prop('disabled', n <= 1 || max === 0);
      $('#qtyPlus').prop('disabled', n >= max);
      $qty.toggleClass('is-invalid', !check.ok && max > 0);
      $('#qtyError').text(check.ok || max === 0 ? '' : check.msg);
      if (p.stock <= 0) {
        $('#btnAddCart, #btnBuyNow, #qtyMinus, #qtyPlus').prop('disabled', true);
        $qty.prop('disabled', true);
        $('#btnAddCart').text('Hết hàng');
      } else if (max === 0) {
        $('#btnAddCart').prop('disabled', true).text('Đã đủ số lượng trong giỏ');
        $('#btnBuyNow').prop('disabled', false).text('Xem giỏ hàng');
        $qty.prop('disabled', true).val(0);
        $('#qtyMinus, #qtyPlus').prop('disabled', true);
      } else {
        $('#btnAddCart').prop('disabled', false).text('Thêm vào giỏ');
        $('#btnBuyNow').prop('disabled', false).text('Mua ngay');
        $qty.prop('disabled', false);
        if ($qty.val() === '0') $qty.val(1);
      }
    }
    $('#qtyMinus').on('click', function () {
      var n = parseInt($qty.val(), 10) || 1;
      $qty.val(Math.max(1, n - 1));
      refreshQtyUI();
    });
    $('#qtyPlus').on('click', function () {
      var n = parseInt($qty.val(), 10) || 0;
      $qty.val(Math.min(maxQty(), n + 1));
      refreshQtyUI();
    });
    $qty.on('input', function () {
      this.value = this.value.replace(/\D/g, '');
      refreshQtyUI();
    });
    $qty.on('blur', function () {
      if (!this.value && maxQty() > 0) this.value = 1;
      refreshQtyUI();
    });
    $('#btnAddCart').on('click', function () {
      var check = readQty();
      if (!check.ok) {
        $('#qtyError').text(check.msg);
        $qty.trigger('focus');
        return;
      }
      var result = addToCart(p.id, check.value);
      showToast(result.message);
      if (maxQty() > 0) $qty.val(1);
      refreshQtyUI();
    });
    $('#btnBuyNow').on('click', function () {
      if (maxQty() === 0) {
        window.location.href = 'cart.html';
        return;
      }
      var check = readQty();
      if (!check.ok) {
        $('#qtyError').text(check.msg);
        $qty.trigger('focus');
        return;
      }
      addToCart(p.id, check.value);
      window.location.href = 'cart.html';
    });
    refreshQtyUI();
    var related = [];
    for (var i = 0; i < LIST.length; i++) {
      if (LIST[i].category === p.category && LIST[i].id !== p.id) related.push(LIST[i]);
    }
    related.sort(function (a, b) {
      return (b.stock > 0) - (a.stock > 0);
    });
    related = related.slice(0, 4);
    if (related.length) {
      var html = '';
      for (var j = 0; j < related.length; j++) html += cardHtml(related[j], 'col-6 col-md-3');
      $('#relatedGrid').html(html);
      bindImageFallback($('#relatedGrid'));
    } else {
      $('#relatedGrid').closest('section').remove();
    }
    $(window).on('storage', function (e) {
      if (e.originalEvent.key === 'cart') refreshQtyUI();
    });
  }
}
jQuery(bnbProductPage);
