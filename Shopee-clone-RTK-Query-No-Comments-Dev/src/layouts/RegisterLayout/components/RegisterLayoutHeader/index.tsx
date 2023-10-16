// libraries:
// react-router-dom
import { useTranslation } from "react-i18next";
import { Link, useMatch } from "react-router-dom";
// icons:
import { ShopeeLogo } from "src/icons";

export default function RegisterLayoutHeader() {
	const registerMatch = useMatch("/register");
	const isRegisterMatch = Boolean(registerMatch);
	const { t } = useTranslation("loginRegister");
	return (
		<header className='py-5'>
			<div className='container flex justify-between items-center'>
				<nav className='flex items-end'>
					<Link to='/'>
						<ShopeeLogo fill='#ee4d2d' width='123px' height='40px' />
					</Link>
					<div className='ml-5 text-xl lg:text-2xl capitalize'>{isRegisterMatch ? t("login.register") : t("login.login")}</div>
				</nav>
			</div>
		</header>
	);
}
