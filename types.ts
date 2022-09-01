export interface Movie {
  name: ContentfulText;
  description: ContentfulRichText;
  adult: ContentfulBoolean;
  duration: ContentfulText;
  genres: ContentfulEnUS<{ sys: RefEntry }[]>
  price: ContentfulNumber;
  image: ContentfulEnUS<{ sys: RefAsset }>
}

interface RefEntry {
  type: 'Link';
  linkType: 'Entry';
  id: string;
}

interface RefAsset {
  type: 'Link';
  linkType: 'Asset';
  id: string;
}

type ContentfulText = ContentfulEnUS<String>;

type ContentfulBoolean = ContentfulEnUS<boolean>;

type ContentfulNumber = ContentfulEnUS<number>;

type ContentfulEnUS<T> = {
  'en-US': T
}

type ContentfulRichText = ContentfulEnUS<ContentfulRichTypeDocument>;

type ContentfulRichTypeDocument = {
  data: {};
  content: ContentfulRichTypeParagraph[];
  nodeType: 'document'
};

type ContentfulRichTypeParagraph = {
  data: {};
  content: ContentfulRichTypeText[];
  nodeType: 'paragraph';
}

type ContentfulRichTypeText = {
  data: {};
  marks: [];
  value: string;
  nodeType: 'text'
}


export type NodeType =
  'document' |
  'paragraph' |
  'text'
