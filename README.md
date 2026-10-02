# BEAUTY N BEAT

Bài tập lớn môn Hệ thống và Công nghệ Web · Đề tài 03: Website giới thiệu và bán mỹ phẩm trực tuyến · Nhóm 6 thành viên (A–F).

Website tham khảo bố cục của Hasaki (header, thanh menu, card sản phẩm, khu khuyến mãi) nhưng dùng tên và giao diện riêng, không sao chép nguyên mẫu.

**Bản chạy thử:** https://hankhuu07-del.github.io/beautynbeat/

## Công nghệ

HTML5 · CSS3 · Bootstrap · JavaScript · jQuery · Regular Expression · LocalStorage · Responsive.
Không dùng cơ sở dữ liệu, không có backend. Đăng nhập và thanh toán chỉ là mô phỏng.

## Phân công

| Người | Trang | File riêng |
|---|---|---|
| A | about, sitemap + layout chung, tích hợp | `common.css`, `common.js`, `assets/vendor/` |
| B | index, search | `home.css`, `home.js` |
| C | products, product-detail | `product.css`, `product.js`, `assets/data/products.js` |
| D | cart, checkout | `cart.css`, `cart.js` |
| E | login, register | `account.css`, `account.js` |
| F | news, news-detail | `news.css`, `news.js`, `assets/data/news.js` |

Mỗi người **chỉ sửa file của mình**. Cần sửa file của người khác thì nhắn người đó (hoặc A với file chung) trước.

## Cách làm và nộp bài

Thành viên B–F **không cần dùng Git**. Quy trình:

1. **Tải code về:** vào trang repo trên GitHub, bấm nút xanh **Code → Download ZIP**, giải nén ra máy.
2. **Làm bài:** mở cả thư mục bằng VS Code, chỉ sửa các file được giao cho mình (xem bảng phân công). Mở trang bằng trình duyệt để thử.
3. **Nộp bài:** gom các file của mình, **giữ đúng tên thư mục**, nén thành một file ZIP đặt tên theo mẫu `B_home-search.zip` (chữ cái của mình + tên phần việc). Upload vào thư mục Drive của nhóm: **[DÁN LINK DRIVE Ở ĐÂY]**.
4. **Báo cho A** qua nhóm chat là đã nộp, kèm một dòng ghi đã làm gì.
5. **A kiểm tra, ghép các phần và đưa lên GitHub.** Khi A cập nhật, thành viên tải lại ZIP mới nếu cần làm tiếp.

Ví dụ B nộp, trong file ZIP chỉ có:

```
index.html
search.html
assets/css/home.css
assets/js/home.js
assets/img/banners/banner-1.jpg
```

**Không làm:** nộp cả thư mục dự án, nộp file không phải của mình, đổi tên hoặc di chuyển file và thư mục chung, sửa `common.css`/`common.js` khi chưa báo A.

**Hạn nộp:** [GHI NGÀY GIỜ]. Nộp trễ làm A không kịp ghép và kiểm tra.

**Thứ tự nên nộp:** C và F nộp file dữ liệu (`products.js`, `news.js`) **sớm nhất**, vì B và D cần để chạy thử. Sau đó B, D, E, rồi A ghép cuối.

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
    ├── img/
    │   ├── banners/    ảnh banner trang chủ (B)
    │   ├── logo/       logo (A)
    │   ├── members/    ảnh thành viên cho trang about (A)
    │   ├── news/       ảnh bài Cẩm nang (F)
    │   └── products/   ảnh sản phẩm (C)
    └── vendor/   bootstrap/, jquery/ (dùng local)
```

Ảnh bỏ đúng thư mục của mình, đặt tên không dấu, không khoảng trắng (ví dụ `serum-vitamin-c.jpg`).

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
