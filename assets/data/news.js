// Bản sao theo tài liệu cô: var, function, if/for, mảng và DOM/jQuery.
// Giữ tên hàm, cấu trúc trang và dữ liệu để đối chiếu bản nhóm nộp.
var NEWS = [{
  id: 'lam-sach-da',
  category: 'skincare',
  title: 'Làm sạch da: rửa mặt và tẩy trang đúng nhu cầu',
  summary: 'Phân biệt rửa mặt với tẩy trang, chọn cách làm sạch phù hợp và tránh cảm giác khô căng sau khi rửa.',
  date: '2025-10-09',
  image: 'assets/img/news/lam-sach-da.jpg',
  content: '\n' +
      '            <h2>Da sạch không cần phải khô căng</h2>\n' +
      '            <p>Mục tiêu của làm sạch là loại bỏ bụi bẩn, dầu thừa và sản phẩm trên da mà vẫn giữ cảm giác dễ chịu. Một loại sữa rửa mặt khiến da căng rít, đỏ hoặc châm chích sau mỗi lần dùng có thể chưa phù hợp. Đừng đánh giá khả năng làm sạch chỉ qua lượng bọt hoặc cảm giác mát lạnh.</p>\n' +
      '\n' +
      '            <h2>Khi nào cần tẩy trang?</h2>\n' +
      '            <p>Khi có trang điểm hoặc dùng chống nắng khó rửa trôi, chọn sản phẩm tẩy trang có khả năng loại bỏ lớp đó. Với dầu hoặc sáp cần nhũ hóa, thực hiện đúng bước thêm nước và rửa lại trên nhãn. Với nước tẩy trang, dùng bông sạch và lau nhẹ; không chà liên tục để cố lấy hết màu. Có thể rửa tiếp bằng sữa rửa mặt dịu nhẹ nếu cần, nhưng làm sạch hai bước không bắt buộc cho mọi người.</p>\n' +
      '\n' +
      '            <h2>Thao tác rửa mặt</h2>\n' +
      '            <p>Làm ướt mặt bằng nước ấm vừa, tán sản phẩm bằng đầu ngón tay rồi rửa sạch. Tránh nước quá nóng, bàn chải cứng và khăn thô. Thấm khô bằng khăn sạch, sau đó dưỡng ẩm. Thông thường, rửa sáng, tối và sau khi ra nhiều mồ hôi; điều chỉnh khi da quá khô hoặc có hướng dẫn riêng.</p>\n' +
      '\n' +
      '            <h2>Sai lầm cần tránh</h2>\n' +
      '            <p>Rửa nhiều lần chỉ vì da bóng dầu, dùng móng tay cào hoặc ngủ với lớp trang điểm đều là thói quen nên sửa. Nếu sau khi đổi sang cách làm sạch nhẹ nhàng da vẫn đỏ rát kéo dài, cần tìm nguyên nhân thay vì tăng độ mạnh của sản phẩm.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/skin-care-basics/care/face-washing-101"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: Face washing 101\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'duong-am',
  category: 'skincare',
  title: 'Dưỡng ẩm cho da dầu, da khô và da hỗn hợp',
  summary: 'Chọn kết cấu theo nhu cầu thực tế và điều chỉnh lượng thoa ở từng vùng da.',
  date: '2026-10-01',
  image: 'assets/img/news/duong-am.jpg',
  content: '\n' +
      '            <h2>Da dầu vẫn có thể cần dưỡng ẩm</h2>\n' +
      '            <p>Bóng dầu không đồng nghĩa với việc da luôn đủ ẩm. Hãy quan sát thêm cảm giác căng, bong tróc hoặc khó chịu. Người dễ nổi mụn có thể bắt đầu với sản phẩm ghi non-comedogenic, nhưng nhãn này không bảo đảm mọi làn da đều hợp. Không cần bỏ dưỡng chỉ vì vùng mũi đổ dầu.</p>\n' +
      '\n' +
      '            <h2>Chọn kết cấu phù hợp</h2>\n' +
      '            <p>Gel hoặc lotion thường thuận tiện khi muốn lớp dưỡng nhẹ; kem đặc hơn có thể phù hợp vùng khô. Đây là điểm bắt đầu để thử, không phải quy tắc cố định. Với da hỗn hợp, có thể thoa ít ở vùng chữ T và thêm tại hai má. Hương thơm, giá cao hay bao bì đẹp không cho biết sản phẩm sẽ hợp da hơn.</p>\n' +
      '\n' +
      '            <h2>Thoa ở thời điểm nào?</h2>\n' +
      '            <p>Dùng sau làm sạch, khi da còn hơi ẩm, trừ khi sản phẩm khác trong quy trình yêu cầu da khô. Tán lớp vừa đủ và quan sát cảm giác sau khi thoa. Buổi sáng, tiếp tục chống nắng theo nhãn. Không trộn kem dưỡng với chống nắng để làm loãng lớp bảo vệ.</p>\n' +
      '\n' +
      '            <h2>Theo dõi để điều chỉnh</h2>\n' +
      '            <p>Nếu sản phẩm bị vón khi đánh nền, thử giảm lượng dưỡng, chờ bề mặt ổn định và thay từng sản phẩm để tìm nguyên nhân. Nếu xuất hiện ngứa, đỏ hoặc nổi ban, ngừng sản phẩm nghi ngờ. Da khô nứt kéo dài cần được đánh giá, không chỉ xử lý bằng cách thoa thêm nhiều lớp.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: Skin care on a budget\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'chong-nang',
  category: 'skincare',
  title: 'Chống nắng hằng ngày: chọn đúng và thoa đủ',
  summary: 'Hiểu SPF, bảo vệ phổ rộng và cách thoa lại khi đi học, đi chơi hoặc vận động ngoài trời.',
  date: '2026-12-09',
  image: 'assets/img/news/chong-nang.jpg',
  content: '\n' +
      '            <h2>Đọc thông tin trên nhãn</h2>\n' +
      '            <p>Chọn chống nắng phổ rộng bảo vệ UVA và UVB, SPF từ 30 trở lên. Khi bơi hoặc đổ nhiều mồ hôi, ưu tiên loại có khả năng chống nước. SPF cao không có nghĩa là chỉ cần thoa một lần cho cả ngày, còn chống nước không đồng nghĩa với chống trôi vĩnh viễn.</p>\n' +
      '\n' +
      '            <h2>Thoa trước khi ra ngoài</h2>\n' +
      '            <p>Dùng theo lượng trên hướng dẫn và phủ đều vùng da lộ ra. Chú ý tai, cổ, đường viền hàm và mu bàn tay. Thoa trước khi ra ngoài khoảng 15 phút hoặc theo hướng dẫn cụ thể của sản phẩm. Quy tắc hai ngón tay chỉ là ước lượng vì kích thước ngón, đầu tuýp và vùng thoa khác nhau; không nên xem đó là phép đo chính xác cho mọi sản phẩm.</p>\n' +
      '\n' +
      '            <h2>Thoa lại theo hoàn cảnh</h2>\n' +
      '            <p>Khi ở ngoài trời, thoa lại khoảng mỗi hai giờ và sau khi bơi hoặc ra nhiều mồ hôi theo nhãn. Mang theo sản phẩm nếu lịch học có hoạt động ngoài trời. Kem nền hoặc phấn có SPF khó bảo đảm mức bảo vệ ghi trên nhãn khi chỉ dùng lượng trang điểm thông thường.</p>\n' +
      '\n' +
      '            <h2>Kết hợp che chắn</h2>\n' +
      '            <p>Dùng áo, mũ, kính và tìm bóng râm, nhất là khi phải đứng ngoài trời lâu. Nếu chống nắng làm cay mắt, tránh đưa vào mắt và cân nhắc công thức khác. Không cố giảm lượng thoa để khắc phục bết dính; thay kết cấu phù hợp sẽ thực tế hơn.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-apply-sunscreen"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: How to apply sunscreen\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'tay-te-bao-chet',
  category: 'skincare',
  title: 'Tẩy tế bào chết: cần thiết đến đâu và dùng thế nào?',
  summary: 'Phân biệt tẩy cơ học với sản phẩm acid, đồng thời tránh lạm dụng khiến da đỏ rát.',
  date: '2026-03-27',
  image: 'assets/img/news/tay-te-bao-chet.jpg',
  content: '\n' +
      '            <h2>Không phải bước bắt buộc</h2>\n' +
      '            <p>Nếu da ổn với làm sạch, dưỡng ẩm và chống nắng, bạn không cần thêm tẩy tế bào chết chỉ để đủ quy trình. Da đang bong tróc cũng không nhất thiết cần chà sạch; bong có thể đi kèm khô hoặc kích ứng. Trước tiên hãy xem lại những gì đang dùng.</p>\n' +
      '\n' +
      '            <h2>Hai cách thường gặp</h2>\n' +
      '            <p>Tẩy cơ học dùng hạt hoặc dụng cụ để tác động lên bề mặt; sản phẩm hóa học có thể sử dụng AHA hoặc BHA. Không chỉ nhìn nồng độ để so độ mạnh: công thức, cách dùng và tình trạng da đều ảnh hưởng. Sản phẩm rửa trôi và lưu trên da có hướng dẫn khác nhau.</p>\n' +
      '\n' +
      '            <h2>Bắt đầu thận trọng</h2>\n' +
      '            <p>Theo tần suất trên nhãn và bắt đầu ít khi thử sản phẩm mới. Không tự kết hợp nhiều acid, scrub và retinoid trong cùng buổi. Với sản phẩm rửa trôi, xả đúng thời gian; với loại lưu lại, không tự rửa sau một mốc tùy ý. Dưỡng ẩm sau đó và duy trì bảo vệ khỏi nắng.</p>\n' +
      '\n' +
      '            <h2>Dấu hiệu nên dừng</h2>\n' +
      '            <p>Tránh tẩy trên da cháy nắng, có vết thương hoặc đang đỏ rát. Châm chích mạnh, nóng kéo dài và bong nhiều không phải bằng chứng sản phẩm đang phát huy tác dụng. Ngừng bước nghi ngờ; nếu tình trạng không giảm, cần được tư vấn trước khi thử lại.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/skin-care-secrets/routine/safely-exfoliate-at-home"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: How to safely exfoliate at home\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'thu-san-pham-moi',
  category: 'skincare',
  title: 'Thử mỹ phẩm mới: thêm từng bước để dễ theo dõi',
  summary: 'Cách thử trên vùng nhỏ, ghi nhận phản ứng và xây dựng quy trình dễ duy trì.',
  date: '2026-10-09',
  image: 'assets/img/news/thu-san-pham-moi.jpg',
  content: '\n' +
      '            <h2>Đổi từng sản phẩm</h2>\n' +
      '            <p>Mua cả bộ rồi dùng đồng thời khiến bạn khó xác định sản phẩm nào gây khó chịu. Giữ các bước cơ bản đã hợp và thêm một món mới. Ghi lại ngày bắt đầu, lượng dùng và phản ứng; ảnh trong cùng ánh sáng có ích hơn việc so ảnh có bộ lọc.</p>\n' +
      '\n' +
      '            <h2>Thử trên vùng nhỏ</h2>\n' +
      '            <p>Với sản phẩm chăm sóc da thông thường phù hợp để thử tại nhà, có thể thử vùng nhỏ phía trong cánh tay trong 7–10 ngày theo hướng dẫn AAD. Giữ đúng lượng, thời gian lưu và cách rửa của sản phẩm. Không tăng tần suất quá nhãn đối với hoạt chất mạnh. Thuốc nhuộm tóc cần tuân thủ phép thử riêng do nhà sản xuất yêu cầu.</p>\n' +
      '\n' +
      '            <h2>Hiểu giới hạn của phép thử</h2>\n' +
      '            <p>Không có phản ứng ở tay không bảo đảm mặt sẽ không kích ứng hoặc nổi mụn. Sau đó vẫn cần dùng thận trọng trên vùng dự định chăm sóc. Thử tại nhà không thay thế xét nghiệm dị ứng do bác sĩ thực hiện, và không dùng để tự chẩn đoán nguyên nhân của một đợt phát ban.</p>\n' +
      '\n' +
      '            <h2>Không cố chịu để sản phẩm có tác dụng</h2>\n' +
      '            <p>Nếu đỏ, ngứa hoặc sưng, dừng sản phẩm và rửa nhẹ khi cần. Không mặc định mọi nốt mụn mới là đẩy mụn. Nếu phản ứng đáng kể hoặc kéo dài, mang thông tin sản phẩm khi đi khám để việc đánh giá cụ thể hơn.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/skin-care-secrets/prevent-skin-problems/test-skin-care-products"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: How to test skin care products\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'nen-tu-nhien',
  category: 'makeup',
  title: 'Tán nền tự nhiên: mỏng nhưng vẫn đều màu',
  summary: 'Một quy trình đánh nền dễ áp dụng cho đi học, đi làm và những ngày muốn trang điểm nhẹ.',
  date: '2026-10-09',
  image: 'assets/img/news/nen-tu-nhien.jpg',
  content: '\n' +
      '            <h2>Chuẩn bị bề mặt da</h2>\n' +
      '            <p>Làm sạch, dưỡng vừa đủ và dùng chống nắng nếu trang điểm ban ngày. Chờ lớp sản phẩm ổn định theo hướng dẫn rồi đánh nền. Da đang bong thường lộ rõ hơn dưới lớp nền dày; tránh chà tẩy ngay trước trang điểm để cố làm mịn.</p>\n' +
      '\n' +
      '            <h2>Chọn dụng cụ và lượng nền</h2>\n' +
      '            <p>Dùng tay sạch, cọ hoặc mút tùy công thức và hiệu ứng mong muốn. Mút cần làm ẩm nên được vắt kỹ theo hướng dẫn, không để nhỏ nước. Lấy lượng ít ra khay sạch hoặc mu bàn tay sạch, rồi bổ sung từng chút; bạn dễ thêm hơn là sửa một lớp quá dày.</p>\n' +
      '\n' +
      '            <h2>Tán từng vùng</h2>\n' +
      '            <p>Bắt đầu ở nơi cần đều màu, dặm hoặc tán nhẹ ra ngoài. Giảm lượng ở chân tóc và viền hàm để không có ranh giới. Che khuyết điểm riêng tại điểm cần thiết thay vì tăng nền toàn mặt. Quan sát cánh mũi và nếp dưới mắt trước khi phủ phấn.</p>\n' +
      '\n' +
      '            <h2>Hoàn thiện và dặm lại</h2>\n' +
      '            <p>Phủ mỏng tại vùng dễ bóng nếu muốn, không bắt buộc phủ kín cả mặt. Khi nền đã tiết dầu, thấm nhẹ trước rồi mới thêm chút phấn. Nếu nền vón, thử giảm lớp dưỡng hoặc lượng nền trong lần sau; đừng mặc định chỉ một loại sản phẩm là nguyên nhân.</p>\n' + '        '
}, {
  id: 'chon-mau-nen',
  category: 'makeup',
  title: 'Chọn màu kem nền: thử ở đâu để tránh lệch mặt và cổ?',
  summary: 'Cách kiểm tra độ sáng, sắc nền và hiệu ứng dưới những điều kiện ánh sáng thường gặp.',
  date: '2026-10-09',
  image: 'assets/img/news/chon-mau-nen.jpg',
  content: '\n' +
      '            <h2>Đừng chỉ thử trên cổ tay</h2>\n' +
      '            <p>Da tay có thể khác màu da mặt và cổ. Thử một lượng nhỏ gần viền hàm để nhìn sự chuyển tiếp. Nếu dùng tester, lấy bằng dụng cụ sạch dùng một lần và tránh để đầu lấy sản phẩm chạm trực tiếp lên da.</p>\n' +
      '\n' +
      '            <h2>So sánh vài màu gần nhau</h2>\n' +
      '            <p>Chọn hai hoặc ba màu có độ sáng gần với da, tán thành vùng nhỏ riêng biệt. Đánh giá cả sắc vàng, hồng hoặc trung tính và mức hòa với cổ. Quy tắc nhìn màu tĩnh mạch chỉ là gợi ý, không đủ để xác định chính xác sắc nền phù hợp.</p>\n' +
      '\n' +
      '            <h2>Quan sát sau khi nền ổn định</h2>\n' +
      '            <p>Xem màu sau một khoảng thời gian sản phẩm khô và trong ánh sáng ban ngày, nếu có thể. Một số nền đổi màu khi ổn định hoặc tương tác với sản phẩm bên dưới. Hãy thử cùng dưỡng và chống nắng bạn thường dùng thay vì chỉ nhìn mẫu mới quẹt tại quầy.</p>\n' +
      '\n' +
      '            <h2>Kiểm tra bằng tình huống thực tế</h2>\n' +
      '            <p>Nhìn cả gương, ảnh chụp không bộ lọc và vùng cổ; ánh sáng điện thoại có thể làm màu khác đi. Nếu thường chụp có flash, thử ảnh trước sự kiện. Không cần cố chọn màu sáng hơn để trông tươi tắn: má hồng và điểm sáng có thể tạo hiệu ứng đó mà vẫn giữ nền hài hòa.</p>\n' + '        '
}, {
  id: 'chon-son',
  category: 'makeup',
  title: 'Chọn màu và chất son theo nhu cầu sử dụng',
  summary: 'Tìm màu hài hòa với sắc môi thật và chọn chất son thuận tiện cho lịch sinh hoạt.',
  date: '2026-10-09',
  image: 'assets/img/news/chon-son.jpg',
  content: '\n' +
      '            <h2>Bắt đầu từ hoàn cảnh</h2>\n' +
      '            <p>Đi học hoặc đi làm, bạn có thể thử màu gần sắc môi để dễ dặm. Khi muốn môi nổi bật, thử đỏ hoặc sắc đậm hơn rồi giảm độ đậm mắt nếu thích. Đây là lựa chọn phối màu, không phải quy tắc phải theo cho từng màu da.</p>\n' +
      '\n' +
      '            <h2>Màu trên ảnh chưa phải màu trên môi</h2>\n' +
      '            <p>Sắc môi nền, ánh sáng và số lớp đều làm thay đổi kết quả. Swatch ở tay giúp xem chất và độ phủ nhưng không dự đoán chính xác màu môi. Ở cửa hàng, dùng cách thử vệ sinh và không thoa trực tiếp thỏi dùng chung lên môi.</p>\n' +
      '\n' +
      '            <h2>Cân nhắc cảm giác và việc dặm</h2>\n' +
      '            <p>Son bóng dễ tạo hiệu ứng đầy đặn nhưng có thể dính tóc; son lì thường tạo màu rõ nhưng cảm giác khác nhau tùy công thức. Son lâu trôi vẫn có thể mất màu khi ăn uống. Chọn loại bạn thấy dễ chịu và thuận tiện, thay vì kỳ vọng mọi chất son đều giữ nguyên cả ngày.</p>\n' +
      '\n' +
      '            <h2>Thoa từng lớp mỏng</h2>\n' +
      '            <p>Tán lượng nhỏ trước để kiểm tra màu, rồi thêm nếu cần. Với môi khô, dưỡng trước và thấm bớt phần dư nếu son khó bám. Không dùng scrub mạnh để chuẩn bị cho mọi lần đánh son. Nếu môi đang nứt đau, ưu tiên chăm sóc và tạm tránh sản phẩm gây rát.</p>\n' + '        '
}, {
  id: 've-sinh-co-mut',
  category: 'makeup',
  title: 'Vệ sinh cọ và bông mút để dụng cụ luôn dễ sử dụng',
  summary: 'Làm sạch đúng phần, phơi khô hoàn toàn và nhận biết lúc cần thay dụng cụ.',
  date: '2026-10-09',
  image: 'assets/img/news/ve-sinh-co-mut.jpg',
  content: '\n' +
      '            <h2>Đừng chờ đến khi dụng cụ đổi mùi</h2>\n' +
      '            <p>Cọ và mút giữ lại mỹ phẩm, dầu và cặn sau mỗi lần dùng. Chuẩn bị lịch vệ sinh thay vì chỉ rửa khi nhìn quá bẩn. AAD gợi ý rửa cọ mỗi 7–10 ngày; dụng cụ dùng nền lỏng thường xuyên có thể cần làm sạch sớm hơn tùy cách sử dụng.</p>\n' +
      '\n' +
      '            <h2>Rửa cọ nhẹ nhàng</h2>\n' +
      '            <p>Làm ướt phần lông bằng nước ấm vừa, dùng chất làm sạch phù hợp và massage nhẹ. Rửa đến khi nước trong, ép bớt nước rồi chỉnh lại dáng. Tránh ngâm phần nối và cán lâu vì có thể ảnh hưởng keo. Đặt cọ nằm ngang, đầu lông ở mép bề mặt sạch để thông thoáng.</p>\n' +
      '\n' +
      '            <h2>Rửa mút theo hướng dẫn</h2>\n' +
      '            <p>Làm ướt và bóp nhẹ để chất làm sạch phân bố, rửa kỹ cặn nền rồi ép nước. Không xoắn hoặc kéo mạnh khiến mút rách. Để ở nơi thoáng, không cất mút còn ẩm trong hộp kín. Dung dịch xịt làm sạch nhanh không mặc định thay thế việc giặt kỹ.</p>\n' +
      '\n' +
      '            <h2>Bảo quản và thay mới</h2>\n' +
      '            <p>Không dùng chung dụng cụ áp trực tiếp lên da. Thay mút khi rách, có mốc hoặc mùi không hết sau làm sạch; thay cọ khi xuống cấp và không còn dùng được. Vệ sinh túi đựng cũng cần thiết vì cọ sạch có thể lại dính cặn từ ngăn chứa.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/skin-care-secrets/routine/clean-your-makeup-brushes"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: How to clean your makeup brushes\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'trang-diem-mat',
  category: 'makeup',
  title: 'Trang điểm mắt: đẹp hơn nhờ thao tác gọn và vệ sinh',
  summary: 'Những lưu ý khi dùng mascara, eyeliner và tẩy trang vùng mắt.',
  date: '2026-10-09',
  image: 'assets/img/news/trang-diem-mat.jpg',
  content: '\n' +
      '            <h2>Chọn sản phẩm đúng vùng</h2>\n' +
      '            <p>Chỉ dùng mỹ phẩm được thiết kế cho vùng mắt. Không mặc định son, nhũ thủ công hoặc chì môi có thể dùng thay eyeliner. Rửa tay trước khi trang điểm và không thực hiện khi đang trên xe di chuyển vì đầu cọ hoặc chì có thể gây chấn thương.</p>\n' +
      '\n' +
      '            <h2>Mascara không nên pha loãng</h2>\n' +
      '            <p>Nếu mascara khô, không thêm nước hoặc nước bọt để dùng tiếp. Đóng nắp sau khi sử dụng và không dùng chung. Ghi ngày mở để theo dõi hạn trên nhãn; nếu mùi, màu hoặc kết cấu bất thường, ngừng dùng dù thời hạn dự kiến chưa hết.</p>\n' +
      '\n' +
      '            <h2>Tẩy trang bằng thao tác nhẹ</h2>\n' +
      '            <p>Dùng sản phẩm phù hợp cho mắt và lớp chống nước nếu có. Giữ bông nhẹ trên vùng cần làm sạch theo hướng dẫn rồi lau nhẹ; tránh kéo da hoặc chà liên tục. Nếu có mi nối, kiểm tra hướng dẫn chăm sóc của dịch vụ và sản phẩm trước khi lựa chọn chất tẩy trang.</p>\n' +
      '\n' +
      '            <h2>Khi mắt đang khó chịu</h2>\n' +
      '            <p>Không trang điểm khi mắt nhiễm trùng hoặc vùng da quanh mắt đang viêm. Loại bỏ mỹ phẩm mắt đã dùng trong đợt nhiễm trùng vì có thể bị nhiễm bẩn. Nếu sản phẩm gây kích ứng, dừng ngay; đau, khó chịu kéo dài hoặc thay đổi thị lực cần được kiểm tra.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.fda.gov/cosmetics/cosmetic-products/eye-cosmetic-safety"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    FDA: Eye Cosmetic Safety\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'duong-the',
  category: 'body',
  title: 'Dưỡng thể sau tắm: chọn đúng và duy trì đều',
  summary: 'Tận dụng thời điểm sau tắm để chăm sóc vùng da khô mà không cần quy trình nhiều bước.',
  date: '2026-10-09',
  image: 'assets/img/news/duong-the.jpg',
  content: '\n' +
      '            <h2>Xem lại cách tắm</h2>\n' +
      '            <p>Tắm nước quá nóng, kéo dài và kỳ cọ mạnh có thể làm da khô hơn. Với da khô, thử tắm nhanh khoảng 5–10 phút bằng nước ấm vừa. Chọn sản phẩm làm sạch dịu và rửa kỹ những vùng cần thiết thay vì cố tạo cảm giác sạch rít trên toàn thân.</p>\n' +
      '\n' +
      '            <h2>Thoa khi còn hơi ẩm</h2>\n' +
      '            <p>Thấm nước bằng khăn mềm, sau đó tán dưỡng thể khi da còn hơi ẩm. Chú ý cẳng chân, khuỷu tay và những nơi dễ khô. Không cần chờ da khô hoàn toàn rồi mới thoa. Để sản phẩm phân bố ổn định trước khi mặc quần áo nếu kết cấu dễ dính.</p>\n' +
      '\n' +
      '            <h2>Chọn theo vùng da</h2>\n' +
      '            <p>Lotion dễ tán trên diện tích lớn; kem hoặc dạng mỡ có thể phù hợp vùng rất khô. Nếu nhạy với mùi, cân nhắc loại không hương liệu. Có thể dùng lượng khác nhau ở mỗi vùng, không nhất thiết phủ cùng một lớp dày khắp cơ thể.</p>\n' +
      '\n' +
      '            <h2>Dưỡng không thay thế chống nắng</h2>\n' +
      '            <p>Sản phẩm làm mềm da không tự tạo bảo vệ UV nếu không có công bố phù hợp. Khi tay chân lộ ra ngoài, kết hợp che chắn và chống nắng. Nếu da khô đi kèm ngứa dữ dội, nứt hoặc không cải thiện, cần xem lại nguyên nhân thay vì chỉ đổi mùi dưỡng thể.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/skin-care-basics/dry/dermatologists-tips-relieve-dry-skin"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: Relieving dry skin\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'cham-soc-moi',
  category: 'body',
  title: 'Chăm sóc môi khô: dưỡng đơn giản và tránh bóc vảy',
  summary: 'Giảm những thói quen làm môi khó chịu và chuẩn bị bề mặt môi tốt hơn khi dùng son.',
  date: '2026-10-09',
  image: 'assets/img/news/cham-soc-moi.jpg',
  content: '\n' +
      '            <h2>Đừng cố làm sạch vảy bằng tay</h2>\n' +
      '            <p>Bóc hoặc cắn vảy có thể làm môi tổn thương và đau hơn. Liếm môi cũng không phải cách dưỡng bền vững. Nếu thường làm những động tác này lúc học hoặc căng thẳng, để son dưỡng dễ lấy sẽ giúp bạn thay đổi thói quen.</p>\n' +
      '\n' +
      '            <h2>Chọn dưỡng ít gây khó chịu</h2>\n' +
      '            <p>Ưu tiên sản phẩm dịu, không làm nóng rát; dạng mỡ như petrolatum có thể dùng cho môi rất khô. Không xem cảm giác tê, cay hoặc châm chích là dấu hiệu dưỡng hiệu quả. Khi sản phẩm làm môi rát, dừng và chọn cách chăm sóc đơn giản hơn.</p>\n' +
      '\n' +
      '            <h2>Dưỡng và bảo vệ ngoài trời</h2>\n' +
      '            <p>Thoa lại khi cần và trước khi ngủ. Khi ra ngoài, dùng sản phẩm dành cho môi có SPF từ 30 và theo hướng dẫn thoa lại. Uống nước đáp ứng nhu cầu cơ thể, nhưng uống nhiều hơn không tự khắc phục mọi nguyên nhân gây nứt môi.</p>\n' +
      '\n' +
      '            <h2>Khi nào cần kiểm tra?</h2>\n' +
      '            <p>Nếu môi không cải thiện sau vài tuần chăm sóc nhẹ, thường xuyên nứt khóe hoặc có tổn thương kéo dài, nên được đánh giá. Tránh tiếp tục chồng son màu, tẩy da chết và nhiều loại dưỡng mới cùng lúc vì khó nhận ra yếu tố gây khó chịu.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/skin-care-basics/dry/heal-dry-chapped-lips"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: Healing dry, chapped lips\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'cao-long',
  category: 'body',
  title: 'Cạo lông tay chân: thao tác nhẹ để giảm kích ứng',
  summary: 'Chuẩn bị da, chọn dụng cụ sạch và chăm sóc sau cạo trong sinh hoạt hằng ngày.',
  date: '2026-10-09',
  image: 'assets/img/news/cao-long.jpg',
  content: '\n' +
      '            <h2>Chuẩn bị trước khi cạo</h2>\n' +
      '            <p>Cạo sau khi tắm hoặc làm ẩm vùng da và lông bằng nước ấm vừa. Dùng sản phẩm hỗ trợ cạo phù hợp thay vì cạo khô để tiết kiệm thời gian. Kiểm tra dao còn sắc, sạch và không gỉ; không dùng chung với người khác.</p>\n' +
      '\n' +
      '            <h2>Cạo theo hướng lông mọc</h2>\n' +
      '            <p>Dùng lực nhẹ và các đường ngắn, rửa lưỡi thường xuyên để giảm cặn. Tránh kéo căng da và đi lại quá nhiều trên một chỗ, nhất là khi dễ nổi nốt sau cạo. Mục tiêu là thao tác có kiểm soát, không phải cố đạt độ nhẵn tuyệt đối bằng mọi giá.</p>\n' +
      '\n' +
      '            <h2>Chăm sóc sau cạo</h2>\n' +
      '            <p>Rửa sạch phần sản phẩm còn lại, thấm khô rồi dùng dưỡng phù hợp nếu da cần. Tránh ngay lập tức dùng scrub, acid hoặc sản phẩm có mùi làm rát trên vùng vừa cạo. Để dao ở nơi khô thoáng sau làm sạch, không ngâm mãi trong khu vực ẩm.</p>\n' +
      '\n' +
      '            <h2>Không xử lý nốt bằng cách nặn</h2>\n' +
      '            <p>Nếu xuất hiện nốt đau hoặc lông mọc ngược, không tự đào hoặc nhổ bằng dụng cụ bẩn. Tạm dừng cạo vùng đang kích ứng. Những nốt lan rộng, có mủ hoặc tái diễn cần được đánh giá để chọn phương pháp phù hợp hơn.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/skin-care-basics/hair/how-to-shave"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: Hair removal — How to shave\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'huong-thom',
  category: 'body',
  title: 'Dùng body mist: chọn mùi, xịt vừa đủ và bảo quản',
  summary: 'Tạo hương thuận tiện cho đi học, đi làm mà vẫn tôn trọng không gian chung.',
  date: '2026-10-09',
  image: 'assets/img/news/huong-thom.jpg',
  content: '\n' +
      '            <h2>Chọn mùi bằng trải nghiệm thật</h2>\n' +
      '            <p>Nhóm hoa, trái cây, gỗ hay ngọt chỉ giúp bạn khoanh vùng sở thích. Thử ít và chờ mùi ổn định trước khi quyết định. Độ lưu hương phụ thuộc công thức, lượng dùng và điều kiện sử dụng; tên body mist không bảo đảm một số giờ cố định.</p>\n' +
      '\n' +
      '            <h2>Xem vị trí được phép xịt</h2>\n' +
      '            <p>Đọc nhãn về khoảng cách và vùng dùng. Không tự mặc định sản phẩm dành cho cơ thể có thể dùng lên tóc, mặt hoặc mọi loại vải. Tránh mắt, niêm mạc và vùng da tổn thương. Nếu nhãn cho phép xịt quần áo, thử ở vị trí khuất để kiểm tra vết ố.</p>\n' +
      '\n' +
      '            <h2>Bắt đầu ít trong không gian kín</h2>\n' +
      '            <p>Trong lớp hoặc văn phòng, mùi nhẹ có thể dễ chịu hơn với người xung quanh. Bạn có thể đã quen mùi nên thấy nhạt dù người khác vẫn ngửi được. Nếu cần xịt lại, chọn nơi phù hợp, tránh xịt sát người khác hoặc trong không gian nhỏ đông người.</p>\n' +
      '\n' +
      '            <h2>Đậy nắp và theo nhãn</h2>\n' +
      '            <p>Tránh nhiệt cao, nắng trực tiếp và để sản phẩm lâu trong xe nóng. Sản phẩm có cồn hoặc cảnh báo dễ cháy cần tránh lửa, nguồn nhiệt. Body mist tạo hương, không thay thế tắm rửa hoặc mặc đồ sạch. Dừng nếu vùng xịt có phản ứng khó chịu.</p>\n' + '        '
}, {
  id: 'doc-nhan-my-pham',
  category: 'body',
  title: 'Đọc nhãn mỹ phẩm và bảo quản trong khí hậu nóng ẩm',
  summary: 'Kiểm tra nguồn gốc, hạn dùng và các thay đổi bất thường trước khi sử dụng.',
  date: '2026-10-09',
  image: 'assets/img/news/doc-nhan-my-pham.jpg',
  content: '\n' +
      '            <h2>Kiểm tra trước khi mua</h2>\n' +
      '            <p>Xem tên sản phẩm, công dụng, hướng dẫn, thành phần, đơn vị chịu trách nhiệm và thông tin lô hoặc hạn dùng nếu có. Bao bì đầy đủ thông tin giúp truy xuất khi cần nhưng không tự chứng minh sản phẩm hợp da. Đừng suy ra hiệu quả từ chữ thiên nhiên hoặc cao cấp.</p>\n' +
      '\n' +
      '            <h2>Phân biệt các mốc thời gian</h2>\n' +
      '            <p>Ngày hết hạn và ký hiệu thời gian dùng sau mở nắp là thông tin khác nhau. Nếu có biểu tượng hũ mở 6M hoặc 12M, đó là số tháng dùng sau mở theo công bố, không phải từ ngày mua. Ghi ngày mở và tuân thủ cả hạn ngoài bao bì lẫn điều kiện bảo quản.</p>\n' +
      '\n' +
      '            <h2>Bảo quản đúng chỗ</h2>\n' +
      '            <p>Đậy nắp, lấy sản phẩm bằng tay hoặc dụng cụ sạch, hạn chế đưa nước vào hũ. Không mặc định tủ lạnh phù hợp với mọi công thức; làm theo nhãn. Tránh nắng trực tiếp và những nơi quá nóng, quá ẩm. Không pha thêm nước để kéo dài lượng sản phẩm.</p>\n' +
      '\n' +
      '            <h2>Nhận biết khi cần bỏ</h2>\n' +
      '            <p>Mùi lạ, đổi màu hoặc kết cấu thay đổi bất thường là lý do để kiểm tra và ngừng dùng nếu nghi ngờ. Một số công thức có thể cần lắc theo nhãn nên không kết luận chỉ từ tách lớp. Không tiếp tục dùng sản phẩm đã gây ban, đỏ hoặc bỏng rát chỉ vì còn đắt tiền.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.fda.gov/cosmetics/resources-consumers-cosmetics/using-cosmetics-safely"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    FDA: Using Cosmetics Safely\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'goi-dau',
  category: 'hair',
  title: 'Gội đầu và dùng dầu xả theo nhu cầu tóc',
  summary: 'Làm sạch da đầu và chăm sóc chiều dài tóc bằng hai bước có mục đích khác nhau.',
  date: '2026-10-09',
  image: 'assets/img/news/goi-dau.jpg',
  content: '\n' +
      '            <h2>Lịch gội cần linh hoạt</h2>\n' +
      '            <p>Quan sát dầu, mồ hôi, bụi và lượng sản phẩm tạo kiểu thay vì áp một lịch cho mọi người. Người da đầu nhanh bết có thể cần gội thường hơn người tóc khô. Không cố chịu ngứa và bết chỉ để đạt số ngày giữa hai lần gội.</p>\n' +
      '\n' +
      '            <h2>Dầu gội tập trung da đầu</h2>\n' +
      '            <p>Làm ướt kỹ, dùng lượng theo nhãn và massage bằng đầu ngón tay. Xả sạch thay vì dùng móng cào. Không cần chà xát mạnh chiều dài tóc. Nếu lần đầu chưa sạch do nhiều sản phẩm tạo kiểu, điều chỉnh cách làm sạch; không mặc định mọi lần đều phải gội hai lượt.</p>\n' +
      '\n' +
      '            <h2>Dầu xả dành cho thân tóc</h2>\n' +
      '            <p>Với tóc mảnh hoặc thẳng, bắt đầu ở ngọn; tóc khô hoặc xoăn có thể cần trên chiều dài. Làm theo thời gian lưu của sản phẩm và rửa lại nếu đó là loại cần xả. Tránh dùng thật nhiều ở chân tóc khi cách đó làm tóc nặng và bết.</p>\n' +
      '\n' +
      '            <h2>Hoàn thiện dễ duy trì</h2>\n' +
      '            <p>Chuẩn bị khăn mềm và gỡ rối nhẹ. Ghi nhận tóc sau một vài lần dùng thay vì đánh giá chỉ ở lần đầu. Mùi thơm hoặc bọt nhiều không chứng minh sản phẩm làm sạch phù hợp hơn; da đầu dễ chịu và tóc dễ quản lý là những yếu tố thực tế để theo dõi.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/hair-scalp-care/hair/healthy-hair-tips"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: Tips for healthy hair\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'dung-cu-toc',
  category: 'hair',
  title: 'Tạo kiểu bằng nhiệt: giảm những thao tác làm tóc xuống cấp',
  summary: 'Cách chuẩn bị, chọn nhiệt và sắp xếp lịch tạo kiểu thực tế.',
  date: '2026-10-09',
  image: 'assets/img/news/dung-cu-toc.jpg',
  content: '\n' +
      '            <h2>Đọc hướng dẫn của thiết bị</h2>\n' +
      '            <p>Máy sấy, duỗi và uốn không có cùng cách dùng. Máy duỗi hoặc uốn thông thường cần tóc khô; không thử trên tóc còn ướt nếu thiết bị không được thiết kế cho điều đó. Kiểm tra dây điện, bề mặt và nơi đặt máy trước khi bật.</p>\n' +
      '\n' +
      '            <h2>Chuẩn bị trước khi dùng nhiệt</h2>\n' +
      '            <p>Gỡ rối và dùng bảo vệ nhiệt theo nhãn. Sản phẩm này không làm tóc miễn nhiễm với nhiệt nên vẫn cần giảm nhiệt và thời gian. Không dùng dầu hoặc hỗn hợp tự pha thay cho bảo vệ nhiệt nếu không có hướng dẫn phù hợp.</p>\n' +
      '\n' +
      '            <h2>Kiểm soát từng lọn</h2>\n' +
      '            <p>Chia tóc để thao tác dễ, bắt đầu ở mức nhiệt thấp phù hợp và tránh chạy máy nhiều lượt trên cùng lọn. Không có một nhiệt độ tối ưu chung cho mọi tóc. Với tóc đã tẩy hoặc dễ gãy, cân nhắc giảm sử dụng và hỏi người làm tóc trước khi tạo kiểu thường xuyên.</p>\n' +
      '\n' +
      '            <h2>Giảm phụ thuộc vào máy</h2>\n' +
      '            <p>Thử buộc lỏng, kẹp hoặc những kiểu không cần nhiệt vào ngày thường. Tắt máy, rút điện và để nguội trước khi vệ sinh; dùng bề mặt chịu nhiệt khi đặt máy. Tóc hư tổn không được phục hồi vĩnh viễn chỉ bằng một lớp serum, nên sửa thói quen vẫn cần thiết.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/hair-scalp-care/hair/habits-that-damage-hair"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: Hair-care habits that can damage hair\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'gau-da-dau',
  category: 'hair',
  title: 'Da đầu có gàu: chăm sóc đúng thay vì cào sạch vảy',
  summary: 'Nhận biết giới hạn của chăm sóc tại nhà và cách dùng sản phẩm theo nhãn.',
  date: '2026-10-09',
  image: 'assets/img/news/gau-da-dau.jpg',
  content: '\n' +
      '            <h2>Vảy trắng không nói hết nguyên nhân</h2>\n' +
      '            <p>Gàu có thể đi kèm ngứa, nhưng bong vảy cũng có thể liên quan những tình trạng khác. Không tự kết luận da đầu bẩn hoặc thiếu nước chỉ từ vài mảng trắng trên áo. Ghi nhận thời điểm xuất hiện và sản phẩm mới dùng sẽ giúp việc tìm nguyên nhân cụ thể hơn.</p>\n' +
      '\n' +
      '            <h2>Dùng sản phẩm đúng mục đích</h2>\n' +
      '            <p>Nếu gội thông thường chưa đủ, cân nhắc dầu gội dành cho gàu phù hợp và hỏi dược sĩ khi chưa rõ. Những sản phẩm này có thể chứa hoạt chất như ketoconazole hoặc selenium sulfide; khả năng mua và hướng dẫn tùy nơi, tùy sản phẩm. Không tự pha nhiều loại để tăng tác dụng.</p>\n' +
      '\n' +
      '            <h2>Thời gian tiếp xúc quan trọng</h2>\n' +
      '            <p>Tập trung ở da đầu và đọc thời gian lưu trước khi xả; không phải loại nào cũng rửa ngay hoặc để cùng số phút. Tần suất cũng phụ thuộc sản phẩm và kiểu tóc. Chăm sóc chiều dài bằng dầu xả phù hợp nếu tóc khô, đồng thời tránh cào mạnh làm trầy da đầu.</p>\n' +
      '\n' +
      '            <h2>Khi cần được đánh giá</h2>\n' +
      '            <p>Nếu vẫn không cải thiện khi đã dùng đúng hướng dẫn, hoặc da đầu đỏ đau, chảy dịch hay rụng thành mảng, nên khám da liễu. Không dùng chanh, hỗn hợp cay hoặc tinh dầu đậm đặc để cố sát khuẩn da đầu. Vệ sinh lược và thay vỏ gối giúp sinh hoạt sạch hơn nhưng không thay thế điều trị khi cần.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/hair-scalp-care/scalp/treat-dandruff"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: How to treat dandruff\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}, {
  id: 'toc-bet',
  category: 'hair',
  title: 'Tóc nhanh bết: điều chỉnh sản phẩm và lịch sinh hoạt',
  summary: 'Tìm các nguyên nhân thực tế khiến chân tóc nặng để chăm sóc thuận tiện hơn.',
  date: '2026-10-09',
  image: 'assets/img/news/toc-bet.jpg',
  content: '\n' +
      '            <h2>Quan sát lúc tóc bắt đầu bết</h2>\n' +
      '            <p>Tóc bết ngay sau gội khác với bết sau một ngày đội mũ, vận động hoặc đi đường. Thử ghi lại khi xuất hiện và vùng rõ nhất. Chân tóc nhìn nặng có thể do dầu, mồ hôi, cặn sản phẩm hoặc xả chưa kỹ; không nên lập tức mua thêm nhiều loại dầu gội.</p>\n' +
      '\n' +
      '            <h2>Kiểm tra lượng và vị trí dùng</h2>\n' +
      '            <p>Nếu dùng dầu xả hoặc serum sát chân tóc rồi thấy nặng, thử chuyển lượng nhỏ xuống thân và ngọn. Xả kỹ vùng sau gáy và chân tóc. Không cần loại bỏ toàn bộ dầu xả nếu chỉ chân tóc bết trong khi ngọn vẫn khô.</p>\n' +
      '\n' +
      '            <h2>Sắp xếp lịch phù hợp</h2>\n' +
      '            <p>Chuẩn bị thời gian gội và làm khô trước buổi học hoặc sự kiện thay vì để sát giờ rồi tăng nhiệt sấy. Làm sạch lớp lót mũ theo hướng dẫn và giữ dụng cụ tóc sạch. Những thay đổi này giúp bạn phân biệt cặn bên ngoài với đặc điểm tiết dầu của da đầu.</p>\n' +
      '\n' +
      '            <h2>Dầu gội khô chỉ là hỗ trợ</h2>\n' +
      '            <p>Nếu sử dụng, theo vị trí, khoảng cách và cách chải trên nhãn; tránh tích nhiều lớp qua nhiều ngày. Hiệu ứng giảm bóng không đồng nghĩa da đầu đã được rửa sạch. Nếu bết kèm ngứa, vảy hoặc đau, cần xem lại tình trạng da đầu thay vì chỉ che bằng sản phẩm tạo phồng.</p>\n' + '        '
}, {
  id: 'go-roi-toc',
  category: 'hair',
  title: 'Gỡ rối và làm khô tóc: nhẹ tay từ ngọn đến chân',
  summary: 'Một quy trình sau gội giúp tóc dễ quản lý mà không cần kéo giật hoặc vò mạnh.',
  date: '2026-10-09',
  image: 'assets/img/news/go-roi-toc.jpg',
  content: '\n' +
      '            <h2>Chuẩn bị dụng cụ</h2>\n' +
      '            <p>Dùng lược phù hợp với độ dày và kiểu tóc, thường có thể bắt đầu bằng lược răng thưa. Loại bỏ tóc mắc và giữ lược sạch. Nếu tóc đang rối nhiều, chia thành các phần nhỏ thay vì đưa lược từ chân tóc xuống một lần.</p>\n' +
      '\n' +
      '            <h2>Xử lý nút rối từ dưới lên</h2>\n' +
      '            <p>Giữ phần tóc phía trên nút rối để giảm kéo da đầu, bắt đầu ở ngọn rồi đi dần lên. Không tăng lực khi lược mắc. Tóc thẳng có thể để khô bớt trước khi chải; tóc xoăn thường thuận tiện gỡ khi còn ẩm và có dầu xả phù hợp. Chọn theo kiểu tóc của mình.</p>\n' +
      '\n' +
      '            <h2>Thấm nước rồi làm khô</h2>\n' +
      '            <p>Ép hoặc quấn nhẹ bằng khăn mềm hay áo sạch phù hợp, tránh vò tóc liên tục. Nếu sấy, dùng nhiệt thấp hoặc vừa và di chuyển máy. Chuẩn bị đủ thời gian để không phải tập trung nhiệt cao vào một vùng nhằm làm khô thật nhanh.</p>\n' +
      '\n' +
      '            <h2>Giữ kiểu dễ chịu</h2>\n' +
      '            <p>Tháo dây buộc nhẹ, đổi vị trí và tránh kiểu kéo căng gây đau. Sản phẩm gỡ rối hoặc serum có thể giúp cảm giác bề mặt, nhưng không làm mọi hư tổn biến mất. Nếu tóc gãy nhiều hoặc có vùng thưa bất thường, cần đánh giá thay vì chỉ tăng lượng dưỡng.</p>\n' +
      '\n' +
      '            <p><strong>Tham khảo:</strong>\n' +
      '                <a href="https://www.aad.org/public/everyday-care/hair-scalp-care/hair/healthy-hair-tips"\n' +
      '                   target="_blank" rel="noopener noreferrer">\n' +
      '                    AAD: Tips for healthy hair\n' +
      '                </a>\n' +
      '            </p>\n' + '        '
}];
