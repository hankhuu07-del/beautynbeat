# BEAUTY N BEAT

Bài tập lớn môn Hệ thống và Công nghệ Web  
Đề tài 03: Website giới thiệu, bán mỹ phẩm trực tuyến.

## Website

GitHub Pages:

https://hankhuu07-del.github.io/beautynbeat/

## Công nghệ sử dụng

- HTML5
- CSS3
- Bootstrap
- JavaScript
- jQuery
- Regular Expression
- LocalStorage
- Responsive Web Design

Không sử dụng cơ sở dữ liệu.

---

## Phân công

| Thành viên | Phụ trách | Branch |
|---|---|---|
| A | About, Sitemap, layout chung, tích hợp | feature/A-common |
| B | Home, Search | feature/B-home-search |
| C | Products, Product Detail | feature/C-product |
| D | Cart, Checkout | feature/D-cart-checkout |
| E | Login, Register | feature/E-account |
| F | News, News Detail | feature/F-news |

---

## Các trang của website

1. index.html
2. sitemap.html
3. products.html
4. search.html
5. product-detail.html
6. cart.html
7. checkout.html
8. login.html
9. register.html
10. about.html
11. news.html
12. news-detail.html

---

## Quy tắc Git

- Không code trực tiếp trên branch main.
- Mỗi thành viên làm trên branch được phân công.
- Hoàn thành chức năng thì Push lên GitHub.
- Tạo Pull Request về main.
- Leader kiểm tra trước khi Merge.
- Không tự ý đổi tên thư mục hoặc file chung.
- Không tự ý sửa common.css nếu chưa thống nhất.

---

## LocalStorage

Các key thống nhất:

| Key | Dùng để làm gì |
|---|---|
| `products` | lưu danh sách sản phẩm |
| `news` | lưu danh sách tin tức |
| `users` | lưu các tài khoản đã đăng ký |
| `currentUser` | người đang đăng nhập |
| `cart` | giỏ hàng hiện tại |
| `orders` | các đơn hàng đã tạo |
| `selectedProductId` | sản phẩm vừa được chọn để mở trang chi tiết |
| `selectedNewsId` | bài tin vừa được chọn |
| `searchKeyword` | từ khóa tìm kiếm |

---

## Danh mục sản phẩm

- skincare
- makeup
- body
- hair
