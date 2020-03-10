declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.png" {
  const content: {
    [propName: string]: any;
  };
  export default content;
}

declare module "*.jpg" {
  const content: {
    [propName: string]: any;
  };
  export default content;
}

declare module "*.jpeg" {
  const content: {
    [propName: string]: any;
  };
  export default content;
}

declare module "*.gif" {
  const content: {
    [propName: string]: any;
  };
  export default content;
}

declare module "*.json" {
	const value: any;
	export default value;
}


declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;