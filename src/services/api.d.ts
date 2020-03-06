
export interface VERSION_INFO {
  "version": string;
  "build": string;
  "download": string;
}

export interface VERSION_LIST {
  "qa": VERSION_INFO;
  "debug": VERSION_INFO;
  "production": VERSION_INFO;
}

export interface onlineVersion {
  "ios": VERSION_LIST;
  "android": VERSION_LIST;
} 