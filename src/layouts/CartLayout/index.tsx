// types:
import { RegisterLayoutPropsType } from "src/types";
// common components:
import { Header, Footer } from "src/components";

export default function CartLayout({ children }: RegisterLayoutPropsType) {
	return (
		<div>
			<Header isHeaderForCartLayout />
			<div className='flex justify-center bg-[rgba(0,0,0,.09)]'>{children}</div>
			<Footer />
		</div>
	);
}
