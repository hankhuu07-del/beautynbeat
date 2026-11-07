/**
 * BEAUTY N BEAT - Phụ trách: D (cart, checkout)
 * Logic quản lý giỏ hàng, cập nhật số lượng, kiểm tra form bằng Regex, tạo đơn hàng.
 */

// =========================================================================
// HÀM TIỆN ÍCH DÙNG CHUNG
// =========================================================================

// Ảnh dự phòng (SVG nội bộ, không gọi ảnh online) khi sản phẩm thiếu ảnh hoặc ảnh lỗi
var NO_IMAGE = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'70\' height=\'70\'>' + '<rect width=\'100%\' height=\'100%\' fill=\'#f7f6f1\'/>' + '<text x=\'50%\' y=\'50%\' font-size=\'11\' fill=\'#7a7068\' text-anchor=\'middle\' dominant-baseline=\'middle\'>No image</text></svg>');

// Lấy giỏ hàng từ LocalStorage (an toàn, không để crash)
// Đổi ký tự đặc biệt khi ghép dữ liệu vào HTML.
function cartEscapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function getCart() {
  try {
    var raw = localStorage.getItem('cart');
    var cart = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(cart)) return [];
    return cart;
  } catch (e) {
    console.error('Lỗi đọc giỏ hàng từ LocalStorage:', e);
    return [];
  }
}

// Lưu lại giỏ hàng vào LocalStorage
function saveCart(cart) {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    alert('Không lưu được giỏ hàng. Vui lòng thử lại.');
    return false;
  }
  window.updateCartCount();
  return true;
}

// Tìm thông tin chi tiết sản phẩm theo ID từ mảng PRODUCTS của C
function findProduct(productId) {
  if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (String(PRODUCTS[i].id) === String(productId)) return PRODUCTS[i];
    }
  }
  return null;
}

// Định dạng tiền tệ VND
function formatCurrency(amount) {
  return Number(amount).toLocaleString('vi-VN') + ' ₫';
}

// =========================================================================
// LOGIC DÀNH CHO TRANG CART.HTML
// =========================================================================

// Kiểm tra giỏ trước khi chuyển trang hoặc lưu đơn.
function cartError(cart) {
  if (cart.length === 0) return 'Giỏ hàng đang trống.';
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    if (!item) return 'Dữ liệu giỏ hàng không hợp lệ. Vui lòng xóa và chọn lại.';
    var product = findProduct(item.productId);
    if (!product) return 'Có sản phẩm không còn trong danh sách. Vui lòng xóa khỏi giỏ.';
    var quantity = Number(item.quantity);
    if (!isFinite(quantity) || quantity < 1 || quantity % 1 !== 0) return 'Số lượng phải là số nguyên lớn hơn 0.';
    if (quantity > product.stock) return product.name + ': số lượng vượt quá tồn kho.';
  }
  return '';
}
function initCartPage() {
  var cartTableBody = document.getElementById('cart-table-body');
  var emptyView = document.getElementById('empty-cart-view');
  var filledView = document.getElementById('filled-cart-view');
  var subtotalEl = document.getElementById('subtotal-price');
  var totalEl = document.getElementById('total-price');
  var checkoutBtn = document.getElementById('btn-proceed-checkout');
  if (!cartTableBody) return; // Không ở trang cart.html

  var cart = getCart();
  var rendering = false;
  function renderCart() {
    if (rendering) return;
    rendering = true;
    cart = getCart();
    if (cart.length === 0) {
      emptyView.classList.remove('d-none');
      filledView.classList.add('d-none');
      subtotalEl.textContent = '0 đ';
      totalEl.textContent = '0 đ';
      checkoutBtn.classList.add('disabled');
      rendering = false;
      return;
    }
    emptyView.classList.add('d-none');
    filledView.classList.remove('d-none');
    checkoutBtn.classList.remove('disabled');
    var html = '';
    var totalOrder = 0;
    for (var index = 0; index < cart.length; index++) {
      var item = cart[index] || {};
      var product = findProduct(item.productId);

      // Fallback nếu sản phẩm đã bị xóa khỏi kho
      var name = product ? product.name : 'Sản phẩm (' + item.productId + ')';
      var price = product ? product.price : 0; // Luôn tính giá theo product.price của C
      var image = product ? product.image : NO_IMAGE;
      var maxStock = product ? product.stock : 0;
      var quantity = Number(item.quantity);
      if (!isFinite(quantity) || quantity < 1 || quantity % 1 !== 0) quantity = 0;
      var subtotal = price * quantity;
      totalOrder += subtotal;
      // Ghép từng dòng HTML để dễ thấy cột sản phẩm, số lượng và thành tiền.
      html += '<tr><td><div class="d-flex align-items-center gap-3">';
      html += '<img src="' + cartEscapeHtml(image) + '" alt="' + cartEscapeHtml(name) + '" class="cart-item-img">';
      html += '<div><span class="fw-semibold text-dark">' + cartEscapeHtml(name) + '</span>';
      html += '<div class="text-muted small">Mã: ' + cartEscapeHtml(item.productId) + '</div></div></div></td>';
      html += '<td class="fw-semibold">' + formatCurrency(price) + '</td>';
      html += '<td><div class="qty-control">';
      html += '<button type="button" onclick="changeQty(' + index + ', -1)">-</button>';
      html += '<input type="number" value="' + quantity + '" min="1" max="' + maxStock + '" onchange="setQty(' + index + ', this.value)">';
      html += '<button type="button" onclick="changeQty(' + index + ', 1)">+</button></div></td>';
      html += '<td class="fw-bold text-sale">' + formatCurrency(subtotal) + '</td>';
      html += '<td><button type="button" class="btn btn-sm btn-outline-danger" onclick="removeItem(' + index + ')">Xóa</button></td></tr>';
    }
    cartTableBody.innerHTML = html;
    // Ảnh lỗi thì thay bằng ảnh dự phòng nội bộ (chỉ thử 1 lần để không lặp vô hạn)
    var images = cartTableBody.querySelectorAll('.cart-item-img');
    for (var i = 0; i < images.length; i++) {
      images[i].onerror = function () {
        this.onerror = null;
        this.src = NO_IMAGE;
      };
    }
    subtotalEl.textContent = formatCurrency(totalOrder);
    totalEl.textContent = formatCurrency(totalOrder);
    rendering = false;
  }

  // Gán hàm vào window để gọi từ thuộc tính onclick
  window.changeQty = function (index, delta) {
    cart = getCart();
    if (!cart[index]) {
      renderCart();
      return;
    }
    var quantity = Number(cart[index].quantity) + delta;
    if (quantity < 1) quantity = 1;
    window.setQty(index, quantity);
  };
  window.setQty = function (index, value) {
    if (rendering) return;
    cart = getCart();
    if (!cart[index]) {
      renderCart();
      return;
    }
    var product = findProduct(cart[index].productId);
    if (!product || product.stock < 1) {
      alert('Sản phẩm không còn hàng. Vui lòng xóa khỏi giỏ.');
      renderCart();
      return;
    }
    var quantity = Number(value);
    if (!isFinite(quantity) || quantity < 1 || quantity % 1 !== 0) {
      alert('Số lượng phải là số nguyên lớn hơn 0.');
      renderCart();
      return;
    }
    if (quantity > product.stock) {
      alert('Số lượng vượt quá tồn kho (' + product.stock + ').');
      quantity = product.stock;
    }
    cart[index].quantity = quantity;
    saveCart(cart);
    renderCart();
  };
  window.removeItem = function (index) {
    if (confirm('Bạn có chắc chắn muốn bỏ sản phẩm này khỏi giỏ?')) {
      cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    }
  };
  checkoutBtn.addEventListener('click', function (event) {
    var message = cartError(getCart());
    if (message) {
      event.preventDefault();
      alert(message);
    }
  });
  window.addEventListener('storage', function (event) {
    if (event.key === 'cart' || event.key === null) {
      renderCart();
      window.updateCartCount();
    }
  });
  renderCart();
}

// =========================================================================
// LOGIC DÀNH CHO TRANG CHECKOUT.HTML
// =========================================================================
function initCheckoutPage() {
  var form = document.getElementById('order-form');
  var itemsListEl = document.getElementById('checkout-items-list');
  var subtotalEl = document.getElementById('checkout-subtotal');
  var totalEl = document.getElementById('checkout-total');
  var formView = document.getElementById('checkout-form-view');
  var successView = document.getElementById('checkout-success-view');
  if (!form) return; // Không ở trang checkout.html

  var cart = getCart();
  var message = cartError(cart);
  if (message) {
    alert(message + ' Vui lòng kiểm tra lại giỏ hàng.');
    window.location.href = 'cart.html';
    return;
  }
  var displayedCart = JSON.stringify(cart);
  var submitted = false;

  // Render danh sách sản phẩm tóm tắt
  var totalOrder = 0;
  var itemsHtml = '';
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var product = findProduct(item.productId);
    var name = product ? product.name : 'Sản phẩm (' + item.productId + ')';
    var price = product ? product.price : 0;
    var quantity = Number(item.quantity);
    if (!isFinite(quantity) || quantity < 1 || quantity % 1 !== 0) quantity = 0;
    var subtotal = price * quantity;
    totalOrder += subtotal;
    itemsHtml += '<div class="d-flex justify-content-between align-items-center mb-2">';
    itemsHtml += '<div class="text-truncate pe-2 checkout-item-name">';
    itemsHtml += '<span class="fw-semibold">' + cartEscapeHtml(name) + '</span>';
    itemsHtml += '<div class="text-muted small">SL: x' + item.quantity + '</div></div>';
    itemsHtml += '<div class="fw-semibold">' + formatCurrency(subtotal) + '</div></div>';
  }
  itemsListEl.innerHTML = itemsHtml;
  subtotalEl.textContent = formatCurrency(totalOrder);
  totalEl.textContent = formatCurrency(totalOrder);

  // Validate bằng Regular Expression
  function validateField(id, regex, emptyMsg, invalidMsg) {
    var input = document.getElementById(id);
    var err = document.getElementById('err-' + id);
    var val = input.value.trim();
    if (!val) {
      input.classList.add('is-invalid');
      err.textContent = emptyMsg;
      err.style.display = 'block';
      return false;
    }
    if (regex && !regex.test(val)) {
      input.classList.add('is-invalid');
      err.textContent = invalidMsg;
      err.style.display = 'block';
      return false;
    }
    input.classList.remove('is-invalid');
    err.style.display = 'none';
    return true;
  }

  // Bắt sự kiện submit form đặt hàng
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitted) return;

    // Regex quy chuẩn:
    // Họ tên: chỉ gồm chữ cái (có dấu), tối thiểu 2 từ ngăn cách bằng khoảng trắng
    var nameRegex = /^[a-zA-ZÀ-ỹ]+(\s+[a-zA-ZÀ-ỹ]+)+$/;
    // SĐT Việt Nam: 10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09
    var phoneRegex = /^(0)(3|5|7|8|9)[0-9]{8}$/;
    // Email (nếu có nhập)
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = true;
    isValid = validateField('fullName', nameRegex, 'Vui lòng nhập họ và tên.', 'Họ và tên phải có ít nhất 2 từ và chỉ gồm chữ cái.') && isValid;
    isValid = validateField('phoneNumber', phoneRegex, 'Vui lòng nhập số điện thoại.', 'Số điện thoại không đúng định dạng (10 số).') && isValid;
    isValid = validateField('address', null, 'Vui lòng nhập địa chỉ nhận hàng chi tiết.') && isValid;
    var emailInput = document.getElementById('email');
    var emailError = document.getElementById('err-email');
    emailInput.classList.remove('is-invalid');
    emailError.textContent = '';
    emailError.style.display = 'none';
    var emailVal = emailInput.value.trim();
    if (emailVal && !emailRegex.test(emailVal)) {
      document.getElementById('email').classList.add('is-invalid');
      var errEmail = document.getElementById('err-email');
      errEmail.textContent = 'Định dạng email không hợp lệ.';
      errEmail.style.display = 'block';
      isValid = false;
    }
    if (!isValid) return;
    var currentCart = getCart();
    if (JSON.stringify(currentCart) !== displayedCart || cartError(currentCart)) {
      alert('Giỏ hàng đã thay đổi. Vui lòng kiểm tra lại trước khi đặt hàng.');
      window.location.href = 'cart.html';
      return;
    }
    // Duyệt mảng để tạo từng dòng chi tiết đơn hàng.
    var orderItems = [];
    for (var i = 0; i < currentCart.length; i++) {
      var product = findProduct(currentCart[i].productId);
      orderItems.push({
        productId: currentCart[i].productId,
        quantity: Number(currentCart[i].quantity),
        unitPrice: product.price
      });
    }

    // Thu thập dữ liệu để lưu đơn vào orders
    var orderData = {
      orderId: 'ORD-' + Date.now(),
      createdAt: new Date().toISOString(),
      customer: {
        fullName: document.getElementById('fullName').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
        email: emailVal,
        address: document.getElementById('address').value.trim(),
        notes: document.getElementById('notes').value.trim(),
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
      },
      items: orderItems,
      totalAmount: totalOrder
    };

    // Lưu vào LocalStorage 'orders'
    try {
      var orders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (!Array.isArray(orders)) throw new Error('Dữ liệu đơn hàng không hợp lệ.');
      orders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (err) {
      alert('Không lưu được đơn hàng. Giỏ hàng vẫn được giữ, bạn vui lòng thử lại.');
      return;
    }
    submitted = true;

    // Chỉ xóa giỏ sau khi đã lưu đơn thành công
    localStorage.removeItem('cart');
    window.updateCartCount();

    // Hiển thị thông báo thành công
    formView.classList.add('d-none');
    successView.classList.remove('d-none');
    document.getElementById('order-code-display').textContent = orderData.orderId;
    window.scrollTo(0, 0);
  });
}

// Khởi chạy khi DOM load xong
document.addEventListener('DOMContentLoaded', function () {
  initCartPage();
  initCheckoutPage();
});
