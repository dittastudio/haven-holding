import {StoryblokStory} from 'storyblok-generate-ts'

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface BlockMediaStoryblok {
  background?: number | string;
  colour?: number | string;
  media: AssetStoryblok;
  caption?: string;
  ratio?: number | string;
  column_start: number | string;
  column_end: number | string;
  _uid: string;
  component: "block_media";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface BlockMediaTextStoryblok {
  background?: number | string;
  colour?: number | string;
  title?: string;
  media?: AssetStoryblok;
  ratio?: number | string;
  column_start?: number | string;
  column_end?: number | string;
  text?: RichtextStoryblok;
  _uid: string;
  component: "block_media_text";
  [k: string]: any;
}

export interface BlockNewsletterStoryblok {
  background?: number | string;
  colour?: number | string;
  title?: string;
  media?: AssetStoryblok;
  ratio?: number | string;
  text?: RichtextStoryblok;
  hidden?: boolean;
  _uid: string;
  component: "block_newsletter";
  [k: string]: any;
}

export interface PageStoryblok {
  blocks?: (BlockMediaStoryblok | BlockMediaTextStoryblok | BlockNewsletterStoryblok)[];
  seo: SeoStoryblok[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface SeoStoryblok {
  seo_title: string;
  seo_description: string;
  seo_image: AssetStoryblok;
  _uid: string;
  component: "seo";
  [k: string]: any;
}

export interface SettingsStoryblok {
  hero_media_mobile?: AssetStoryblok;
  hero_media_desktop: AssetStoryblok;
  address?: RichtextStoryblok;
  socials?: SocialItemStoryblok[];
  _uid: string;
  component: "settings";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface SocialItemStoryblok {
  title?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "social_item";
  [k: string]: any;
}
