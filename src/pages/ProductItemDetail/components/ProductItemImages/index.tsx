// react hooks:
import { useState, useRef } from "react";
// classNames:
import classNames from "classnames";
// icons
import { HeartIcon, ProductSliderLeftArrow, ProductSliderRightArrow } from "src/icons";
// constants
import { productItemDetailInformationAttributes } from "src/constants";
// types:
import { ProductItemImagesPropsType } from "src/types";

// Thuật toán sliders ảnh: số lượng các chỗ trống cho ảnh = imageSliderPositions = 5
// - Array có 8 ảnh: index 0 -> 7
// - Bước 1: chọn ra các ảnh từ 0 -> imageSliderPositions - 1
//    Tiến hành render: index 0 -> (imageSliderPositions - 1) = 4
// - Ấn next -> index 0 + 1 = 1 -> 4 + 1 = 5
// - Ấn next tiếp -> index 2 -> 6
// - Ấn previous -> index 1 -> 5
// - Nếu như đang render chạm đến max index: index 2 -> 7, ấn Next -> không tăng số index đang render
// - Nếu như đang render chạm đến min index: index 0 -> 4, ấn Previous -> không giảm số index đang render

export default function ProductItemImages({
	productItemDetailDatasImage,
	productItemDetailDatasImages,
	productItemName,
}: ProductItemImagesPropsType) {
	const { totalImageShownPositions } = productItemDetailInformationAttributes;
	// Tổng vị trí các ảnh trong sliders
	const imagesSliderPositions =
		productItemDetailDatasImages.length > totalImageShownPositions
			? totalImageShownPositions
			: productItemDetailDatasImages.length;

	// Mục đích để lấy được thuộc tính width
	const imageRef = useRef<HTMLImageElement>(null);

	// State quản lý src ảnh đang được hiển thị trên khung lớn nhất
	const [image, setImage] = useState<string>(productItemDetailDatasImage);

	// state quản lý array các ảnh được đưa vào slider:
	const [firstIndex, setFirstIndex] = useState<number>(0);
	const [finalIndex, setFinalIndex] = useState<number>(imagesSliderPositions);

	const getProductItemImagesRender = () => {
		// Dùng hàm slice(chỉ số bắt đầu, chỉ số kết thúc)
		const productItemImagesRender = productItemDetailDatasImages.slice(firstIndex, finalIndex);
		return productItemImagesRender;
	};

	// Method quản lý chức năng next/previous:
	// Chú ý: callback của onclick không bị gọi khi không kích hoạt sự kiện, kể cả khi component re-render
	const handleNextImagesSlider = () => {
		if (finalIndex !== productItemDetailDatasImages.length) {
			setFirstIndex((previous) => previous + 1);
			setFinalIndex((previous) => previous + 1);
		}
	};
	const handlePreviousImagesSlider = () => {
		if (firstIndex !== 0) {
			setFirstIndex((previous) => previous - 1);
			setFinalIndex((previous) => previous - 1);
		}
	};

	// Method quản lý chức năng render ảnh slider
	const handleRenderImagesSlider: () => JSX.Element[] = () => {
		return getProductItemImagesRender().map((productItemDetailImageSrc, index) => (
			<img
				key={index}
				src={productItemDetailImageSrc}
				alt='productItemImageSlider'
				className={classNames("w-20 h-20 cursor-pointer ", {
					"border-[2px] border-[#ee4d2d]": image === productItemDetailImageSrc,
				})}
				onMouseEnter={() => handleShowProductItemImage(productItemDetailImageSrc)}
			/>
		));
	};

	// Method quản lý chức năng thêm border ảnh khi hover chuột, Đồng thời đưa ảnh đang được hover lên khung ảnh lớn nhất
	const handleShowProductItemImage = (productItemImageSrc: string) => setImage(productItemImageSrc);

	// Method quản lý chức năng zoom ảnh -> phóng lên kích thước thật của ảnh sản phẩm:
	// cách 1: đơn giản nhất, lấy offsetX, offsetY từ vật thể đang chịu Event
	// -> xóa bỏ bubble event của vật thể con bên trong
	const handleZoomProductImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		// Logic:
		// 1. Khi zoom ảnh -> trả về kích thước thật của ảnh nhận về từ Server -> sử dụng useRef
		// ép kiểu image = imageRef.current as HTMLImageElement -> image không thể bị null hoặc undefined (vì chắc chắn phải nhìn
		// thấy ảnh ta mới tiến hành zoom vào)
		const image = imageRef.current as HTMLImageElement;
		// 2. lấy thuộc tính chiều dài và chiều rộng nguyên bản của ảnh
		const { naturalHeight, naturalWidth } = image;
		// 3. set lại chiều cao và chiều rộng của ảnh bằng 2 thuộc tính naturalHeight, naturalWidth
		image.style.width = `${naturalWidth}px`;
		image.style.height = `${naturalHeight}px`;
		// do ta đang set cứng max-width = full nên ảnh bị giới hạn width
		// -> handle bằng cách khi hover chuột, move chuột -> set maxWidth = unset
		image.style.maxWidth = "unset";
		// -> Khi ảnh phình ra kích thước thật ->  đẩy vào các vật thể khác
		// -> set thẻ div relative, thẻ image set absolute, thẻ cha relative có overflow-hidden
		// 4. Tiến hành lấy các thông số chiều cao, chiều rộng, x, y ,..v..v.. của vật thể đang diễn ra sự kiện onMouseMove
		// -> Object chứa các thông tin đó nằm trong biến event
		// handle việc hơ chuột đến đâu, ta zoom và soi được vào ảnh ở đó tại kích thước thật của ảnh.
		const rect = event.currentTarget.getBoundingClientRect();
		// console.log(rect);
		// 5. offsetX, offsetY = tọa độ của con trỏ chuột trên vật thể (chứa sự kiện, ở đây là thẻ div)
		const { offsetX, offsetY } = event.nativeEvent;
		// -> công thức để gán tọa độ của vật thể ăn theo vị trí con trỏ chuột ta đang di chuyển trên bề mặt vật thể (thẻ div):
		const top = offsetY * (1 - naturalHeight / rect.height);
		const left = offsetX * (1 - naturalWidth / rect.width);
		// -> tiến hành gán tọa độ top, left cho 2 kết quả trên
		// -> ta thu được việc tọa độ con trỏ chuột trùng với tọa độ vị trí của vật thể.
		image.style.top = `${top}px`;
		image.style.left = `${left}px`;
		// -> sẽ gặp hiện tượng Event - Bubble = hiện tượng xảy ra Khi ta hover và move chuột trên thẻ div
		// -> tuy nhiên sự kiện bị ăn cả vào thẻ image con bên trong
		// -> gây ra hiệu ứng xấu và ngoài ý muốn trên UI
		// -> có thể chứng minh bằng cách log ra đối tượng đang chịu sự kiện = event.target
		// -> log ra cả thẻ div cha và thẻ img con bên trong.
		// console.log(event.target); -> log ra liên hồi cả thẻ div cha và thẻ img con
		// -> handle bằng cách ngăn chặn sự kiện ăn vào thẻ img (set style css cho thẻ img = pointer-events-none)
		// -> điều đó có nghĩa rằng các sự kiện onMouseEvent, tọa độ tính toán mọi thứ đều thuộc về thẻ div cha.
		// -> thêm style hover:cursor-zoom-in, hiển thị kính lúp
	};

	// cách 2 (có thể tham khảo thêm, không cần xóa bubble event của vật thể con bên trong, vì bản chất là )
	// const handleZoomProductImage = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
	// 	// window.scrollX = tọa độ của góc trên cùng bên tay trái màn hình so với trục Ox của toàn bộ trình duyệt (gốc tọa độ trên
	// 	// cùng bên tay trái), trục Ox của trình duyệt đi ngăng từ trái -> phải.
	// 	// window.scrollY = tọa độ của góc trên cùng bên tay trái màn hình so với trục Oy của toàn bộ trình duyệt (gốc tọa độ trên
	// 	// cùng bên tay trái), trục Oy của trình duyệt đi từ trên -> dưới.
	// 	// -> công thức: áp dụng thẳng (không cần set pointer-events-none cho thẻ img con nữa)
	// 	const image = imageRef.current as HTMLImageElement;
	// 	const rect = event.currentTarget.getBoundingClientRect();
	// 	const { naturalHeight, naturalWidth } = image;
	// 	const offsetX = event.pageX - (rect.x + window.scrollX);
	// 	const offsetY = event.pageY - (rect.y + window.scrollY);

	// 	const left = offsetX * (1 - naturalWidth / rect.width);
	// 	const top = offsetY * (1 - naturalHeight / rect.height);
	// 	image.style.width = `${naturalWidth}px`;
	// 	image.style.height = `${naturalHeight}px`;
	// 	image.style.top = `${top}px`;
	// 	image.style.left = `${left}px`;
	// };

	// Method quản lý chức năng out con trỏ chuột ra ngoài -> gỡ bỏ style -> gỡ bỏ hiệu ứng zoom,
	const handleCancelZoomProductImage = () => {
		const image = imageRef.current as HTMLImageElement;
		image.removeAttribute("style");
	};

	return (
		<div className='flex flex-col p-4 basis-[40%] relative lg:basis-[45%]'>
			<div
				className='w-full h-[450px] lg:h-[500px] lowMobile:h-[400px] mb-5 relative overflow-hidden hover:cursor-zoom-in'
				onMouseMove={(event) => handleZoomProductImage(event)}
				onMouseLeave={handleCancelZoomProductImage}
			>
				<img
					src={image}
					alt={productItemName}
					className='w-full h-full mb-5 absolute top-0 left-0 lg:left-[50%] lg:translate-x-[-50%] pointer-events-none lg:w-[80%] lg:h-[500px] lowMobile:h-full'
					ref={imageRef}
				/>
			</div>
			<div className='flex items-center justify-between relative'>
				{/* 
          - position = relative: vật thể lấy chính vị trí nó đang đứng làm gốc tọa độ, không bị phụ thuộc vào vị trí của bất kỳ 
          vật thể nào khác.
          - position = absolute: khi 1 vật thể có vị trí phụ thuộc vào 1 vật thể khác (vật thể đó là vật thể cha gần nhất, có 
            thuộc tính postion = relative/absolute/fixed/sticky)
          - position = fixed: khi 1 vật thể có vị trí chỉ phụ thuộc vào cửa sổ trình duyệt
          - position = sticky: không khuyến cáo sử dụng, khi 1 vật thể chỉ phụ thuộc vào cửa sổ trình duyệt.
        */}
				<button className='bg-[#00000033] flex py-3 absolute left-0' onClick={handlePreviousImagesSlider}>
					<ProductSliderLeftArrow className='m-auto' />
				</button>
				{handleRenderImagesSlider()}
				<button className='bg-[#00000033] flex py-3 absolute right-0' onClick={handleNextImagesSlider}>
					<ProductSliderRightArrow className='m-auto' />
				</button>
			</div>
			<div className='flex justify-center text-base text-[#222222] mt-8 font-thin'>
				<div className='flex basis-[40%]'>
					<span>Chia sẻ:</span>
				</div>
				<div className='flex items-center border-l border-[rgba(0, 0, 0, 0.09)] basis-[40%] pl-8'>
					<HeartIcon />
					<span className='ml-3 cursor-pointer'>Vùng thả tim</span>
				</div>
			</div>
		</div>
	);
}
