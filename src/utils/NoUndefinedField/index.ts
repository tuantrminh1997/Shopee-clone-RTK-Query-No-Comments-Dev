// type loại bỏ type undefined của các thuộc tính trong Interface/Type khác
type NoUndefinedField<T> = {
	[P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};
export default NoUndefinedField;
