declare var global: {
	dvaStore: any; 
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

declare namespace $config {
	const environment: string;
	const buildType: string;
}

declare namespace i18n{
	function setI18nConfig(language: string, themeLocales: any) : string;
	const supportedLanguages: string[];
}

declare function $t(key: string, conig: any): string;

declare let $token: string | undefined;
