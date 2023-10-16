interface ProductItemSuccessResponse {
	_id: string;
	images: string[];
	price: number;
	rating: number;
	price_before_discount: number;
	quantity: number;
	sold: number;
	view: number;
	name: string;
	description: string;
	category: {
		_id: string;
		name: string;
		__v: number;
	};
	image: string;
	createdAt: string;
	updatedAt: string;
}
export default ProductItemSuccessResponse;

// const a = {
// 	_id: "60af6f12f1a3041b289d8b9b",
// 	images: [
// 		"https://api-ecom.duthanhduoc.com/images/b18506cc-3d5f-4160-aee3-8e4242ed5717.jpg",
// 		"https://api-ecom.duthanhduoc.com/images/0e91ba6d-8e35-4fee-8812-6f81bbe0e3de.jpg",
// 		"https://api-ecom.duthanhduoc.com/images/519d5750-23b3-4ba1-8fb6-e74bf594c558.jpg",
// 		"https://api-ecom.duthanhduoc.com/images/3640d703-9add-45b7-b726-767c13cf3238.jpg",
// 		"https://api-ecom.duthanhduoc.com/images/46b7bebc-6a8d-4fb3-aa63-e9cf550f6490.jpg",
// 		"https://api-ecom.duthanhduoc.com/images/30273cc8-98fb-4cc6-85e6-02c447e45f4a.jpg",
// 	],
// 	price: 75000,
// 	rating: 5,
// 	price_before_discount: 150000,
// 	quantity: 52,
// 	sold: 5,
// 	view: 2117,
// 	name: "Áo thun Polo nam cổ bẻ BASIC vải cá sấu Cotton xuất xịn, chuẩn đẹp, màu HỒNG",
// 	description:
// 		"<p>&Aacute;o Thun ngắn tay unisex Tie Dye, form oversize, vải cotton loang mầu 2SClothing.</p><p>Th&ocirc;ng tin sản phẩm<br />- Kiểu d&aacute;ng: &Aacute;o thun nam nữ oversize<br />- M&agrave;u sắc: Tie Dye Hồng<br />- Chất liệu: vải thun cotton cao cấp, độ co gi&atilde;n tốt, mềm mịn, tho&aacute;ng m&aacute;t, kh&ocirc;ng nhăn, kh&ocirc;ng x&ugrave;<br />- Đường may tỉ mỉ, chắc chắn, kh&ocirc;ng chỉ thừa<br />- Mặc ở nh&agrave;, đi học hay đi chơi hoặc khi vận động thể thao đều si&ecirc;u hợp nha. Mix cũng quần jeans, ch&acirc;n v&aacute;y,&hellip; được ngay set đồ c&aacute; t&iacute;nh<br />- Thiết kế hiện đại, trẻ trung, năng động</p><p>Th&ocirc;ng số chọn size:<br />Size S: 1m45-1m50 (41-45kg)<br />Size M: 1m50-1m60 (46-53kg)<br />Size L: 1m60-1m65 (53-62kg)<br />Size XL: 1m65- 1m75 (63-74kg)<br />Size XXL: 1m75- 1m84 (74-84kg)<br />(Bảng size mang t&iacute;nh chất tham khảo v&agrave; ph&ugrave; hợp 80-90% sở th&iacute;ch mặc của bạn. C&aacute;c bạn muốn chọn size ph&ugrave; hợp c&oacute; thể inbox cho shop nh&eacute;)</p><p>Hướng dẫn sử dụng sản phẩm:<br />- Lần đầu đem về chỉ xả nước lạnh rồi phơi kh&ocirc; để đảm bảo chất in tr&ecirc;n &aacute;o kh&ocirc;ng bong tr&oacute;c nh&eacute;<br />- Nhớ lộn tr&aacute;i &aacute;o khi giặt v&agrave; kh&ocirc;ng giặt ng&acirc;m<br />- Kh&ocirc;ng giặt m&aacute;y trong 10 ng&agrave;y đầu<br />- Kh&ocirc;ng sử dụng thuốc tẩy<br />- Khi phơi lộn tr&aacute;i v&agrave; kh&ocirc;ng phơi trực tiếp dưới &aacute;nh nắng mặt trời</p><p>2S Clothing XIN CAM KẾT:<br />+ Sản phẩm chất lượng, giống h&igrave;nh, giống m&ocirc; tả 100%<br />+ &Aacute;o được kiểm tra kĩ c&agrave;ng, cẩn thận v&agrave; tư vấn nhiệt t&igrave;nh trước khi g&oacute;i h&agrave;ng giao cho qu&yacute; kh&aacute;ch<br />+ Ho&agrave;n tiền 100% nếu sản phẩm lỗi, kh&ocirc;ng giống với m&ocirc; tả.<br />+ Chấp nhận đổi h&agrave;ng khi size kh&ocirc;ng vừa<br />+ H&agrave;ng c&oacute; sẵn, giao h&agrave;ng ngay khi nhận được đơn đặt h&agrave;ng<br />+ Giao h&agrave;ng to&agrave;n quốc, thanh to&aacute;n khi nhận h&agrave;ng (ship COD)</p><p>Hỗ trợ đổi trả theo quy định của Shopee<br />1. Điều kiện &aacute;p dụng đổi sản phẩm (trong v&ograve;ng 07 ng&agrave;y kể từ khi nhận sản phẩm)<br />- H&agrave;ng ho&aacute; vẫn c&ograve;n mới nguy&ecirc;n tem m&aacute;c, chưa qua sử dụng<br />- H&agrave;ng ho&aacute; bị lỗi hoặc hư hỏng do vận chuyển hoặc do nh&agrave; sản xuất<br />2. Trường hợp kh&ocirc;ng đủ điều kiện &aacute;p dụng ch&iacute;nh s&aacute;ch:<br />- Qu&aacute; 07 ng&agrave;y kể từ khi Qu&yacute; kh&aacute;ch nhận h&agrave;ng từ shopee<br />- Gửi lại h&agrave;ng kh&ocirc;ng đ&uacute;ng mẫu m&atilde;, kh&ocirc;ng phải sản phẩm của 2S Clothing<br />- Kh&ocirc;ng th&iacute;ch, kh&ocirc;ng hợp, đặt nhầm m&atilde;, nhầm m&agrave;u, y&ecirc;u cầu kiểm tra h&agrave;ng trước khi thanh to&aacute;n.</p><p>Lưu &Yacute;:<br />H&igrave;nh ảnh sản phẩm ho&agrave;n to&agrave;n do shop tự chụp, với m&agrave;n h&igrave;nh v&agrave; điều kiện &aacute;nh s&aacute;ng kh&aacute;c nhau, m&agrave;u sắc thực tế của sản phẩm c&oacute; thể ch&ecirc;nh lệch<br />Trong trường hợp nhận được c&aacute;c sản phẩm c&oacute; vấn đề kh&ocirc;ng đ&aacute;ng kể v&iacute; dụ như bề mặt hơi bẩn c&oacute; thể hết sau khi giặt, c&oacute; chỉ thừa... ch&uacute;ng t&ocirc;i hy vọng bạn c&oacute; thể tự m&igrave;nh giải quyết c&aacute;c vấn đề đ&oacute;. Nếu bạn l&agrave; người cầu to&agrave;n v&agrave; sẽ bận t&acirc;m về c&aacute;c vấn đề đ&oacute;, mong bạn c&acirc;n nhắc cẩn thận trước khi đặt sản phẩm<br />Nếu bạn c&oacute; bất kỳ y&ecirc;u cầu g&igrave;, xin vui l&ograve;ng li&ecirc;n hệ với ch&uacute;ng t&ocirc;i</p><p>Cảm ơn &hearts; Tr&acirc;n trọng<br />Th&ocirc;ng tin li&ecirc;n hệ của shop c&oacute; trong phần m&ocirc; tả shop <br />___________ ++++++++++ _____________</p><p>#&aacute;othunngắntay<br />#&aacute;o_thun_ngắn_tay<br />#ao_thun_ngan_tay<br />#&aacute;othuntaylỡ<br />#&aacute;o_thun_tay_lỡ<br />#aothuntaylo<br />#ao_thun_tay_lo<br />#&aacute;o_form_rộng<br />#aoformrong<br />#ao_form_rong<br />#thuntayngắn<br />#thun_tay_ngắn<br />#thuntayngan<br />#thun_tay_ngan<br />#2sclothing<br />#&aacute;o_thun_nữ<br />#&Aacute;othunnữ</p>",
// 	category: {
// 		_id: "60aba4e24efcc70f8892e1c6",
// 		name: "Áo thun",
// 		__v: 0,
// 	},
// 	image: "https://api-ecom.duthanhduoc.com/images/b18506cc-3d5f-4160-aee3-8e4242ed5717.jpg",
// 	createdAt: "2021-05-27T10:06:10.339Z",
// 	updatedAt: "2023-08-22T02:45:14.084Z",
// };
