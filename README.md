# BEAUTY N BEAT

Bài tập lớn môn Hệ thống và Công nghệ Web · Đề tài 03: Website giới thiệu và bán mỹ phẩm trực tuyến · Nhóm 6 thành viên (A–F).

Website tham khảo bố cục của Hasaki (header, thanh menu, card sản phẩm, khu khuyến mãi) nhưng dùng tên và giao diện riêng, không sao chép nguyên mẫu.

**Bản chạy thử:** https://hankhuu07-del.github.io/beautynbeat/

## Công nghệ

HTML5 · CSS3 · Bootstrap · JavaScript · jQuery · Regular Expression · LocalStorage · Responsive.
Không dùng cơ sở dữ liệu, không có backend. Đăng nhập và thanh toán chỉ là mô phỏng.

## Phân công

| Người | Trang | File riêng | Branch |
|---|---|---|---|
| A | about, sitemap + layout chung, tích hợp | `common.css`, `common.js`, `assets/vendor/` | `feature/A-common` |
| B | index, search | `home.css`, `home.js` | `feature/B-home-search` |
| C | products, product-detail | `product.css`, `product.js`, `assets/data/products.js` | `feature/C-product` |
| D | cart, checkout | `cart.css`, `cart.js` | `feature/D-cart-checkout` |
| E | login, register | `account.css`, `account.js` | `feature/E-account` |
| F | news, news-detail | `news.css`, `news.js`, `assets/data/news.js` | `feature/F-news` |

Mỗi người **chỉ sửa file của mình**. Cần sửa file của người khác thì nhắn người đó (hoặc A với file chung) trước.

## Cách nộp bài lên GitHub (không cần cài Git)

1. Đăng nhập GitHub bằng tài khoản đã được A mời vào repo.
2. Mở repo, bấm nút chọn branch (đang ghi `main`), chọn **branch của mình** trong bảng trên.
3. Bấm **Add file → Upload files**, kéo các file của mình vào, giữ đúng thư mục (ví dụ `home.css` phải nằm trong `assets/css/`).
4. Ghi một dòng mô tả ngắn ở ô Commit (ví dụ "B: xong carousel trang chủ"), bấm **Commit changes**.
5. Làm xong thì bấm **Pull request** về `main` và nhắn A. A kiểm tra rồi mới merge.

**Không làm:** commit thẳng vào `main`, upload file không phải của mình, đổi tên hoặc di chuyển file và thư mục chung.

## Cấu trúc thư mục

```
beautynbeat/
├── index.html, search.html, products.html, product-detail.html,
│   cart.html, checkout.html, login.html, register.html,
│   news.html, news-detail.html, about.html, sitemap.html
└── assets/
    ├── css/      common.css + css riêng của từng người
    ├── js/       common.js + js riêng của từng người
    ├── data/     products.js, news.js
    └── vendor/   bootstrap/, jquery/ (đã tải sẵn, dùng local)
```

## Khung mọi trang phải theo

Thứ tự nạp quan trọng, sai thứ tự là lỗi hay gặp nhất. Thay `xxx` bằng tên file riêng của bạn:

```html
<head>
  <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/common.css">   <!-- common trước -->
  <link rel="stylesheet" href="assets/css/xxx.css">      <!-- css riêng sau -->
</head>
<body>
  ...
  <script src="assets/vendor/jquery/jquery.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/data/products.js"></script>        <!-- chỉ nạp nếu trang cần -->
  <script src="assets/data/news.js"></script>            <!-- chỉ nạp nếu trang cần -->
  <script src="assets/js/common.js"></script>
  <script src="assets/js/xxx.js"></script>               <!-- js riêng cuối cùng -->
</body>
```

Header và footer do A làm, các trang dùng chung, không tự sao chép thành bản khác.

## Màu sắc

Màu đã khai báo thành biến trong `common.css`. **Chỉ dùng biến, không tự gõ mã màu.**
Ví dụ: `background: var(--primary);`

| Biến | Mã | Dùng cho |
|---|---|---|
| `--primary` | #56745E | Nút chính, header, tiêu đề nhấn |
| `--primary-light` | #83A987 | Hover, viền nhấn, nền nhạt |
| `--fresh` | #A8C84A | Nhãn mới, điểm nhấn nhỏ |
| `--blush` | #F1BBC7 | Nền nhãn, banner nhẹ |
| `--sale` | #E55C4B | Giá khuyến mãi, nhãn giảm giá |
| `--sale-dark` | #B84E68 | Hover của màu sale |
| `--text` | #382923 | Chữ chính |
| `--surface` | #F7F6F1 | Nền khu vực, nền card |
| `--white` | #FFFFFF | Nền trang |
| `--border` | #E4E4E4 | Đường viền |

## Dữ liệu dùng chung

**File dữ liệu** (không phải LocalStorage), mỗi file khai báo một biến toàn cục:

| File | Biến toàn cục | Người quản lý | Ai đọc |
|---|---|---|---|
| `assets/data/products.js` | `PRODUCTS` | C | B, C, D |
| `assets/data/news.js` | `NEWS` | F | B, F |

- Sản phẩm: `id`, `name`, `category` (skincare / makeup / body / hair), `brand`, `price`, `oldPrice`, `image`, `description`, `stock`.
- Bài viết: `id`, `title`, `category`, `date`, `image`, `summary`, `content`.
- Giá tiền là **số nguyên VND** (ví dụ `185000`), `id` giữ cùng kiểu dữ liệu ở mọi trang.

**LocalStorage** (lưu trên trình duyệt):

| Key | Nội dung | Ghi | Đọc |
|---|---|---|---|
| `selectedProductId` | ID sản phẩm vừa bấm | B, C | C |
| `selectedNewsId` | ID bài vừa bấm | F | F |
| `searchKeyword` | Từ khóa tìm kiếm | B | B |
| `cart` | Mảng `{productId, quantity}` | C, D | D, A (đếm số món) |
| `orders` | Mảng đơn hàng đã đặt | D | D |
| `users` | Tài khoản đã đăng ký | E | E |
| `currentUser` | Người đang đăng nhập (chỉ tên hiển thị) | E | E, A |

Khi đọc LocalStorage phải xử lý trường hợp chưa có key hoặc dữ liệu lỗi: dùng mảng rỗng hoặc giá trị mặc định, **không để trang trắng**.

## Phạm vi

- 12 trang: index, search, products, product-detail, cart, checkout, login, register, news, news-detail, about, sitemap.
- 4 danh mục: skincare, makeup, body, hair. Mục News hiển thị tên "Cẩm nang làm đẹp".
