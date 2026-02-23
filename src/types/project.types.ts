export interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  mainTags: string[];
  links: ProjectLink[];
  blocks: ProjectBlock[];
}

export interface ProjectLink {
  title: string;
  url: string;
  primary?: boolean;
}

export type ProjectBlock = TagsBlock | PlainBlock | RecordsBlock;

interface TagsBlock {
  title: string;
  type: "tags";
  content: string[];
}

interface PlainBlock {
  title: string;
  type: "plain";
  content: string;
}

interface RecordsBlock {
  title: string;
  type: "records";
  content: [string, string][];
}
