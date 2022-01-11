export interface SteamAppsType {
  applist: Applist;
}

export interface Applist {
  apps: App[];
}

export interface App {
  appid: number;
  name: string;
}

export interface SteamAppDetails {
  '400': AppDetails;
}

export interface AppDetails {
  success: boolean;
  data: Data;
}

export interface Data {
  type: string; //in
  name: string; //in
  steam_appid: number; //in
  required_age: number; //in
  is_free: boolean; //in
  dlc: number[]; //out - Dlc
  detailed_description: string; //in
  about_the_game: string; //in
  short_description: string; //in
  supported_languages: string; //in
  header_image: string; //in
  website: string; //in
  pc_requirements: CRequirements; //out - Req
  mac_requirements: CRequirements; //out - Req
  linux_requirements: any[]; //out - Req
  developers: string[]; //out - Dev
  publishers: string[]; //out - Pub
  demos: Demo[]; //out - Demo
  price_overview: PriceOverview; //out - Price
  packages: number[]; //out - Package
  package_groups: PackageGroup[];
  platforms: Platforms;
  metacritic: Metacritic;
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  movies: Movie[];
  recommendations: Recommendations;
  achievements: Achievements;
  release_date: ReleaseDate;
  support_info: SupportInfo;
  background: string;
  content_descriptors: ContentDescriptors;
}

export interface Achievements {
  total: number;
  highlighted: Highlighted[];
}

export interface Highlighted {
  name: string;
  path: string;
}

export interface Category {
  id: number;
  description: string;
}

export interface ContentDescriptors {
  ids: any[];
  notes: null;
}

export interface Demo {
  appid: number;
  description: string;
}

export interface Genre {
  id: string;
  description: string;
}

export interface CRequirements {
  minimum: string;
}

export interface Metacritic {
  score: number;
  url: string;
}

export interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  webm: Mp4;
  mp4: Mp4;
  highlight: boolean;
}

export interface Mp4 {
  '480': string;
  max: string;
}

export interface PackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: Sub[]; //out - Sub
}

export interface Sub {
  packageid: number; //package_id
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
}

export interface Platforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

export interface PriceOverview {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
}

export interface Recommendations {
  total: number;
}

export interface ReleaseDate {
  coming_soon: boolean;
  date: string;
}

export interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

export interface SupportInfo {
  url: string;
  email: string;
}
