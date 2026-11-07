// Bản sao theo tài liệu cô: var, function, if/for, mảng và DOM/jQuery.
// Giữ tên hàm, cấu trúc trang và dữ liệu để đối chiếu bản nhóm nộp.
$(document).ready(function () {
  // ==================== UTILITIES ====================

  // Hàm bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
  function removeTones(s) {
    return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  }

  // Map danh mục sang tiếng Việt cho bài viết
  var CATEGORY_LABELS = {
    skincare: 'Chăm sóc da',
    makeup: 'Trang điểm',
    body: 'Chăm sóc cơ thể',
    hair: 'Chăm sóc tóc'
  };

  /**
   * Format số tiền VND
   */
  function formatVND(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) return '0 ₫';
    return amount.toLocaleString('vi-VN') + ' ₫';
  }

  /**
   * Lấy dữ liệu an toàn từ PRODUCTS
   */
  function getSafeProducts() {
    if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS) && PRODUCTS.length > 0) {
      return PRODUCTS;
    }
    console.warn('[home.js] PRODUCTS chưa có dữ liệu, dùng mảng rỗng');
    return [];
  }

  /**
   * Lấy dữ liệu an toàn từ NEWS
   */
  function getSafeNews() {
    if (typeof NEWS !== 'undefined' && Array.isArray(NEWS) && NEWS.length > 0) {
      return NEWS;
    }
    console.warn('[home.js] NEWS chưa có dữ liệu, dùng mảng rỗng');
    return [];
  }

  /**
   * Tạo HTML cho product card
   */
  function renderProductCard(product) {
    if (!product) return '';
    var productId = product.id;
    if (productId == null) productId = '';
    var name = product.name || 'Sản phẩm';
    var brand = product.brand || 'BEAUTY N BEAT';
    var image = product.image || '';
    var stock = product.stock;
    if (stock == null) stock = 0;
    var stockLabel = 'Hết hàng';
    if (stock > 0) stockLabel = 'SL ' + stock;
    var url = 'product-detail.html?id=' + productId;

    // Ghép HTML từng dòng, dùng if để hiện giá cũ và phần trăm giảm.
    var html = '<div class="col-6 col-md-4 col-lg-3">';
    html += '<div class="hasaki-product-card">';
    html += '<a href="' + url + '" class="product-link text-decoration-none" data-id="' + productId + '">';
    html += '<div class="hasaki-card-header">';
    html += '<img src="' + image + '" alt="' + name + '">';
    html += '<span class="badge-sl">' + stockLabel + '</span></div></a>';
    html += '<div class="hasaki-card-body">';
    html += '<div class="hasaki-brand">' + brand + '</div>';
    html += '<a href="' + url + '" class="product-link text-decoration-none hasaki-title" data-id="' + productId + '">';
    html += name + '</a><div class="mt-1">';
    if (product.oldPrice && product.oldPrice > product.price) {
      var percent = Math.round((product.oldPrice - product.price) / product.oldPrice * 100);
      html += '<span class="old-price-line">' + formatVND(product.oldPrice) + '</span> ';
      html += '<span class="discount-tag">-' + percent + '%</span>';
    }
    html += '</div><div class="hasaki-price-row mt-1">';
    html += '<span class="price-main">' + formatVND(product.price || 0) + '</span>';
    html += '<a href="' + url + '" class="btn-add-cart-icon product-link" data-id="' + productId + '" title="Xem chi tiết">';
    html += '🛒</a></div></div></div></div>';
    return html;
  }

  function renderSideDealCard(product) {
    if (!product) return '';
    var productId = product.id;
    if (productId == null) productId = '';
    var html = '<div class="col-4 col-lg-12"><div class="side-deal-card">';
    html += '<a href="product-detail.html?id=' + productId + '" class="product-link" data-id="' + productId + '">';
    html += '<img src="' + (product.image || '') + '" alt="' + (product.name || 'Sản phẩm') + '">';
    html += '<div class="side-deal-badge">' + formatVND(product.price || 0) + '</div>';
    html += '</a></div></div>';
    return html;
  }

  function renderNewsCard(newsItem) {
    if (!newsItem) return '';
    var newsId = newsItem.id;
    if (newsId == null) newsId = '';
    var image = newsItem.image || 'assets/img/news/default.jpg';
    var title = newsItem.title || 'Bài viết';
    var category = CATEGORY_LABELS[newsItem.category] || newsItem.category || 'Làm đẹp';
    var html = '<div class="col-12 col-md-4"><div class="news-card-item">';
    html += '<a href="news-detail.html?id=' + newsId + '" class="news-link text-decoration-none" data-id="' + newsId + '">';
    html += '<img src="' + image + '" alt="' + title + '" onerror="this.src=\'assets/img/news/default.jpg\'">';
    html += '<div class="p-3"><span class="badge bg-success mb-2">' + category + '</span>';
    html += '<h6 class="fw-bold text-dark mb-1 news-title">' + title + '</h6>';
    html += '<p class="text-muted small mb-0 news-summary">' + (newsItem.summary || '') + '</p>';
    html += '</div></a></div></div>';
    return html;
  }

  // ==================== EVENT HANDLERS ====================

  /**
   * Lưu selectedProductId khi click
   */
  $(document).on('click', '.product-link', function () {
    var prodId = $(this).data('id');
    if (prodId !== undefined && prodId !== null && prodId !== '') {
      try {
        localStorage.setItem('selectedProductId', String(prodId));
      } catch (err) {
        console.warn('[home.js] Không thể lưu selectedProductId:', err);
      }
    }
  });

  /**
   * Lưu selectedNewsId khi click
   */
  $(document).on('click', '.news-link', function () {
    var newsId = $(this).data('id');
    if (newsId !== undefined && newsId !== null && newsId !== '') {
      try {
        localStorage.setItem('selectedNewsId', String(newsId));
      } catch (err) {
        console.warn('[home.js] Không thể lưu selectedNewsId:', err);
      }
    }
  });

  // ==================== TRANG CHỦ (index.html) ====================
  if ($('#featuredProductsContainer').length > 0) {
    var products = getSafeProducts();
    var news = getSafeNews();

    // --- Render Side Deals ---
    var sideDeals = products.slice(0, 3);
    if (sideDeals.length > 0) {
      var sideHtml = '';
      for (var i = 0; i < sideDeals.length; i++) sideHtml += renderSideDealCard(sideDeals[i]);
      $('#heroSideDeals').html(sideHtml);
    } else {
      $('#heroSideDeals').html('<div class="col-12 text-center text-muted py-4"><small>Chưa có sản phẩm</small></div>');
    }

    // --- Render Products theo category ---
    function displayProducts(category) {
      if (!category) category = 'all';
      var filtered = products;
      if (category !== 'all') {
        filtered = [];
        for (var i = 0; i < products.length; i++) {
          if (products[i].category === category) filtered.push(products[i]);
        }
      }
      var html = '';
      if (filtered.length > 0) {
        for (var i = 0; i < filtered.length; i++) html += renderProductCard(filtered[i]);
      } else {
        html = '\n' +
      '          <div class="col-12 text-center py-5">\n' +
      '            <div class="empty-state">\n' +
      '              <div class="empty-icon">🔍</div>\n' +
      '              <h5 class="fw-bold text-muted">Không có sản phẩm trong mục này</h5>\n' +
      '              <p class="text-muted">Vui lòng chọn danh mục khác.</p>\n' +
      '            </div>\n' +
      '          </div>\n' + '        ';
      }
      $('#featuredProductsContainer').html(html);
    }
    displayProducts('all');

    // --- Chuyển tab danh mục ---
    $('#categoryTabList').on('click', '.btn-tab', function () {
      $('#categoryTabList .btn-tab').removeClass('active');
      $(this).addClass('active');
      var cat = $(this).data('cat') || 'all';
      displayProducts(cat);
    });

    // --- Render News ---
    var featuredNews = news.slice(0, 3);
    if (featuredNews.length > 0) {
      var newsHtml = '';
      for (var i = 0; i < featuredNews.length; i++) newsHtml += renderNewsCard(featuredNews[i]);
      $('#featuredNewsContainer').html(newsHtml);
    } else {
      $('#featuredNewsContainer').html('<div class="col-12 text-center text-muted py-4"><small>Chưa có bài viết</small></div>');
    }

    // ==================== COUNTDOWN KHUNG GIỜ ====================
    function getCurrentSlotEndTime() {
      var now = new Date();
      var hour = now.getHours();
      var endTime = new Date(now);
      if (hour < 12) endTime.setHours(11, 59, 59, 999);else if (hour < 20) endTime.setHours(19, 59, 59, 999);else endTime.setHours(23, 59, 59, 999);
      return endTime;
    }
    var currentSlotEnd = getCurrentSlotEndTime();

    // Cache các selector countdown 1 lần — KHÔNG query DOM mỗi giây
    var $cdHours = $('#cd-hours');
    var $cdMins = $('#cd-mins');
    var $cdSecs = $('#cd-secs');
    var $timeSlots = $('.time-slot-item');
    function updateActiveSlotUI() {
      var hour = new Date().getHours();
      var activeIndex = 0;
      if (hour >= 20) activeIndex = 2;else if (hour >= 12) activeIndex = 1;
      $timeSlots.removeClass('active');
      $timeSlots.eq(activeIndex).addClass('active');
      $timeSlots.each(function (i) {
        var $status = $(this).find('.small');
        if (i < activeIndex) $status.text('Đã kết thúc');else if (i === activeIndex) $status.text('Đang diễn ra');else $status.text('Sắp diễn ra');
      });
    }
    function updateCountdown() {
      var now = new Date();
      if (now >= currentSlotEnd) {
        currentSlotEnd = getCurrentSlotEndTime();
        updateActiveSlotUI();
      }
      var diff = currentSlotEnd - now;
      var hours = Math.floor(diff / (1000 * 60 * 60));
      var mins = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
      var secs = Math.floor(diff % (1000 * 60) / 1000);

      // Dùng selector đã cache — mượt hơn nhiều so với query mỗi giây
      $cdHours.text(('0' + hours).slice(-2));
      $cdMins.text(('0' + mins).slice(-2));
      $cdSecs.text(('0' + secs).slice(-2));
    }
    $timeSlots.on('click', function () {
      var index = $(this).index();
      var now = new Date();
      var endTime = new Date(now);
      if (index === 0) endTime.setHours(11, 59, 59, 999);else if (index === 1) endTime.setHours(19, 59, 59, 999);else endTime.setHours(23, 59, 59, 999);
      if (endTime <= now) endTime.setDate(endTime.getDate() + 1);
      currentSlotEnd = endTime;
      updateActiveSlotUI();
      updateCountdown();
    });
    updateActiveSlotUI();
    updateCountdown();

    // Tài liệu tuần 6: setInterval gọi hàm sau mỗi khoảng thời gian.
    setInterval(updateCountdown, 1000);
  }

  // ==================== TRANG TÌM KIẾM (search.html) ====================
  if ($('#searchResultsContainer').length > 0) {
    var products = getSafeProducts();
    function executeSearch() {
      // 1. Ưu tiên lấy từ URL (?q=...)
      var kw = '';
      var pairs = window.location.search.substring(1).split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pairs[i].substring(0, pos) === 'q') {
          kw = decodeURIComponent(pairs[i].substring(pos + 1).replace(/\+/g, ' '));
          break;
        }
      }

      // Nếu không có URL thì lấy từ LocalStorage
      if (kw === '') {
        kw = localStorage.getItem('searchKeyword') || '';
      }
      kw = kw.trim();
      $('#searchKeywordHeading').text(kw ? '"' + kw + '"' : '(tất cả sản phẩm)');
      $('#searchPageInput').val(kw);

      // 2. Lọc không dấu
      var results = [];
      if (kw === '') {
        results = products;
      } else {
        var cleanKw = removeTones(kw).replace(/\s+/g, ' ').trim();
        for (var i = 0; i < products.length; i++) {
          var p = products[i];
          var name = removeTones(p.name);
          var brand = removeTones(p.brand);
          var category = removeTones(p.category);
          var description = removeTones(p.description);
          if (name.indexOf(cleanKw) !== -1 || brand.indexOf(cleanKw) !== -1 || category.indexOf(cleanKw) !== -1 || description.indexOf(cleanKw) !== -1) {
            results.push(p);
          }
        }
      }
      $('#searchCount').text(results.length);
      var html = '';
      if (results.length > 0) {
        for (var i = 0; i < results.length; i++) html += renderProductCard(results[i]);
      } else {
        html = '\n' +
      '          <div class="col-12 text-center py-5">\n' +
      '            <div class="empty-state">\n' +
      '              <div class="empty-icon">😔</div>\n' +
      '              <h5 class="fw-bold text-muted">Rất tiếc, không tìm thấy sản phẩm phù hợp!</h5>\n' +
      '              <p class="text-muted">Thử tìm lại với các từ khóa khác như: <i>Serum, Son, Kem chống nắng, Dầu gội...</i></p>\n' +
      '              <a href="products.html" class="btn btn-primary-custom mt-3">Xem tất cả sản phẩm</a>\n' +
      '            </div>\n' +
      '          </div>\n' + '        ';
      }
      $('#searchResultsContainer').html(html);
    }
    executeSearch();
    $('#searchPageForm').on('submit', function (e) {
      e.preventDefault();
      var newKw = ($('#searchPageInput').val() || '').trim();
      try {
        localStorage.setItem('searchKeyword', newKw);
      } catch (err) {}
      var newUrl = newKw ? '' + window.location.pathname + '?q=' + encodeURIComponent(newKw) : window.location.pathname;
      window.history.pushState({}, '', newUrl);
      executeSearch();
    });
  }
});
