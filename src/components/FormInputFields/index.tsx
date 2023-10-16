// react hooks:
import { memo } from "react";
// types:
import { FormInputFieldsPropsType } from "src/types";

export default memo(function FormInputFields({ fields }: FormInputFieldsPropsType) {
	return (
		<div className='w-full xl:flex xl:flex-col xl:items-start'>
			{fields.map((field, index) => (
				<div className='w-full' key={index}>
					{field}
				</div>
			))}
		</div>
	);
});
