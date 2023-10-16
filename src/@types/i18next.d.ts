import "i18next";
import { defaultNamespace, resources } from "src/i18n";

declare module "i18next" {
	// Kế thừa (thêm vào type)
	interface CustomTypeOptions {
		defaultNS: typeof defaultNamespace;

		// Chú ý: lấy key của resources là ngôn ngữ mặc định
		resources: (typeof resources)["vietnamese"];
	}
}
