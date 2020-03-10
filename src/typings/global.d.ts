declare var global: {
	i18n: {
		setI18nConfig: (language: string, themeLocales: any) => string;
		supportedLanguages: string[];
	};
	$t: (key: string, conig: any) => string;
	$config: {
		environment: string;
  	buildType: string;
	};
	$token: string | undefined;
	[key: string]: any; 
};

declare module "*.json" {
	const value: any;
	export default value;
}