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

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface BlockMediaTextStoryblok {
  media?: AssetStoryblok;
  ratio?: number | string;
  text?: RichtextStoryblok;
  hidden?: boolean;
  _uid: string;
  component: "block_media_text";
  [k: string]: any;
}

export interface PageStoryblok {
  blocks?: BlockMediaTextStoryblok[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}
