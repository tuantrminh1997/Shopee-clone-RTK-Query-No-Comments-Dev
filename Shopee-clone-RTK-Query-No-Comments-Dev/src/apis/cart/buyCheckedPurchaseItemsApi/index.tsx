import { httpInstance as http } from "src/utils";
// url
import { buyProductsPathURL } from "src/constants";
// types
import { BuyProductsApiPropsType, ProductItemApiType, PurchaseSuccessResponse, SuccessResponseApi } from "src/types";

// api doc:
// ## Buy purchases: `/purchases/buy-products`
// Method: POST
// body: Mảng các object
// -> [{ "product_id": "60afb1c56ef5b902180aacb8", "buy_count": 2 }]

const buyCheckedPurchaseItemsApi = (body: BuyProductsApiPropsType<ProductItemApiType>) =>
	http.post<SuccessResponseApi<PurchaseSuccessResponse[]>>(buyProductsPathURL, body);
// Kiểu response -> cần test trên postman -> <SuccessResponseApi<PurchaseSuccessResponse>>
export default buyCheckedPurchaseItemsApi;
// -> test trên postman:
// {
//   "message": "Mua thành công",
//   "data": [
//       {
//           "_id": "64ed792a3be576dd53d2c3af",
//           "buy_count": 2,
//           "price": 20990000,
//           "price_before_discount": 26990000,
//           "status": 1,
//           "user": "64ed76023be576dd53d2c3a8",
//           "product": {
//               "_id": "60afb1c56ef5b902180aacb8",
//               "images": [
//                   "a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg",
//                   "b09ff60d-c6bd-4d3a-b778-0fc2708a65fb.jpg",
//                   "fc5ecd4c-47eb-4f12-ae82-ef26fd492887.jpg",
//                   "a87f854d-37a9-4252-a2f7-243fc21f8b55.jpg",
//                   "3ecf878d-6742-43d4-abe7-044c15c84120.jpg"
//               ],
//               "price": 20990000,
//               "rating": 5,
//               "price_before_discount": 26990000,
//               "quantity": 17,
//               "sold": 482,
//               "view": 15404,
//               "name": "Điện thoại Apple Iphone 12 64GB - Hàng chính hãng VNA",
//               "description": "<p>H&agrave;ng Ch&iacute;nh h&atilde;ng m&atilde; VN/A, mới 100%, chưa k&iacute;ch hoạt</p><p>iPhone 12 64GB- Sự n&acirc;ng cấp chỉnh chu cho thế hệ tiền nhiệm<br />M&agrave;n h&igrave;nh iPhone 12 64GB - N&acirc;ng cấp đ&aacute;ng gi&aacute; từ tấm nền OLED<br />Hai năm qua, Apple vẫn trung th&agrave;nh với tấm nền IPS LCD d&agrave;nh cho c&aacute;c phi&ecirc;n bản điện thoại gi&aacute; rẻ. Trong đ&oacute;, iPhone XR, iPhone 11 v&agrave; thậm ch&iacute; l&agrave; SE 2020 l&agrave; những đại diện ti&ecirc;u biểu. Thế nhưng, điều n&agrave;y sẽ thay đổi khi m&agrave; giờ đ&acirc;y, thế hệ kế nhiệm đ&atilde; được n&acirc;ng cấp l&ecirc;n tấm nền OLED sắc n&eacute;t.</p><p>iPhone 12 64GB sở hữu m&agrave;n h&igrave;nh 6,1 inch (tương tự XR v&agrave; 11) với tấm nền OLED XDR tương tự c&aacute;c bản cao cấp. Ngo&agrave;i ra, một điểm nổi bật kh&ocirc;ng thể kh&ocirc;ng nhắc đến ch&iacute;nh l&agrave; việc n&acirc;ng cấp độ ph&acirc;n giải chuẩn HD+ vốn bị c&aacute;c fan đ&aacute;nh gi&aacute; k&eacute;m qua hai thế hệ l&ecirc;n chuẩn Full HD+. Do đ&oacute;, Cupertino đ&atilde; ch&iacute;nh thức thay đổi điểm yếu cố hữu tr&ecirc;n c&aacute;c phi&ecirc;n bản gi&aacute; rẻ của h&atilde;ng. Ngay cả bản 5,4 inch cũng được trang bị tấm nền OLED Super Retina.</p><p>Ngo&agrave;i ra, theo c&ocirc;ng bố của h&atilde;ng, m&agrave;n h&igrave;nh của thế hệ mới sẽ c&oacute; độ s&aacute;ng l&ecirc;n tới 1200 knits v&agrave; hỗ trợ c&aacute;c c&ocirc;ng nghệ HDR v&agrave; Dolby Vision. Đặc biệt, lớp k&iacute;nh sẽ được phủ một lớp &ldquo;Ceramic Shield&rdquo; gi&uacute;p m&aacute;y cứng c&aacute;p v&agrave; sống s&oacute;t cao hơn trong những t&igrave;nh huống &ldquo;tiếp đất&rdquo;.</p><p>Thiết kế iPhone 12 64GB mang n&eacute;t ho&agrave;i cổ<br />Năm nay c&aacute;c sản phẩm &ldquo;t&aacute;o khuyết&rdquo; đều sở hữu chung ng&ocirc;n ngữ thiết kế. Đ&oacute; l&agrave; sự kết hợp giữa iPhone 11 v&agrave; iPhone 5 với c&aacute;c cạnh viền được l&agrave;m vu&ocirc;ng vức hơn. Mặt trước vẫn l&agrave; m&agrave;n h&igrave;nh với notch &ldquo;tai thỏ&rdquo; chứa camera selfie v&agrave; Face ID. Thiết kế n&agrave;y khiến series smartphone năm nay của nh&agrave; T&aacute;o tr&ocirc;ng sang trọng v&agrave; mang d&aacute;ng dấp ho&agrave;i cổ từ ng&ocirc;n ngữ thiết kế của thế hệ thứ 5 trước đ&acirc;y.<br />C&ograve;n mặt sau của m&aacute;y vẫn sẽ l&agrave; một cụm m&aacute;y ảnh k&eacute;p đặt trong khung vu&ocirc;ng tương tự như thế hệ năm 2019. Do l&agrave; bản ti&ecirc;u chuẩn, thiết bị sẽ c&oacute; khung l&agrave;m từ nh&ocirc;m thay v&igrave; bằng th&eacute;p kh&ocirc;ng gỉ như bản cao cấp.</p><p>Hiệu năng iPhone 12 64GB mạnh mẽ<br />Cung cấp sức mạnh cho m&aacute;y ch&iacute;nh l&agrave; chip A14 Bionic. Theo c&ocirc;ng bố của Cupertino, A14 l&agrave; vi xử l&yacute; c&oacute; tới 6 nh&acirc;n CPU, chứa hơn 11,8 tỷ b&oacute;ng b&aacute;n dẫn, hứa hẹn sẽ cho hiệu năng hơn khoảng 40% so với A13. Điểm số benchmark của một mẫu m&aacute;y cũng sở hữu chipset n&agrave;y l&agrave; iPad Air 4 đ&atilde; cho thấy A14 thật sự vượt trội. Điểm số đơn nh&acirc;n 1583 va đa nh&acirc;n l&agrave; 4918, chỉ thua k&eacute;m một ch&uacute;t so với A12Z tr&ecirc;n iPad Pro 2020.<br />Ngo&agrave;i ra, nh&agrave; T&aacute;o c&ograve;n trang bị th&ecirc;m chip U1 với băng tần rộng (ultra-wideband) cho ph&eacute;p định vị vị tr&iacute; th&ocirc;ng qua AirDrop v&agrave; kết nối c&aacute;c thiết bị c&ugrave;ng hệ sinh th&aacute;i trong gia đ&igrave;nh</p><p>Camera iPhone 12 64GB - Thay đổi đến từ b&ecirc;n trong <br />Du l&agrave; thế hệ kế nhiệm iPhone 11, thế nhưng thiết bị n&agrave;y kh&ocirc;ng c&oacute; cải tiến nhiều về m&aacute;y ảnh. M&aacute;y vẫn sở hữu cụm camera k&eacute;p với 2 cảm biến 12MP (1 g&oacute;c rộng v&agrave; 1 g&oacute;c si&ecirc;u rộng). Apple đ&atilde; sắp xếp lại v&agrave; bổ sung th&ecirc;m thấu k&iacute;nh để cho chất lượng ảnh chụp trong v&agrave; sắc n&eacute;t hơn.</p>",
//               "category": {
//                   "_id": "60afafe76ef5b902180aacb5",
//                   "name": "Điện thoại",
//                   "__v": 0
//               },
//               "image": "a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg",
//               "createdAt": "2021-05-27T14:50:45.708Z",
//               "updatedAt": "2023-08-29T14:55:54.881Z",
//               "__v": 0
//           },
//           "createdAt": "2023-08-29T04:50:50.432Z",
//           "updatedAt": "2023-08-30T04:41:07.244Z",
//           "__v": 0
//       }
//   ]
// }
