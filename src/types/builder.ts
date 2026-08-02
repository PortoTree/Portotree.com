export interface Section {
  id: string;
  type: string; 
  config: any;
  elements?: SectionElement[];
  order: number;
  isActive: boolean;
}

export interface SectionElement {
  id: string;
  type: string;
  config?: any;
  content?: string;
  columns?: Column[];
  elements?: SectionElement[];
  children?: SectionElement[];
  order?: number;
}

export interface Column {
  id: string;
  width?: string;
  elements: SectionElement[];
  config?: any;
}

export interface DragItem {
  id: string;
  type: string;
  isNew?: boolean;
}

export interface ElementConfig {
  bgColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  textAlign?: string;
  mobileConfig?: any;
  [key: string]: any;
}
