import { UseFormRegister } from "react-hook-form";

interface SearchFormCartPropsType {
	isHeaderForCartLayout?: boolean;
	handleSubmitForm?: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
	register: UseFormRegister<{
		productListSearchForm: string;
	}>;
}
export default SearchFormCartPropsType;
