import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
	const [urlSearchParams] = useSearchParams();
	return Object.fromEntries([...urlSearchParams]);
}
