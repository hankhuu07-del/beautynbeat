// Bản sao theo tài liệu cô: var, function, if/for, mảng và DOM/jQuery.
// Giữ tên hàm, cấu trúc trang và dữ liệu để đối chiếu bản nhóm nộp.
$(function () {
  "use strict";

  // Sao chép để không thay đổi dữ liệu NEWS dùng chung.
  var articles = typeof NEWS !== 'undefined' && Array.isArray(NEWS) ? NEWS.slice() : [];

  // Bài mới nhất lên đầu; cùng ngày thì xếp theo id.
  articles.sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date)) || String(a.id).localeCompare(String(b.id));
  });
  var categories = {
    skincare: 'Chăm sóc da',
    makeup: 'Trang điểm',
    body: 'Chăm sóc cơ thể',
    hair: 'Chăm sóc tóc'
  };

  /* ==================== HÀM DÙNG CHUNG ==================== */

  // Chuyển HTML nội dung thành văn bản để tìm kiếm.
  function plainText(html) {
    var spaced = String(html || '').replace(/<\/?(p|li|ul|ol|h[1-6]|div|br|tr|td|th|blockquote|section|article)\b[^>]*>/gi, ' $&');
    var box = document.createElement('div');
    box.innerHTML = spaced;
    return box.textContent || '';
  }

  // Bỏ dấu tiếng Việt, chữ thường, ký tự lạ thành khoảng trắng.
  function normalizeText(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function formatDate(value) {
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
    return match ? '' + match[3] + '.' + match[2] + '.' + match[1] : String(value || '');
  }
  function articleUrl(article) {
    return 'news-detail.html?id=' + encodeURIComponent(article.id);
  }
  function categoryBadge(category) {
    var $badge = $('<span>', {
      class: 'news-category',
      text: categories[category] || 'Cẩm nang'
    });
    if (categories[category]) {
      $badge.addClass('news-category-' + category);
    }
    return $badge;
  }
  function createCard(article) {
    var url = articleUrl(article);
    var $column = $('<div>', {
      class: 'col'
    });
    var $card = $('<article>', {
      class: 'card news-card h-100'
    });
    var $imageLink = $('<a>', {
      class: 'news-card-image',
      href: url,
      tabindex: '-1',
      'aria-hidden': 'true'
    });
    $('<img>', {
      src: article.image,
      alt: '',
      loading: 'lazy',
      decoding: 'async'
    }).one('error', function () {
      $(this).prop('hidden', true);
    }).appendTo($imageLink);
    var $body = $('<div>', {
      class: 'card-body news-card-body'
    });
    var $meta = $('<div>', {
      class: 'news-card-meta'
    });
    $meta.append(categoryBadge(article.category));
    $('<time>', {
      class: 'news-card-date',
      datetime: article.date,
      text: formatDate(article.date)
    }).appendTo($meta);
    var $title = $('<h3>', {
      class: 'news-card-title'
    });
    $('<a>', {
      href: url,
      text: article.title
    }).appendTo($title);
    var $summary = $('<p>', {
      class: 'news-card-summary',
      text: article.summary || ''
    });
    var $readMore = $('<a>', {
      class: 'news-card-link',
      href: url,
      text: 'Đọc tiếp →',
      'aria-label': 'Đọc tiếp: ' + article.title
    });
    $body.append($meta, $title, $summary, $readMore);
    $card.append($imageLink, $body);
    $column.append($card);
    return $column;
  }

  /* ==================== TRANG DANH SÁCH ==================== */

  if ($('#news-list').length) {
    // Số bài mỗi trang lấy từ data-page-size trong HTML.
    var pageSize = Number($('.news-articles').attr('data-page-size')) || 12;
    var currentPage = 1;
    var selectedCategory = 'all';
    var keyword = '';
    var searchTimer = null;
    var $list = $('#news-list');
    var $empty = $('#news-empty');
    var $count = $('#news-result-count');
    var $pagination = $('#news-pagination');
    var $paginationNav = $('#news-pagination-nav');

    // Chuẩn bị dữ liệu tìm kiếm một lần.
    var searchableArticles = [];
    for (var i = 0; i < articles.length; i++) {
      var article = articles[i];
      searchableArticles.push({
        article: article,
        text: normalizeText(article.title + ' ' + article.summary + ' ' + (categories[article.category] || article.category) + ' ' + plainText(article.content))
      });
    }
    function getFilteredArticles() {
      var words = normalizeText(keyword).split(' ');
      var result = [];
      for (var i = 0; i < searchableArticles.length; i++) {
        var item = searchableArticles[i];
        if (selectedCategory !== 'all' && item.article.category !== selectedCategory) continue;
        var matches = true;
        for (var j = 0; j < words.length; j++) {
          if (item.text.indexOf(words[j]) === -1) matches = false;
        }
        if (matches) result.push(item.article);
      }
      return result;
    }
    function addPageButton(label, page, options) {
      var settings = options || {};
      var $item = $('<li>', {
        class: 'page-item'
      });
      var $button = $('<button>', {
        type: 'button',
        class: 'page-link',
        text: label,
        'data-page': page,
        'aria-label': settings.ariaLabel || 'Trang ' + page
      });
      if (settings.active) {
        $item.addClass('active');
        $button.attr('aria-current', 'page');
      }
      if (settings.disabled) {
        $item.addClass('disabled');
        $button.prop('disabled', true);
      }
      $item.append($button);
      $pagination.append($item);
    }
    function renderPagination(totalPages) {
      $pagination.empty();
      $paginationNav.prop('hidden', totalPages <= 1);
      if (totalPages <= 1) {
        return;
      }
      addPageButton('‹', currentPage - 1, {
        disabled: currentPage === 1,
        ariaLabel: 'Trang trước'
      });
      for (var page = 1; page <= totalPages; page++) {
        addPageButton(String(page), page, {
          active: page === currentPage
        });
      }
      addPageButton('›', currentPage + 1, {
        disabled: currentPage === totalPages,
        ariaLabel: 'Trang sau'
      });
    }
    function renderList() {
      var filtered = getFilteredArticles();
      var total = filtered.length;
      var totalPages = Math.ceil(total / pageSize);
      currentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
      var start = (currentPage - 1) * pageSize;
      var visibleArticles = filtered.slice(start, start + pageSize);
      $list.empty();
      $empty.prop('hidden', total > 0);
      if (total === 0) {
        $count.text('Tìm thấy 0 bài viết');
      } else {
        $count.text('Hiển thị ' + (start + 1) + '–' + (start + visibleArticles.length) + (' trong ' + total + ' bài viết'));
        for (var i = 0; i < visibleArticles.length; i++) {
          $list.append(createCard(visibleArticles[i]));
        }
      }
      renderPagination(totalPages);
    }
    function updateFilters() {
      $('.news-filter').each(function () {
        var isSelected = $(this).attr('data-category') === selectedCategory;
        $(this).toggleClass('active', isSelected).attr('aria-pressed', String(isSelected));
      });
    }
    function applySearch() {
      clearTimeout(searchTimer);
      keyword = String($('#news-search-input').val() || '').trim();
      currentPage = 1;
      renderList();
    }

    // Tìm kiếm khi bấm nút hoặc nhấn Enter.
    $('#news-search-form').on('submit', function (event) {
      event.preventDefault();
      applySearch();
    });

    // Chờ 250ms sau lần gõ cuối rồi cập nhật kết quả.
    $('#news-search-input').on('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(applySearch, 250);
    });

    // Lọc chủ đề kết hợp với từ khóa hiện tại.
    $('.news-filter').on('click', function () {
      selectedCategory = $(this).attr('data-category') || 'all';
      currentPage = 1;
      updateFilters();
      renderList();
    });

    // Chuyển trang.
    $pagination.on('click', 'button[data-page]', function () {
      if (this.disabled) {
        return;
      }
      var targetPage = Number($(this).attr('data-page'));
      if (isNaN(targetPage) || targetPage % 1 !== 0) {
        return;
      }
      currentPage = targetPage;
      renderList();
      var title = document.getElementById('news-list-title');
      if (title) {
        title.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start'
        });
        title.setAttribute('tabindex', '-1');
        title.focus({
          preventScroll: true
        });
      }
    });

    // Xóa từ khóa và trở về tất cả chủ đề.
    $('#news-reset').on('click', function () {
      clearTimeout(searchTimer);
      keyword = '';
      selectedCategory = 'all';
      currentPage = 1;
      $('#news-search-input').val('');
      updateFilters();
      renderList();
      $('#news-search-input').trigger('focus');
    });
    updateFilters();
    renderList();
  }

  /* ==================== TRANG CHI TIẾT ==================== */

  if ($('#news-detail').length) {
    var id = '';
    var pairs = window.location.search.substring(1).split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');
      if (pairs[i].substring(0, pos) === 'id') {
        id = decodeURIComponent(pairs[i].substring(pos + 1).replace(/\+/g, ' '));
        break;
      }
    }
    if (!id) {
      try {
        id = localStorage.getItem('selectedNewsId');
      } catch (e) {}
    }
    var article = null;
    for (var i = 0; i < articles.length; i++) {
      if (String(articles[i].id) === id) {
        article = articles[i];
        break;
      }
    }
    var $content = $('#news-detail-content');
    var $related = $('#news-related-list');
    var $error = $('#news-detail-error');

    // ID thiếu hoặc không tồn tại.
    if (!article) {
      document.title = 'Không tìm thấy bài viết | Beauty N Beat';
      $content.empty().prop('hidden', true);
      $related.empty();
      $('#news-related').prop('hidden', true);
      $error.empty().prop('hidden', false).append($('<h1>', {
        class: 'h4 mb-3',
        text: 'Không tìm thấy bài viết'
      }), $('<p>', {
        class: 'mb-0',
        text: 'Bài viết không tồn tại hoặc đường dẫn không hợp lệ.'
      }));
      return;
    }
    document.title = article.title + ' | Beauty N Beat';

    // Lưu bài đang đọc để trang chủ (B) đọc cùng nguồn dữ liệu NEWS.
    try {
      localStorage.setItem('selectedNewsId', String(article.id));
    } catch (error) {
      // Trình duyệt chặn localStorage: bỏ qua.
    }
    $error.prop('hidden', true);
    $content.empty().prop('hidden', false);
    var $meta = $('<div>', {
      class: 'news-card-meta mb-3'
    }).append(categoryBadge(article.category), $('<time>', {
      class: 'news-card-date',
      datetime: article.date,
      text: formatDate(article.date)
    }));
    var $title = $('<h1>', {
      class: 'news-detail-title mb-3',
      text: article.title
    });
    var $summary = $('<p>', {
      class: 'news-detail-summary lead mb-4',
      text: article.summary || ''
    });
    var $image = $('<img>', {
      class: 'news-detail-image img-fluid rounded-4 shadow-sm mb-4',
      src: article.image,
      alt: article.title
    }).one('error', function () {
      $(this).prop('hidden', true);
    });

    // content là HTML do nhóm quản lý trong data/news.js.
    var $articleBody = $('<div>', {
      class: 'news-detail-body'
    }).html(article.content || '');
    $content.append($meta, $title, $summary, $image, $articleBody);

    // Tối đa 3 bài liên quan cùng chủ đề, loại bỏ bài đang đọc.
    var relatedArticles = [];
    for (var i = 0; i < articles.length; i++) {
      var item = articles[i];
      if (item.category === article.category && String(item.id) !== String(article.id)) {
        relatedArticles.push(item);
        if (relatedArticles.length === 3) break;
      }
    }
    $related.empty();
    $('#news-related').prop('hidden', relatedArticles.length === 0);
    for (var j = 0; j < relatedArticles.length; j++) {
      $related.append(createCard(relatedArticles[j]));
    }
  }
});
