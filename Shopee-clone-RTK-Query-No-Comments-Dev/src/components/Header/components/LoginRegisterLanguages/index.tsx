/* eslint-disable @typescript-eslint/no-explicit-any */
// imports:
// react - router - dom:
import { Link } from "react-router-dom";
// types:
import { LoginRegisterLanguagesPropsType } from "src/types";
// icons:
import { ArrowDownIcon, EarthIcon } from "src/icons";
// constants:
import { paths, headerChangeLanguageOptions } from "src/constants";
// utils:
import { getUserAvatarUrl } from "src/utils";
// i18n:
import { useTranslation } from "react-i18next";
import { locales } from "src/i18n";
// common components:
import { Popover, PopoverHoverTarget, PopoverOption } from "src/components";

export default function LoginRegisterLanguages({ isLoggedIn, userProfile, handleLogout }: LoginRegisterLanguagesPropsType) {
	// paths:
	const { purchases: purchasesPathUrl, profile: profilePathUrl } = paths;
	// react i18n:
	const { i18n } = useTranslation();
	const { t } = useTranslation("header");
	const currentLanguage = locales[i18n.language as keyof typeof locales];
	const handleChangeLanguage: (targetedLanguage: keyof typeof locales) => void = (languageSelectOption: keyof typeof locales) => {
		i18n.changeLanguage(languageSelectOption as keyof typeof locales);
	};
	const loginRegisterConstants = [
		{
			to: paths.register,
			isLeftElement: true,
			title: t("header.register"),
		},
		{
			to: paths.login,
			isLeftElement: false,
			title: t("header.login"),
		},
	] as const;
	return (
		<div className='flex h-[34px] justify-end lowerMobile:justify-between xl:mr-4 lowerMobile:h-[40%] lowMobile:h-[50%]'>
			<Popover
				hoverTarget={
					<PopoverHoverTarget
						leftIcon={<EarthIcon />}
						title={<span className='mx-1'>{currentLanguage}</span>}
						rightIcon={<ArrowDownIcon />}
						containerClassName='flex xl:h-full xl:text-xl lowMobile:text-lg lowerMobile:text-sm items-center text-[13px] capitalize '
					/>
				}
				hoverTargetclassName={"flex items-center text-sm  py-[7px] px-[10px] hover:text-[hsla(0,0%,100%,.7)] cursor-pointer"}
				popoverContent={
					<div className='popoverContentLanguagesContainerStyle'>
						<div className='flex flex-col'>
							{headerChangeLanguageOptions.map((headerChangeLanguageOption, index) => {
								const { containerClassName, innerClassName, title, targetLanguage } = headerChangeLanguageOption;
								return (
									<PopoverOption
										key={index}
										containerClassName={containerClassName}
										innerClassName={innerClassName}
										title={title}
										onclick={
											(() => handleChangeLanguage(targetLanguage as keyof typeof locales)) as () => (
												languageSelectOption: keyof typeof locales,
											) => void
										}
									/>
								);
							})}
						</div>
					</div>
				}
				popoverArrowClassName='absolute translate-y-[-80%]'
			/>
			{isLoggedIn && (
				<Popover
					hoverTarget={
						<PopoverHoverTarget
							leftIcon={
								<div className='w-[20px] h-[20px] mr-2'>
									<img src={getUserAvatarUrl(userProfile?.avatar as string)} alt='userAvatar' className='w-full h-full object-cover rounded-full' />
								</div>
							}
							title={<span className='pl-[5px] xl:text-xl'>{userProfile?.name ? userProfile?.name : ((userProfile as any)?.email as string)}</span>}
							containerClassName='flex items-center text-[13px] px-[10px] py-[7px] cursor-pointer'
						/>
					}
					hoverTargetclassName={"flex items-center py-[7px] px-[10px] hover:text-[hsla(0,0%,100%,.7)] cursor-pointer"}
					popoverContent={
						<div className='popoverContentMyAccountContainerStyle'>
							<div className='flex flex-col'>
								<PopoverOption
									containerClassName={"popoverMyAccountOptionContainerStyles"}
									innerClassName={"popoverMyAccountOptionItemStyles"}
									to={profilePathUrl}
									title={t("header.my account") as string}
								/>
								<PopoverOption
									containerClassName={"popoverMyAccountOptionContainerStyles"}
									innerClassName={"popoverMyAccountOptionItemStyles"}
									to={purchasesPathUrl}
									title={t("header.my purchase") as string}
								/>
								<PopoverOption
									containerClassName={"popoverMyAccountOptionContainerStyles"}
									innerClassName={"popoverMyAccountOptionItemStyles"}
									title={t("header.logout")}
									onclick={handleLogout as () => void}
								/>
							</div>
						</div>
					}
					popoverArrowClassName='absolute translate-y-[-80%]'
				/>
			)}
			{!isLoggedIn && (
				<div className='flex text-[13px] text-white items-center justify-between'>
					{loginRegisterConstants.map((loginRegisterConstant) => {
						const { to, isLeftElement, title } = loginRegisterConstant;
						return (
							<Link
								key={to}
								to={to}
								className={`px-[10px] flex items-center cursor-pointer hover:text-[hsla(0,0%,100%,.7)] capitalize ${
									isLeftElement ? "border-r-[0.5px] border-[hsla(0,0%,100%,.4)] xl:border-none" : ""
								} xl:h-full xl:text-xl lowMobile:text-lg lowerMobile:text-sm`}
							>
								{title}
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
