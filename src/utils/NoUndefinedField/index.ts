type NoUndefinedField<T> = {
	[P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};
export default NoUndefinedField;
