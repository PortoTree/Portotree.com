// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Type, AlignLeft, MousePointerClick, Image as ImageIcon, Minus, Award, GripVertical, Trash2, LayoutGrid, SeparatorHorizontal, Columns, Pencil, ShoppingBag, Folder, ChevronLeft, ChevronRight, Move, Menu } from "lucide-react";
import { useStorefront } from "../storefront/StorefrontProvider";
import ProductCard from "../storefront/ProductCard";
import Link from "next/link";
import { generateMobileCss } from '@/lib/utils';

// Ã¢â€â‚¬Ã¢â€â‚¬ TYPES Ã¢â€â‚¬Ã¢â€â‚¬
export interface SectionElement {
  id: string;
  type: 'HEADING' | 'TEXT' | 'BUTTON' | 'IMAGE' | 'SPACER' | 'BADGE' | 'GALLERY' | 'DIVIDER' | 'COLUMN' | 'BRANDING' | 'MENU' | 'CART' | 'CATEGORY_LIST' | 'PRODUCT_LIST';
  config: any;
  order: number;
  children?: SectionElement[]; // For Columns
}

// Helper to format dynamic style spacing values (px, %, vw, custom, etc.)
export const formatStyleValue = (val: any, defaultVal: number | string = 0): string | undefined => {
  if (val === undefined || val === null || val === '') {
    const fallback = typeof defaultVal === 'number' ? `${defaultVal}px` : defaultVal;
    return fallback;
  }
  if (typeof val === 'number') {
    return `${val}px`;
  }
  const str = String(val).trim();
  let result = str;
  // If it already ends with a valid CSS unit or has custom parts
  if (/^[\d.-]+(px|vw|%|rem|em|vh)$/.test(str) || ['auto', 'inherit', 'initial', 'unset'].includes(str)) {
    result = str;
  }
  // If it's multiple parts (e.g., custom value "10px 20px 10px 20px" or "10px 5%")
  else if (str.includes(' ') || str.includes(',')) {
    result = str;
  }
  // If it's a number only as string, append px
  else if (/^[\d.-]+$/.test(str)) {
    result = `${str}px`;
  }

  console.log(`[Format Spacing] Input Spacing: "${val}" -> Output Style: "${result}"`);
  return result;
};

export interface BuilderSectionConfig {
  bgColor?: string;
  bgImageUrl?: string;
  overlay?: number;
  textColor?: string;
  textAlign?: 'text-left' | 'text-center' | 'text-right';
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  maxWidth?: string;
  contentWidth?: 'boxed' | 'full';
  layout?: 'flexbox' | 'grid';
  columns?: number;
  rows?: number;
  customGridColumns?: string;
  customGridRows?: string;
  customGridClass?: string;
  placeholderCount?: number;
  showGridOutline?: boolean;
  gap?: number;
  columnGap?: number;
  rowGap?: number;
  gapLinked?: boolean;
  flexWrap?: 'nowrap' | 'wrap';
  borderRadius?: number;
  bgWidth?: 'full' | 'fit';
  mobileConfig?: any;
  [key: string]: any;
  borderRadiusTop?: number;
  borderRadiusRight?: number;
  borderRadiusBottom?: number;
  borderRadiusLeft?: number;
  borderRadiusLinked?: boolean;
  borderType?: string;
  borderColor?: string;
  borderWidth?: number;
  borderWidthTop?: number;
  borderWidthRight?: number;
  borderWidthBottom?: number;
  borderWidthLeft?: number;
  boxShadow?: string;
  boxShadowType?: string;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  shadowSpread?: number;
  align?: 'left' | 'center' | 'right' | 'start' | 'end' | 'stretch';
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  // Background Extensions
  bgType?: 'classic' | 'gradient';
  bgGradientType?: 'linear' | 'radial';
  bgGradientColor1?: string;
  bgGradientColor2?: string;
  bgGradientLoc1?: number;
  bgGradientLoc2?: number;
  bgGradientAngle?: number;
  bgGradientRadialPos?: string;
  bgImageOpacity?: number;
  bgImageBlur?: number;
  // Hover configuration for borders and shadows
  hoverBorderType?: string;
  hoverBorderColor?: string;
  hoverBorderWidth?: number;
  hoverBorderWidthTop?: number;
  hoverBorderWidthRight?: number;
  hoverBorderWidthBottom?: number;
  hoverBorderWidthLeft?: number;
  hoverBorderWidthLinked?: boolean;
  hoverBorderRadius?: number;
  hoverBorderRadiusTop?: number;
  hoverBorderRadiusRight?: number;
  hoverBorderRadiusBottom?: number;
  hoverBorderRadiusLeft?: number;
  hoverBorderRadiusLinked?: boolean;
  hoverBoxShadow?: string;
  hoverBoxShadowType?: string;
  hoverShadowColor?: string;
  hoverShadowOffsetX?: number;
  hoverShadowOffsetY?: number;
  hoverShadowBlur?: number;
  hoverShadowSpread?: number;
  // Hover background
  hoverBgColor?: string;
  hoverBgType?: 'classic' | 'gradient';
  hoverBgGradientType?: 'linear' | 'radial';
  hoverBgGradientColor1?: string;
  hoverBgGradientColor2?: string;
  hoverBgGradientLoc1?: number;
  hoverBgGradientLoc2?: number;
  hoverBgGradientAngle?: number;
  hoverBgGradientRadialPos?: string;
  hoverBgImageUrl?: string;
  hoverOverlay?: number;
  // Hover transition
  hoverTransitionDuration?: number;
  // Position & stacking
  position?: 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky';
  zIndex?: number;
  sticky?: boolean;
}

export const ELEMENT_TYPE_MAP: Record<string, { label: string; icon: any; defaultConfig?: any }> = {
  HEADING: { label: 'Heading', icon: Type, defaultConfig: { fontSize: 30 } },
  TEXT: { label: 'Paragraph', icon: AlignLeft },
  BUTTON: { label: 'Button', icon: MousePointerClick },
  IMAGE: { label: 'Image', icon: ImageIcon },
  GALLERY: { label: 'Gallery', icon: LayoutGrid },
  SPACER: { label: 'Spacer', icon: Minus },
  DIVIDER: { label: 'Divider', icon: SeparatorHorizontal },
  BADGE: { label: 'Badge', icon: Award },
  COLUMN: {
    label: 'Kolom',
    icon: Columns,
    defaultConfig: {
      layout: 'flexbox',
      gap: 16,
      align: 'left',
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      bgColor: 'transparent',
      borderRadius: 0
    }
  },
  BRANDING: {
    label: 'Nama & Logo Toko',
    icon: Award,
    defaultConfig: {
      fontSize: 16,
      textColor: '#18181B'
    }
  },
  MENU: {
    label: 'Menu Navigasi',
    icon: AlignLeft,
    defaultConfig: {
      fontSize: 20,
      textColor: '#18181B',
      align: 'center',
      fontFamily: 'Inter',
      hiddenMenus: []
    }
  },
  CART: {
    label: 'Tombol Keranjang',
    icon: ShoppingBag,
    defaultConfig: {
      text: 'Keranjang',
      bgColor: '#18181B',
      textColor: '#FFFFFF',
      borderRadius: 8,
      buttonType: 'Asali',
      iconType: 'none',
      iconPosition: 'before',
      iconSpacing: 4
    }
  },
  CATEGORY_LIST: {
    label: 'Daftar Kategori',
    icon: Folder,
    defaultConfig: {
      title: 'Kategori Populer',
      layout: 'slider',
      columns: 5,
      columnsMobile: 2,
      borderRadius: 9999,
      titleColor: '#18181B',
      textColor: '#18181B',
      fontSize: 14,
      titleFontSize: 22,
      fontWeight: '700',
      titleFontWeight: '700',
      align: 'center',
      showDots: true,
      showArrows: true
    }
  },
  PRODUCT_LIST: {
    label: 'Grid Produk',
    icon: ShoppingBag,
    defaultConfig: {
      title: 'Produk Pilihan',
      source: 'ALL',
      categoryId: '',
      limit: 10,
      limitMobile: 8,
      columns: 5,
      columnsMobile: 2,
      titleColor: '#18181B',
      cardBorderRadius: 8,
      showStock: true,
      showComparePrice: true,
      titleFontSize: 22,
      productNameFontSize: 17,
      priceFontWeight: '700',
      stockFontWeight: '800'
    }
  }
};

// Ã¢â€â‚¬Ã¢â€â‚¬ HEADING ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const HeadingElement = ({ config }: { config: any }) => {
  const Tag = config.tag || 'h2';
  const sizeMap: Record<string, string> = {
    h1: 'text-3xl md:text-4xl font-extrabold tracking-tight',
    h2: 'text-2xl md:text-3xl font-bold tracking-tight',
    h3: 'text-xl md:text-2xl font-bold',
    h4: 'text-lg md:text-xl font-semibold',
  };
  const finalColor = config.textColor || config.color || '#18181b';
  
  // Custom styles parsing
  const textStrokeStyle = config.textStrokeWidth !== undefined && config.textStrokeWidth > 0
    ? `${config.textStrokeWidth}px ${config.textStrokeColor || '#000000'}`
    : undefined;

  const textShadowStyle = (config.textShadowColor || config.textShadowBlur !== undefined || config.textShadowOffsetX !== undefined || config.textShadowOffsetY !== undefined)
    ? `${config.textShadowOffsetX || 0}px ${config.textShadowOffsetY || 0}px ${config.textShadowBlur || 0}px ${config.textShadowColor || 'rgba(0,0,0,0.5)'}`
    : undefined;

  console.log(`[BuilderSection Heading Debug] Rendering Heading: "${config.text || 'Awesome Heading'}", Color: "${finalColor}", Stroke: "${textStrokeStyle}", Shadow: "${textShadowStyle}"`);
  
  const baseFontSize = typeof config.fontSize === 'number' ? config.fontSize : (parseInt(config.fontSize) || 30);
  // Automatically scale down headings by 40% on mobile, minimum 18px (unless base is smaller)
  const mobileFontSize = Math.min(baseFontSize, Math.max(18, Math.floor(baseFontSize * 0.6)));

  // Base style untuk element Heading
  const headingStyle: React.CSSProperties = {
    color: finalColor,
    fontFamily: config.fontFamily || 'inherit',
    fontWeight: config.fontWeight || '700',
    textAlign: config.align || 'left',
    letterSpacing: config.letterSpacing || '0px',
    lineHeight: config.lineHeight || '1.2',
    textTransform: config.textTransform || 'none',
    fontStyle: config.fontStyle || 'normal',
    textDecoration: config.textDecoration || 'none',
    wordSpacing: config.wordSpacing || '0px',
    WebkitTextStroke: textStrokeStyle,
    textShadow: textShadowStyle,
    mixBlendMode: config.mixBlendMode || 'normal',
    fontSize: `${baseFontSize}px`,
    '--font-mobile': `${mobileFontSize}px`,
    
    // Background properties
    backgroundColor: config.bgColor || 'transparent',
    
    // Border Radius
    borderTopLeftRadius: config.bgBorderRadiusTopLeft !== undefined ? `${config.bgBorderRadiusTopLeft}px` : (config.bgBorderRadius !== undefined ? `${config.bgBorderRadius}px` : undefined),
    borderTopRightRadius: config.bgBorderRadiusTopRight !== undefined ? `${config.bgBorderRadiusTopRight}px` : (config.bgBorderRadius !== undefined ? `${config.bgBorderRadius}px` : undefined),
    borderBottomRightRadius: config.bgBorderRadiusBottomRight !== undefined ? `${config.bgBorderRadiusBottomRight}px` : (config.bgBorderRadius !== undefined ? `${config.bgBorderRadius}px` : undefined),
    borderBottomLeftRadius: config.bgBorderRadiusBottomLeft !== undefined ? `${config.bgBorderRadiusBottomLeft}px` : (config.bgBorderRadius !== undefined ? `${config.bgBorderRadius}px` : undefined),
    
    // Padding
    paddingTop: config.bgPaddingTop !== undefined ? `${config.bgPaddingTop}px` : (config.bgPaddingY !== undefined ? `${config.bgPaddingY}px` : undefined),
    paddingBottom: config.bgPaddingBottom !== undefined ? `${config.bgPaddingBottom}px` : (config.bgPaddingY !== undefined ? `${config.bgPaddingY}px` : undefined),
    paddingLeft: config.bgPaddingLeft !== undefined ? `${config.bgPaddingLeft}px` : (config.bgPaddingX !== undefined ? `${config.bgPaddingX}px` : undefined),
    paddingRight: config.bgPaddingRight !== undefined ? `${config.bgPaddingRight}px` : (config.bgPaddingX !== undefined ? `${config.bgPaddingX}px` : undefined),
    
    // Border Type, Width & Color
    borderStyle: config.bgBorderType && config.bgBorderType !== 'none' ? config.bgBorderType : undefined,
    borderTopWidth: config.bgBorderWidthTop !== undefined ? formatStyleValue(config.bgBorderWidthTop) : (config.bgBorderWidth !== undefined ? formatStyleValue(config.bgBorderWidth) : undefined),
    borderRightWidth: config.bgBorderWidthRight !== undefined ? formatStyleValue(config.bgBorderWidthRight) : (config.bgBorderWidth !== undefined ? formatStyleValue(config.bgBorderWidth) : undefined),
    borderBottomWidth: config.bgBorderWidthBottom !== undefined ? formatStyleValue(config.bgBorderWidthBottom) : (config.bgBorderWidth !== undefined ? formatStyleValue(config.bgBorderWidth) : undefined),
    borderLeftWidth: config.bgBorderWidthLeft !== undefined ? formatStyleValue(config.bgBorderWidthLeft) : (config.bgBorderWidth !== undefined ? formatStyleValue(config.bgBorderWidth) : undefined),
    borderColor: config.bgBorderColor || undefined,
    
    // Box Shadow
    boxShadow: config.bgBoxShadow || undefined,
    
    // Width & Display
    display: config.bgWidth === 'fit' ? 'inline-block' : 'block',
    width: config.bgWidth === 'fit' ? 'auto' : '100%',
  };

  const content = (
    <Tag
      className={`responsive-text ${config.fontSize ? '' : (sizeMap[Tag] || 'text-2xl')} transition-all`}
      style={headingStyle}
    >
      {config.text || 'Awesome Heading'}
    </Tag>
  );

  // Jika Lebar Latar adalah "Sesuai Teks" (fit), bungkus dengan div beralignment agar posisi teks tetap di kiri/tengah/kanan kolom kontainer dengan benar
  if (config.bgWidth === 'fit') {
    return (
      <div 
        className="w-full animate-in fade-in duration-200"
        style={{ 
          textAlign: config.align || 'left'
        }}
      >
        {content}
      </div>
    );
  }

  return content;
};

// Ã¢â€â‚¬Ã¢â€â‚¬ TEXT ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const TextElement = ({ config, elementId }: { config: any, elementId?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const finalId = elementId ? `text-el-${elementId}` : `text-el-${Math.random().toString(36).substr(2, 9)}`;

  const textColor = isHovered 
    ? (config.hoverTextColor || config.textColor || '#4b5563') 
    : (config.textColor || '#4b5563');

  const textShadow = config.textShadowColor && config.textShadowColor !== 'transparent'
    ? `${config.textShadowOffsetX || 0}px ${config.textShadowOffsetY || 0}px ${config.textShadowBlur || 0}px ${config.textShadowColor}`
    : 'none';

  const defaultLinkColor = config.linkColor || '#2563eb';
  const defaultHoverLinkColor = config.hoverLinkColor || config.linkColor || '#1d4ed8';

  const htmlContent = config.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  const baseFontSize = typeof config.fontSize === 'number' ? config.fontSize : (parseInt(config.fontSize) || 16);
  // Automatically scale down text by 20% on mobile, minimum 14px (unless base is smaller)
  const mobileFontSize = Math.min(baseFontSize, Math.max(14, Math.floor(baseFontSize * 0.8)));

  return (
    <>
      <style>{`
        #${finalId} {
          transition: color ${config.transitionDuration ?? 0.3}s ease;
        }
        #${finalId} a {
          color: ${defaultLinkColor} !important;
          transition: color ${config.transitionDuration ?? 0.3}s ease;
        }
        #${finalId} a:hover {
          color: ${defaultHoverLinkColor} !important;
        }
        ${config.dropCap ? `
        #${finalId}::first-letter {
          font-size: 3.2em;
          float: left;
          line-height: 0.85;
          margin-top: 0.1em;
          margin-right: 0.08em;
          font-weight: bold;
          color: inherit;
        }
        ` : ''}
      `}</style>
      <div 
        id={finalId}
        className="w-full responsive-text leading-relaxed"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          fontSize: `${baseFontSize}px`,
          '--font-mobile': `${mobileFontSize}px`,
          fontWeight: config.fontWeight || 'normal',
          color: textColor,
          textAlign: config.align || 'left',
          fontFamily: config.fontFamily || 'inherit',
          fontStyle: config.fontStyle || 'normal',
          textTransform: config.textTransform || 'none',
          letterSpacing: config.letterSpacing || '0px',
          lineHeight: config.lineHeight || '1.6',
          columnCount: config.columns ? Number(config.columns) : undefined,
          columnGap: config.columnGap || undefined,
        } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </>
  );
};

// Ã¢â€â‚¬Ã¢â€â‚¬ BUTTON ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const ButtonElement = ({ config }: { config: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverClassRef = useRef(`bh_${Math.random().toString(36).substr(2, 8)}`);

  useEffect(() => {
    console.log(`[Button Hover State Debug] isHovered: ${isHovered}, hoverBgColor: ${config.hoverBgColor}, hoverTextColor: ${config.hoverTextColor}, hoverBorderColor: ${config.hoverBorderColor}`);
  }, [isHovered, config.hoverBgColor, config.hoverTextColor, config.hoverBorderColor]);

  // Build CSS hover string using simple concatenation (no nested templates to avoid parser issues)
  const hoverStyles: string[] = [];
  if (config.hoverBgColor) hoverStyles.push('background-color:' + config.hoverBgColor + '!important');
  if (config.hoverTextColor) hoverStyles.push('color:' + config.hoverTextColor + '!important');
  if (config.hoverBorderColor) hoverStyles.push('border-color:' + config.hoverBorderColor + '!important');
  if (config.hoverBgType === 'gradient' && config.hoverGradientStart && config.hoverGradientEnd) {
    const a = config.hoverGradientAngle || '90deg';
    hoverStyles.push('background:linear-gradient(' + a + ',' + config.hoverGradientStart + ',' + config.hoverGradientEnd + ')!important');
  }
  if (config.hoverBoxShadowOffsetX !== undefined || config.hoverBoxShadowBlur !== undefined) {
    const sx = config.hoverBoxShadowOffsetX ?? config.boxShadowOffsetX ?? 0;
    const sy = config.hoverBoxShadowOffsetY ?? config.boxShadowOffsetY ?? 0;
    const bl = config.hoverBoxShadowBlur ?? config.boxShadowBlur ?? 0;
    const sc = config.hoverBoxShadowColor || config.boxShadowColor || 'rgba(0,0,0,0.15)';
    hoverStyles.push('box-shadow:' + sx + 'px ' + sy + 'px ' + bl + 'px ' + sc + '!important');
  }

  // Base (non-hover) background Ã¢â‚¬â€ CSS :hover overrides for hover state
  let backgroundStyle: string | undefined = undefined;
  let backgroundColorStyle: string | undefined = undefined;

  if (config.bgType === 'gradient') {
    backgroundStyle = `linear-gradient(${config.gradientAngle || '90deg'}, ${config.gradientStart || '#3b82f6'}, ${config.gradientEnd || '#8b5cf6'})`;
  } else {
    backgroundColorStyle = config.bgColor || '#2563eb';
  }

  // Bayangan Tombol (Box Shadow) Ã¢â‚¬â€ base values; CSS :hover overrides for hover
  const boxShadowStyle = (config.boxShadowColor || config.boxShadowBlur !== undefined || config.boxShadowOffsetX !== undefined || config.boxShadowOffsetY !== undefined)
    ? `${config.boxShadowOffsetX ?? 0}px ${config.boxShadowOffsetY ?? 0}px ${config.boxShadowBlur ?? 0}px ${config.boxShadowColor || 'rgba(0,0,0,0.15)'}`
    : undefined;

  // Bayangan Teks (Text Shadow)
  const currentTextShadowColor = isHovered 
    ? (config.hoverTextShadowColor || config.textShadowColor)
    : config.textShadowColor;
  const currentTextShadowBlur = isHovered
    ? (config.hoverTextShadowBlur ?? config.textShadowBlur)
    : config.textShadowBlur;
  const currentTextShadowOffsetX = isHovered
    ? (config.hoverTextShadowOffsetX ?? config.textShadowOffsetX)
    : config.textShadowOffsetX;
  const currentTextShadowOffsetY = isHovered
    ? (config.hoverTextShadowOffsetY ?? config.textShadowOffsetY)
    : config.textShadowOffsetY;

  const textShadowStyle = (currentTextShadowColor || currentTextShadowBlur !== undefined || currentTextShadowOffsetX !== undefined || currentTextShadowOffsetY !== undefined)
    ? `${currentTextShadowOffsetX || 0}px ${currentTextShadowOffsetY || 0}px ${currentTextShadowBlur || 0}px ${currentTextShadowColor || 'rgba(0,0,0,0.15)'}`
    : undefined;

  // Stroke Teks (Text Stroke)
  const currentTextStrokeWidth = isHovered 
    ? (config.hoverTextStrokeWidth ?? config.textStrokeWidth ?? 0) 
    : (config.textStrokeWidth ?? 0);
  const currentTextStrokeColor = isHovered 
    ? (config.hoverTextStrokeColor || config.textStrokeColor || '#000000') 
    : (config.textStrokeColor || '#000000');
  
  const textStrokeStyle = currentTextStrokeWidth 
    ? `${currentTextStrokeWidth}px ${currentTextStrokeColor}` 
    : undefined;

  // Animasi & Transform Sorotan
  let transformStyle: string | undefined = undefined;
  let animationStyle: string | undefined = undefined;

  if (isHovered) {
    if (config.hoverAnimation === 'grow') {
      transformStyle = 'scale(1.05)';
    } else if (config.hoverAnimation === 'shrink') {
      transformStyle = 'scale(0.95)';
    } else if (config.hoverAnimation === 'shift-up') {
      transformStyle = 'translateY(-4px)';
    } else if (config.hoverAnimation === 'shift-down') {
      transformStyle = 'translateY(4px)';
    } else if (config.hoverAnimation === 'rotate') {
      transformStyle = 'rotate(2deg) scale(1.02)';
    } else if (config.hoverAnimation === 'pulse') {
      animationStyle = 'btn-pulse-anim 1s infinite ease-in-out';
    } else if (config.hoverAnimation === 'glow') {
      animationStyle = 'btn-glow-anim 1.5s infinite ease-in-out';
    }
  }

  // Durasi Transisi
  const durationVal = config.transitionDuration ?? 0.2;
  const durationUnit = config.transitionDurationUnit || 's';
  const transitionDurationStyle = `${durationVal}${durationUnit}`;

  useEffect(() => {
    console.log("[BuilderSection ButtonElement Debug] Rendering button with styles:", {
      id: config.elementId,
      fontFamily: config.fontFamily,
      fontSize: `${config.fontSize ?? 16}${config.fontSizeUnit || 'px'}`,
      fontWeight: config.fontWeight,
      textTransform: config.textTransform,
      fontStyle: config.fontStyle,
      textDecoration: config.textDecoration,
      lineHeight: config.lineHeight ? `${config.lineHeight}${config.lineHeightUnit || ''}` : undefined,
      letterSpacing: config.letterSpacing ? `${config.letterSpacing}${config.letterSpacingUnit || 'px'}` : undefined,
      wordSpacing: config.wordSpacing ? `${config.wordSpacing}${config.wordSpacingUnit || 'px'}` : undefined,
      textShadow: textShadowStyle,
      textStroke: textStrokeStyle,
    });
  }, [
    config.elementId,
    config.fontFamily,
    config.fontSize,
    config.fontSizeUnit,
    config.fontWeight,
    config.textTransform,
    config.fontStyle,
    config.textDecoration,
    config.lineHeight,
    config.lineHeightUnit,
    config.letterSpacing,
    config.letterSpacingUnit,
    config.wordSpacing,
    config.wordSpacingUnit,
    textShadowStyle,
    textStrokeStyle
  ]);

  return (
    <div className="w-full" style={{ textAlign: config.align || 'left' }}>
      {/* Dynamic Keyframes & Hover Style Block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes btn-pulse-anim {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes btn-glow-anim {
          0%, 100% { box-shadow: 0 0 5px ${config.hoverBorderColor || config.hoverBgColor || '#2563eb'}; }
          50% { box-shadow: 0 0 20px ${config.hoverBorderColor || config.hoverBgColor || '#2563eb'}; }
        }
        ${hoverStyles.length > 0 ? '.' + hoverClassRef.current + ':hover { ' + hoverStyles.join('; ') + ' }' : ''}
      ` }} />
      <a
        id={config.elementId || undefined}
        href={config.url || '#'}
        target={config.targetLink || '_self'}
        onClick={(e) => e.preventDefault()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${hoverClassRef.current} pointer-events-auto inline-flex items-center justify-center transition-all hover:opacity-90 active:scale-95`}
        style={{
          background: backgroundStyle,
          backgroundColor: backgroundColorStyle,
          color: config.textColor || '#ffffff',
          paddingTop: formatStyleValue(config.paddingY, 12),
          paddingBottom: formatStyleValue(config.paddingY, 12),
          paddingLeft: formatStyleValue(config.paddingX, 24),
          paddingRight: formatStyleValue(config.paddingX, 24),
          borderRadius: `${config.borderRadius ?? 8}px`,
          fontSize: `${config.fontSize ?? 16}${config.fontSizeUnit || 'px'}`,
          fontFamily: config.fontFamily || 'inherit',
          fontWeight: config.fontWeight || '700',
          textTransform: config.textTransform || 'none',
          fontStyle: config.fontStyle || 'normal',
          textDecoration: config.textDecoration || 'none',
          lineHeight: config.lineHeight !== undefined ? `${config.lineHeight}${config.lineHeightUnit || ''}` : undefined,
          letterSpacing: config.letterSpacing !== undefined ? `${config.letterSpacing}${config.letterSpacingUnit || 'px'}` : undefined,
          wordSpacing: config.wordSpacing !== undefined ? `${config.wordSpacing}${config.wordSpacingUnit || 'px'}` : undefined,
          border: config.borderWidth ? `${config.borderWidth}px ${config.borderStyle || 'solid'} ${config.borderColor || '#2563eb'}` : 'none',
          width: config.fullWidth ? '100%' : undefined,
          boxShadow: boxShadowStyle,
          textShadow: textShadowStyle,
          WebkitTextStroke: textStrokeStyle,
          gap: `${config.iconSpacing ?? 4}${config.iconSpaceUnit || 'px'}`,
          transform: transformStyle,
          animation: animationStyle,
          transitionDuration: transitionDurationStyle,
        }}
      >
        {config.iconType === 'custom' && (config.customIconSvg || config.icon) && (config.iconPosition || 'before') === 'before' && (
          config.iconColor ? (
            <span
              style={{
                display: 'inline-block',
                width: config.iconSize || 20,
                height: config.iconSize || 20,
                backgroundColor: config.iconColor,
                mask: `url(${config.customIconSvg || config.icon}) center/contain no-repeat`,
                WebkitMask: `url(${config.customIconSvg || config.icon}) center/contain no-repeat`,
              }}
              className="shrink-0"
            />
          ) : (
            <img src={config.customIconSvg || config.icon} alt="icon" className="object-contain shrink-0" style={{ width: config.iconSize || 20, height: config.iconSize || 20 }} />
          )
        )}
        <span>{config.text || 'Click Me'}</span>
        {config.iconType === 'custom' && (config.customIconSvg || config.icon) && config.iconPosition === 'after' && (
          config.iconColor ? (
            <span
              style={{
                display: 'inline-block',
                width: config.iconSize || 20,
                height: config.iconSize || 20,
                backgroundColor: config.iconColor,
                mask: `url(${config.customIconSvg || config.icon}) center/contain no-repeat`,
                WebkitMask: `url(${config.customIconSvg || config.icon}) center/contain no-repeat`,
              }}
              className="shrink-0"
            />
          ) : (
            <img src={config.customIconSvg || config.icon} alt="icon" className="object-contain shrink-0" style={{ width: config.iconSize || 20, height: config.iconSize || 20 }} />
          )
        )}
      </a>
    </div>
  );
};

// Ã¢â€â‚¬Ã¢â€â‚¬ IMAGE ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const ImageElement = ({ config }: { config: any }) => {
  useEffect(() => {
    console.log(`[BuilderSection Image Debug] width: ${config.width}, height: ${config.height}, clickUrl: ${config.clickUrl}`);
  }, [config.width, config.height, config.clickUrl]);

  // CSS Filters
  const filters = [];
  if (config.blur !== undefined && config.blur > 0) filters.push(`blur(${config.blur}px)`);
  if (config.brightness !== undefined && config.brightness !== 100) filters.push(`brightness(${config.brightness}%)`);
  if (config.contrast !== undefined && config.contrast !== 100) filters.push(`contrast(${config.contrast}%)`);
  if (config.saturate !== undefined && config.saturate !== 100) filters.push(`saturate(${config.saturate}%)`);
  if (config.hueRotate !== undefined && config.hueRotate > 0) filters.push(`hue-rotate(${config.hueRotate}deg)`);
  const filterString = filters.length > 0 ? filters.join(' ') : undefined;

  // Opacity
  const opacityValue = config.opacity !== undefined ? config.opacity / 100 : undefined;

  // Custom Border Radius
  const unit = config.borderRadiusUnit || 'px';
  const borderRadiusStyle = config.borderRadiusType === 'custom'
    ? `${config.borderRadiusTop ?? config.borderRadius ?? 0}${unit} ${config.borderRadiusRight ?? config.borderRadius ?? 0}${unit} ${config.borderRadiusBottom ?? config.borderRadius ?? 0}${unit} ${config.borderRadiusLeft ?? config.borderRadius ?? 0}${unit}`
    : `${config.borderRadius ?? 0}px`;

  // Custom Box Shadow
  let boxShadowStyle = 'none';
  if (config.boxShadowType === 'custom') {
    boxShadowStyle = `${config.shadowOffsetX ?? 0}px ${config.shadowOffsetY ?? 0}px ${config.shadowBlur ?? 10}px ${config.shadowSpread ?? 0}px ${config.shadowColor || 'rgba(0,0,0,0.5)'}`;
  } else {
    const shadowVal = config.shadow || config.boxShadow || 'none';
    boxShadowStyle = shadowVal === 'sm' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' 
      : shadowVal === 'md' ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
      : shadowVal === 'lg' ? '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
      : shadowVal === 'hover-glow' ? '0 10px 15px -3px rgba(59, 130, 246, 0.4)' 
      : 'none';
  }

  // Border Style
  const unitW = config.borderWidthUnit || 'px';
  const borderTop = config.borderStyle && config.borderStyle !== 'none'
    ? `${config.borderWidthTop ?? config.borderWidth ?? 1}${unitW} ${config.borderStyle} ${config.borderColor || '#000000'}`
    : 'none';
  const borderRight = config.borderStyle && config.borderStyle !== 'none'
    ? `${config.borderWidthRight ?? config.borderWidth ?? 1}${unitW} ${config.borderStyle} ${config.borderColor || '#000000'}`
    : 'none';
  const borderBottom = config.borderStyle && config.borderStyle !== 'none'
    ? `${config.borderWidthBottom ?? config.borderWidth ?? 1}${unitW} ${config.borderStyle} ${config.borderColor || '#000000'}`
    : 'none';
  const borderLeft = config.borderStyle && config.borderStyle !== 'none'
    ? `${config.borderWidthLeft ?? config.borderWidth ?? 1}${unitW} ${config.borderStyle} ${config.borderColor || '#000000'}`
    : 'none';

  const imageStyles: React.CSSProperties = {
    width: formatStyleValue(config.width, '100%'),
    height: formatStyleValue(config.height, '100%'),
    objectFit: 'cover',
    borderRadius: borderRadiusStyle,
    boxShadow: boxShadowStyle,
    borderTop: borderTop,
    borderRight: borderRight,
    borderBottom: borderBottom,
    borderLeft: borderLeft,
    filter: filterString,
    opacity: opacityValue,
  };

  const imageContent = (
    <img
      src={config.url || '/placeholder-gambar.png'}
      alt={config.alt || 'Visual Storefront'}
      className="max-w-full w-full h-full transition-all"
      style={imageStyles}
    />
  );

  return (
    <div
      className="w-full h-full flex transition-all"
      style={{
        justifyContent: config.align === 'center' ? 'center' : config.align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      {config.clickUrl ? (
        <a 
          href={config.clickUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full h-full max-w-full hover:opacity-95 transition-opacity"
        >
          {imageContent}
        </a>
      ) : (
        imageContent
      )}
    </div>
  );
};

// Ã¢â€â‚¬Ã¢â€â‚¬ GALLERY ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const GalleryElement = ({ config }: { config: any }) => {
  const images = config.images || [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&auto=format&fit=crop&q=60',
  ];

  const getGridColumnsCount = () => {
    const cols = config.columns || 3;
    const layout = config.gridLayout || 'auto';
    if (layout === 'auto') return cols;
    const parts = layout.split('x');
    if (parts.length === 2) {
      const c = parseInt(parts[0]);
      if (!isNaN(c)) return c;
    }
    return cols;
  };

  const formatDimension = (val: any) => {
    if (!val) return undefined;
    const str = String(val).trim();
    if (/^\d+$/.test(str)) return `${str}px`;
    return str;
  };

  const columnsCount = getGridColumnsCount();
  const isKhusus = config.resolutionMode === 'khusus';

  // Compute gap value based on mode
  const effectiveGap = config.gapMode === 'khusus' ? (config.gap ?? 15) : 16;

  // Compute border radius per-corner
  const radiusUnit = config.borderRadiusUnit || 'px';
  const fallbackRadius = config.borderRadius !== undefined ? `${config.borderRadius}${radiusUnit}` : '0';
  const brTop = config.borderRadiusTop !== undefined ? `${config.borderRadiusTop}${radiusUnit}` : fallbackRadius;
  const brRight = config.borderRadiusRight !== undefined ? `${config.borderRadiusRight}${radiusUnit}` : fallbackRadius;
  const brBottom = config.borderRadiusBottom !== undefined ? `${config.borderRadiusBottom}${radiusUnit}` : fallbackRadius;
  const brLeft = config.borderRadiusLeft !== undefined ? `${config.borderRadiusLeft}${radiusUnit}` : fallbackRadius;
  const borderRadiusStr = [brTop, brRight, brBottom, brLeft].every(v => v === 'inherit') 
    ? 'inherit' 
    : `${brTop} ${brRight} ${brBottom} ${brLeft}`;

  // Border style (Asali = no explicit border, none = none, others = 1px <style> transparent)
  const effectiveBorderStyle = config.borderStyle || 'Asali';

  // Rule 8: Debug log to verify successful rendering/configuration propagation
  console.log(`[GalleryElement] Rendered. Columns: ${columnsCount}, Layout: ${config.gridLayout || 'auto'}, ResolutionMode: ${config.resolutionMode || 'auto'}, Gap: ${effectiveGap}, BorderRadius: ${borderRadiusStr}, BorderStyle: ${effectiveBorderStyle}`);

  return (
    <div
      className="grid w-full h-full transition-all justify-items-center"
      style={{
        gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
        gap: `${effectiveGap}px`,
      }}
    >
      {images.map((img: string, idx: number) => {
        const imgStyle: React.CSSProperties = {
          borderRadius: borderRadiusStr,
          width: isKhusus && config.imageWidth ? formatDimension(config.imageWidth) : '100%',
          height: isKhusus && config.imageHeight ? formatDimension(config.imageHeight) : '100%',
          minHeight: isKhusus && config.imageHeight ? undefined : '12rem',
          objectFit: 'cover',
          ...(effectiveBorderStyle !== 'Asali' && effectiveBorderStyle !== 'none'
            ? { border: `1px ${effectiveBorderStyle} rgba(255,255,255,0.15)` }
            : effectiveBorderStyle === 'none'
              ? { border: 'none' }
              : {}),
        };

        return (
          <div key={idx} className="flex justify-center items-center overflow-hidden w-full h-full">
            <img
              src={img}
              alt={`Gallery item ${idx + 1}`}
              className="transition-all hover:scale-[1.02]"
              style={imgStyle}
            />
          </div>
        );
      })}
    </div>
  );
};

// Ã¢â€â‚¬Ã¢â€â‚¬ SPACER ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const SpacerElement = ({ config }: { config: any }) => (
  <div style={{ height: `${config.height ?? 40}px` }} className="w-full" />
);

// Ã¢â€â‚¬Ã¢â€â‚¬ DIVIDER ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const DividerElement = ({ config }: { config: any }) => (
  <div className="w-full flex transition-all">
    <div
      style={{
        width: config.width || '100%',
        borderTop: `${config.thickness ?? 1}px ${config.style || 'solid'} ${config.color || '#e5e7eb'}`,
        margin: config.align === 'center' ? '0 auto' : config.align === 'right' ? '0 0 0 auto' : '0 auto 0 0',
      }}
    />
  </div>
);

// Ã¢â€â‚¬Ã¢â€â‚¬ BADGE ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const BadgeElement = ({ config }: { config: any }) => (
  <div
    className="w-full flex transition-all"
    style={{
      justifyContent: config.align === 'center' ? 'center' : config.align === 'right' ? 'flex-end' : 'flex-start',
    }}
  >
    <span
      className="inline-flex items-center font-black uppercase tracking-wider text-[9px] px-2.5 py-1 transition-all"
      style={{
        backgroundColor: config.bgColor || '#eff6ff',
        color: config.textColor || '#1d4ed8',
        borderRadius: `${config.borderRadius ?? 9999}px`,
        fontFamily: config.fontFamily || 'inherit',
      }}
    >
      {config.text || 'Featured'}
    </span>
  </div>
);

// Ã¢â€â‚¬Ã¢â€â‚¬ BRANDING ELEMENT (Logo & Toko) Ã¢â€â‚¬Ã¢â€â‚¬
interface BrandingElementProps {
  config: any;
  readOnly?: boolean;
  onElementSelect?: (id: string, subFocus?: string | null) => void;
  elementId?: string;
  activeSubFocus?: string | null;
  isActive?: boolean;
}

const BrandingElement = ({ config, readOnly, onElementSelect, elementId, activeSubFocus, isActive }: BrandingElementProps) => {
  const sf = useStorefront();
  const name = sf?.client?.name || "Nama Toko";
  const logo = sf?.client?.logoUrl;

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPathMode = pathname?.includes(`/storefront/${sf?.client?.slug}`);
  const baseLink = isPathMode ? `/storefront/${sf?.client?.slug}` : "";

  const showBuilderUI = !readOnly;

  const handleContainerClick = (e: React.MouseEvent) => {
    if (!showBuilderUI || !onElementSelect || !elementId) return;
    e.stopPropagation();
    onElementSelect(elementId, null);
  };

  const handleSubFocusClick = (e: React.MouseEvent, focusType: string) => {
    if (!showBuilderUI || !onElementSelect || !elementId) return;
    e.stopPropagation();
    onElementSelect(elementId, focusType);
  };

  const hoverLogoClass = '';
  const hoverTextClass = '';

  // Debug log untuk Aturan 8
  useEffect(() => {
    console.log("[BrandingElement Debug] Loaded:", { name, logo, readOnly });
  }, [name, logo, readOnly]);

  // Baca config logo
  const logoSize = config.logoSize ?? 40;
  const logoShape = config.logoShape ?? 'circle';
  const logoRadius = logoShape === 'circle' ? 9999 : logoShape === 'rounded' ? 8 : 0;
  const logoBgColor = config.logoBgColor || 'transparent';

  // Config gaya baru (identik IMAGE)
  const logoOpacity = config.logoOpacity !== undefined ? config.logoOpacity / 100 : 1;
  const logoCssFilter = [
    config.logoBlur > 0 ? `blur(${config.logoBlur}px)` : '',
    config.logoBrightness !== undefined && config.logoBrightness !== 100 ? `brightness(${config.logoBrightness}%)` : '',
    config.logoContrast !== undefined && config.logoContrast !== 100 ? `contrast(${config.logoContrast}%)` : '',
    config.logoSaturate !== undefined && config.logoSaturate !== 100 ? `saturate(${config.logoSaturate}%)` : '',
    config.logoHueRotate > 0 ? `hue-rotate(${config.logoHueRotate}deg)` : '',
  ].filter(Boolean).join(' ') || undefined;

  const logoBorderRadius = (() => {
    const unit = config.logoBorderRadiusUnit || 'px';
    const tl = config.logoBorderRadiusTop ?? config.logoBorderRadius ?? logoRadius;
    const tr = config.logoBorderRadiusRight ?? config.logoBorderRadius ?? logoRadius;
    const br = config.logoBorderRadiusBottom ?? config.logoBorderRadius ?? logoRadius;
    const bl = config.logoBorderRadiusLeft ?? config.logoBorderRadius ?? logoRadius;
    // Jika ada key radius per-sudut diset, gunakan shorthand per-sudut; jika tidak, pakai logoRadius (dari logoShape)
    const hasCustomRadius = config.logoBorderRadiusTop !== undefined || config.logoBorderRadius !== undefined;
    if (!hasCustomRadius) return logoRadius;
    return `${tl}${unit} ${tr}${unit} ${br}${unit} ${bl}${unit}`;
  })();

  const logoBoxShadow = config.logoBoxShadowType === 'custom'
    ? `${config.logoShadowOffsetX ?? 0}px ${config.logoShadowOffsetY ?? 4}px ${config.logoShadowBlur ?? 2}px ${config.logoShadowSpread ?? 0}px ${config.logoShadowColor || 'rgba(0,0,0,0.5)'}`
    : (config.logoBoxShadow && config.logoBoxShadow !== 'none' ? config.logoBoxShadow : (config.logoBorderStyle && config.logoBorderStyle !== 'none' ? undefined : '0 1px 2px 0 rgba(0,0,0,0.05)'));
  const logoBorder = config.logoBorderStyle && config.logoBorderStyle !== 'none'
    ? `${parseInt(String(config.logoBorderWidth || '1')) || 1}${config.logoBorderWidthUnit || 'px'} ${config.logoBorderStyle} ${config.logoBorderColor || '#e4e4e7'}`
    : '1px solid rgba(228,228,231,0.8)';

  // Tag HTML untuk nama toko
  const TextTag = (config.textTag || 'span') as keyof JSX.IntrinsicElements;

  const content = (
    <div
      className="flex items-center gap-3.5"
      style={{
        justifyContent: config.align === 'center' ? 'center' : config.align === 'right' ? 'flex-end' : 'flex-start',
      }}
      onClick={showBuilderUI ? handleContainerClick : undefined}
    >
      {logo ? (
        <img
          src={logo}
          alt={name}
          className={`cursor-pointer transition-all duration-200 ${
            isActive && activeSubFocus === 'logo'
              ? 'outline outline-2 outline-blue-500/60 scale-105 shadow-md'
              : hoverLogoClass
          }`}
          style={{
            width: logoSize,
            height: logoSize,
            borderRadius: logoBorderRadius,
            backgroundColor: logoBgColor,
            objectFit: 'contain',
            border: logoBorder,
            boxShadow: logoBoxShadow,
            opacity: logoOpacity,
            filter: logoCssFilter,
            flexShrink: 0,
          }}
          onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'logo') : undefined}
        />
      ) : (
        <div
          style={{
            width: logoSize,
            height: logoSize,
            borderRadius: logoBorderRadius,
            backgroundColor: logoBgColor !== 'transparent' ? logoBgColor : undefined,
            border: logoBorder,
            boxShadow: logoBoxShadow,
            opacity: logoOpacity,
            filter: logoCssFilter,
            flexShrink: 0,
          }}
          className={`bg-indigo-500/10 flex items-center justify-center shadow-sm cursor-pointer transition-all duration-200 ${
            isActive && activeSubFocus === 'logo'
              ? 'outline outline-2 outline-blue-500/60 scale-105 shadow-md'
              : hoverLogoClass
          }`}
          onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'logo') : undefined}
        >
          <span className="text-indigo-600 text-sm font-black uppercase tracking-wider">{name.substring(0, 2)}</span>
        </div>
      )}
      <TextTag
        className={`font-extrabold tracking-tight transition-all duration-200 cursor-pointer ${
          isActive && activeSubFocus === 'text'
            ? 'outline outline-2 outline-blue-500/60 bg-blue-500/10 rounded px-1 scale-105 shadow-sm'
            : hoverTextClass
        }`}
        style={{
          fontSize: config.fontSize ? `${config.fontSize}px` : '16px',
          color: config.textColor || '#18181B',
          fontFamily: config.fontFamily || 'inherit',
          fontWeight: config.fontWeight || undefined,
          fontStyle: config.fontStyle || undefined,
          textTransform: config.textTransform as any || undefined,
          letterSpacing: config.letterSpacing || undefined,
          textAlign: config.textAlign as any || undefined,
        }}
        onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'text') : undefined}
      >
        {name}
      </TextTag>
    </div>
  );

  if (readOnly) {
    return (
      <Link href={baseLink || "/"} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

// Ã¢â€â‚¬Ã¢â€â‚¬ MENU ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const MenuElement = ({ config, readOnly, elementId }: { config: any; readOnly?: boolean; elementId?: string }) => {
  const sf = useStorefront();
  const defaultTabs = [
    { id: 'catalog', label: 'Katalog', url: '/category/all' },
    { id: 'categories', label: 'Kategori', url: '/#kategori' }
  ];
  const customPages = sf?.customPages || [];
  const customTabs = customPages.map((p: any) => ({
    id: p.slug || p.id,
    label: p.title,
    url: `/p/${p.slug}`
  }));
  const hiddenMenus = config.hiddenMenus || [];
  const baseTabs = [...defaultTabs, ...customTabs];
  const orderedTabs = config.menuOrder
    ? [...baseTabs].sort((a, b) => {
        const indexA = config.menuOrder.indexOf(a.id);
        const indexB = config.menuOrder.indexOf(b.id);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      })
    : baseTabs;
  const allTabs = orderedTabs.filter((tab: any) => !hiddenMenus.includes(tab.id));

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPathMode = pathname?.includes(`/storefront/${sf?.client?.slug}`);
  const baseLink = isPathMode ? `/storefront/${sf?.client?.slug}` : "";

  // Debug log untuk Aturan 8
  useEffect(() => {
    console.log("[MenuElement Debug] Loaded/Updated with Typography settings:", {
      allTabsCount: allTabs.length,
      readOnly,
      fontFamily: config.fontFamily || 'inherit',
      fontSize: config.fontSize ?? 13,
      fontWeight: config.fontWeight || '600',
      textTransform: config.textTransform || 'none',
      fontStyle: config.fontStyle || 'normal',
      textDecoration: config.textDecoration || 'none',
      lineHeight: config.lineHeight || '1.2em',
      letterSpacing: config.letterSpacing || '0px',
      wordSpacing: config.wordSpacing || '0px',
      textColor: config.textColor || '#18181B',
      hoverTextColor: config.hoverTextColor || '#18181B',
      transitionDuration: config.transitionDuration ?? 0.3
    });
  }, [allTabs, readOnly, config]);

  const handleHamburgerClick = (e: React.MouseEvent) => {
    if (readOnly && sf?.setIsMobileMenuOpen) {
      e.preventDefault();
      e.stopPropagation();
      sf.setIsMobileMenuOpen(true);
      console.log("[MenuElement Debug] Mobile hamburger menu opened successfully via state");
    }
  };

  const finalId = elementId ? `menu-el-${elementId}` : `menu-el-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <style>{`
        #${finalId} a, #${finalId} span {
          transition: color ${config.transitionDuration ?? 0.3}s ease !important;
        }
        #${finalId} a:hover, #${finalId} span:hover {
          color: ${config.hoverTextColor || config.textColor || '#18181B'} !important;
        }
      `}</style>
      {/* Desktop Menu */}
      <div
        id={finalId}
        className={`${readOnly ? "hidden md:flex" : "flex"} items-center flex-wrap gap-5 md:gap-7`}
        style={{
          justifyContent: config.align === 'center' ? 'center' : config.align === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        {allTabs.length === 0 ? (
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Navigasi Kosong</span>
        ) : (
          allTabs.map(tab => {
            const href = tab.url.startsWith('/') ? `${baseLink}${tab.url}` : `${baseLink}/${tab.url}`;
            
            if (readOnly) {
              return (
                <Link
                  key={tab.id}
                  href={href}
                  style={{
                    color: config.textColor || '#18181B',
                    fontSize: formatStyleValue(config.fontSize, 13),
                    fontFamily: config.fontFamily || 'inherit',
                    fontWeight: config.fontWeight || '600',
                    textTransform: config.textTransform || 'none',
                    fontStyle: config.fontStyle || 'normal',
                    textDecoration: config.textDecoration || 'none',
                    lineHeight: config.lineHeight || '1.2em',
                    letterSpacing: config.letterSpacing || '0px',
                    wordSpacing: config.wordSpacing || '0px'
                  }}
                  className="hover:opacity-75 transition-opacity"
                >
                  {tab.label}
                </Link>
              );
            }

            return (
              <span
                key={tab.id}
                style={{
                  color: config.textColor || '#18181B',
                  fontSize: formatStyleValue(config.fontSize, 13),
                  fontFamily: config.fontFamily || 'inherit',
                  fontWeight: config.fontWeight || '600',
                  textTransform: config.textTransform || 'none',
                  fontStyle: config.fontStyle || 'normal',
                  textDecoration: config.textDecoration || 'none',
                  lineHeight: config.lineHeight || '1.2em',
                  letterSpacing: config.letterSpacing || '0px',
                  wordSpacing: config.wordSpacing || '0px'
                }}
                className="cursor-default hover:opacity-75 transition-opacity"
              >
                {tab.label}
              </span>
            );
          })
        )}
      </div>

      {/* Mobile Menu Button (Hamburger) */}
      {readOnly && (
        <button
          onClick={handleHamburgerClick}
          className="p-2.5 bg-zinc-100 text-zinc-900 rounded-xl md:hidden hover:bg-zinc-200 transition-all active:scale-90"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

// Ã¢â€â‚¬Ã¢â€â‚¬ CART ELEMENT Ã¢â€â‚¬Ã¢â€â‚¬
const CartElement = ({ config, readOnly }: { config: any; readOnly?: boolean }) => {
  const sf = useStorefront();
  const showCustomIcon = config.iconType === 'custom' && config.customIconSvg;
  const defaultIcon = '/cart.svg';

  const cartCount = sf?.cartCount ?? 0;
  const setIsCartOpen = sf?.setIsCartOpen;

  // Debug log untuk Aturan 8
  useEffect(() => {
    console.log("[CartElement Debug] Loaded:", { cartCount, readOnly });
  }, [cartCount, readOnly]);

  const handleClick = (e: React.MouseEvent) => {
    if (readOnly && setIsCartOpen) {
      e.preventDefault();
      e.stopPropagation();
      setIsCartOpen(true);
      console.log("[CartElement Debug] Cart drawer opened successfully via state click");
    }
  };

  return (
    <div className="relative inline-block cursor-pointer" onClick={handleClick}>
      <ButtonElement config={showCustomIcon ? config : { ...config, iconType: 'custom', customIconSvg: defaultIcon, icon: defaultIcon }} />
      <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-zinc-900 text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white shadow pointer-events-none">
        {cartCount}
      </span>
    </div>
  );
};

// Ã¢â€â‚¬Ã¢â€â‚¬ CATEGORY LIST WIDGET Ã¢â€â‚¬Ã¢â€â‚¬
const PLACEHOLDER_CATEGORIES = [
  { id: 'cat-dummy-1', name: 'Nama kategori', image: '/default-kategori.webp' },
  { id: 'cat-dummy-2', name: 'Nama kategori', image: '/default-kategori.webp' },
  { id: 'cat-dummy-3', name: 'Nama kategori', image: '/default-kategori.webp' },
  { id: 'cat-dummy-4', name: 'Nama kategori', image: '/default-kategori.webp' },
  { id: 'cat-dummy-5', name: 'Nama kategori', image: '/default-kategori.webp' },
  { id: 'cat-dummy-6', name: 'Nama kategori', image: '/default-kategori.webp' },
  { id: 'cat-dummy-7', name: 'Nama kategori', image: '/default-kategori.webp' },
  { id: 'cat-dummy-8', name: 'Nama kategori', image: '/default-kategori.webp' },
  { id: 'cat-dummy-9', name: 'Nama kategori', image: '/default-kategori.webp' },
  { id: 'cat-dummy-10', name: 'Nama kategori', image: '/default-kategori.webp' }
];

interface CategoryListElementProps {
  config: any;
  onElementSelect: (id: string, subFocus?: string | null) => void;
  elementId: string;
  activeSubFocus?: string | null;
  isActive: boolean;
  readOnly?: boolean;
}

const CategoryListElement = ({
  config,
  onElementSelect,
  elementId,
  activeSubFocus,
  isActive,
  readOnly = false,
}: CategoryListElementProps) => {
  const { categories } = useStorefront();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [isCatHovered, setIsCatHovered] = useState(false);

  console.log("[CategoryListElement Canvas] Render dengan activeSubFocus:", activeSubFocus, "isActive:", isActive);

  const showBuilderUI = !readOnly;
  const hoverTitleClass = '';
  const hoverImageClass = '';
  const hoverNameClass = '';

  const dbCats = categories || [];
  let displayCategories = [...dbCats];
  if (readOnly) {
    // storefront: real data only, no filler
  } else if (displayCategories.length < 10) {
    const remainingCount = 10 - displayCategories.length;
    const fillers = PLACEHOLDER_CATEGORIES.slice(displayCategories.length, displayCategories.length + remainingCount);
    displayCategories = [...displayCategories, ...fillers];
  }

  const layout = config?.layout || 'slider';
  const columns = config?.columns || 5;
  const borderRadius = config?.borderRadius !== undefined ? config.borderRadius : 9999;
  const title = config?.title || 'Kategori Populer';
  const titleColor = config?.titleColor || '#18181b';
  const itemTitleColor = config?.textColor || '#18181b';
  const itemTitleAlign = config?.align || 'center';
  const itemTitleFontFamily = config?.fontFamily || 'inherit';
  const itemTitleFontSize = config?.fontSize || 14;
  const itemTitleFontWeight = config?.fontWeight || 'bold';
  const itemTitleTextTransform = config?.textTransform || 'none';
  const itemTitleFontStyle = config?.fontStyle || 'normal';
  const itemTitleTextDecoration = config?.textDecoration || 'none';
  const itemTitleLineHeight = config?.lineHeight || '1.2';
  const itemTitleLetterSpacing = config?.letterSpacing || '0px';
  const itemTitleWordSpacing = config?.wordSpacing || '0px';

  const itemTitleTextStrokeWidth = config?.textStrokeWidth || 0;
  const itemTitleTextStrokeColor = config?.textStrokeColor || '#000000';
  const itemTitleTextStrokeStyle = itemTitleTextStrokeWidth > 0
    ? `${itemTitleTextStrokeWidth}px ${itemTitleTextStrokeColor}`
    : undefined;

  const itemTitleTextShadowColor = config?.textShadowColor;
  const itemTitleTextShadowBlur = config?.textShadowBlur;
  const itemTitleTextShadowOffsetX = config?.textShadowOffsetX;
  const itemTitleTextShadowOffsetY = config?.textShadowOffsetY;
  const itemTitleTextShadowStyle = (itemTitleTextShadowColor || itemTitleTextShadowBlur !== undefined || itemTitleTextShadowOffsetX !== undefined || itemTitleTextShadowOffsetY !== undefined)
    ? `${itemTitleTextShadowOffsetX || 0}px ${itemTitleTextShadowOffsetY || 0}px ${itemTitleTextShadowBlur || 0}px ${itemTitleTextShadowColor || 'rgba(0,0,0,0.5)'}`
    : undefined;

  const itemTitleStyle: React.CSSProperties = {
    color: itemTitleColor,
    textAlign: itemTitleAlign as any,
    fontFamily: itemTitleFontFamily,
    fontSize: itemTitleFontSize,
    fontWeight: itemTitleFontWeight,
    textTransform: itemTitleTextTransform as any,
    fontStyle: itemTitleFontStyle,
    textDecoration: itemTitleTextDecoration,
    lineHeight: itemTitleLineHeight,
    letterSpacing: itemTitleLetterSpacing,
    wordSpacing: itemTitleWordSpacing,
    WebkitTextStroke: itemTitleTextStrokeStyle,
    textShadow: itemTitleTextShadowStyle,
  };

  // Custom typography styles for Title
  const titleAlign = config?.titleAlign || 'left';
  const titleFontFamily = config?.titleFontFamily || 'inherit';
  const titleFontSize = config?.titleFontSize || 22;
  const titleFontWeight = config?.titleFontWeight || '800';
  const titleTextTransform = config?.titleTextTransform || 'none';
  const titleFontStyle = config?.titleFontStyle || 'normal';
  const titleTextDecoration = config?.titleTextDecoration || 'none';
  const titleLineHeight = config?.titleLineHeight || '1.2';
  const titleLetterSpacing = config?.titleLetterSpacing || '0px';
  const titleWordSpacing = config?.titleWordSpacing || '0px';

  // Text Stroke for Title
  const titleTextStrokeWidth = config?.titleTextStrokeWidth || 0;
  const titleTextStrokeColor = config?.titleTextStrokeColor || '#000000';
  const textStrokeStyle = titleTextStrokeWidth > 0
    ? `${titleTextStrokeWidth}px ${titleTextStrokeColor}`
    : undefined;

  // Text Shadow for Title
  const titleTextShadowColor = config?.titleTextShadowColor;
  const titleTextShadowBlur = config?.titleTextShadowBlur;
  const titleTextShadowOffsetX = config?.titleTextShadowOffsetX;
  const titleTextShadowOffsetY = config?.titleTextShadowOffsetY;
  const textShadowStyle = (titleTextShadowColor || titleTextShadowBlur !== undefined || titleTextShadowOffsetX !== undefined || titleTextShadowOffsetY !== undefined)
    ? `${titleTextShadowOffsetX || 0}px ${titleTextShadowOffsetY || 0}px ${titleTextShadowBlur || 0}px ${titleTextShadowColor || 'rgba(0,0,0,0.5)'}`
    : undefined;

  console.log(`[CategoryListElement Canvas Debug] Rendering Title: "${title}", Color: "${titleColor}", Align: "${titleAlign}", FontSize: "${titleFontSize}", Stroke: "${textStrokeStyle}", Shadow: "${textShadowStyle}"`);

  const titleStyle: React.CSSProperties = {
    color: titleColor,
    textAlign: titleAlign as any,
    fontFamily: titleFontFamily,
    fontSize: titleFontSize,
    fontWeight: titleFontWeight,
    textTransform: titleTextTransform as any,
    fontStyle: titleFontStyle,
    textDecoration: titleTextDecoration,
    lineHeight: titleLineHeight,
    letterSpacing: titleLetterSpacing,
    wordSpacing: titleWordSpacing,
    WebkitTextStroke: textStrokeStyle,
    textShadow: textShadowStyle,
  };

  // Grid pagination calculation
  const itemsPerPage = columns;
  const totalPages = Math.ceil(displayCategories.length / itemsPerPage);
  const paginatedCategories = displayCategories.slice(activePage * itemsPerPage, (activePage + 1) * itemsPerPage);

  // Ã¢â€â‚¬Ã¢â€â‚¬ Hover-aware style computation Ã¢â€â‚¬Ã¢â€â‚¬
  const getCatShadow = (s?: string) => {
    if (s === 'soft') return '0 2px 10px rgba(0, 0, 0, 0.05)';
    if (s === 'medium') return '0 4px 20px rgba(0, 0, 0, 0.08)';
    if (s === 'strong') return '0 10px 30px rgba(0, 0, 0, 0.12)';
    return undefined;
  };

  const catResolvedBgColor = isCatHovered && config.hoverBgColor && config.hoverBgColor !== 'transparent'
    ? config.hoverBgColor
    : (config.bgColor || 'transparent');

  const catResolvedBgImage = (() => {
    if (isCatHovered && config.hoverBgType === 'gradient') {
      return config.hoverBgGradientType === 'radial'
        ? `radial-gradient(circle at ${config.hoverBgGradientRadialPos || 'center center'}, ${config.hoverBgGradientColor1 || 'transparent'} ${config.hoverBgGradientLoc1 ?? 0}%, ${config.hoverBgGradientColor2 || 'transparent'} ${config.hoverBgGradientLoc2 ?? 100}%)`
        : `linear-gradient(${config.hoverBgGradientAngle ?? 180}deg, ${config.hoverBgGradientColor1 || 'transparent'} ${config.hoverBgGradientLoc1 ?? 0}%, ${config.hoverBgGradientColor2 || 'transparent'} ${config.hoverBgGradientLoc2 ?? 100}%)`;
    }
    if (config.bgType === 'gradient') {
      return config.bgGradientType === 'radial'
        ? `radial-gradient(circle at ${config.bgGradientRadialPos || 'center center'}, ${config.bgGradientColor1 || '#ffffff'} ${config.bgGradientLoc1 ?? 0}%, ${config.bgGradientColor2 || '#e83a65'} ${config.bgGradientLoc2 ?? 100}%)`
        : `linear-gradient(${config.bgGradientAngle ?? 180}deg, ${config.bgGradientColor1 || '#ffffff'} ${config.bgGradientLoc1 ?? 0}%, ${config.bgGradientColor2 || '#e83a65'} ${config.bgGradientLoc2 ?? 100}%)`;
    }
    if (config.bgImageUrl) return `url(${config.bgImageUrl})`;
    return undefined;
  })();

  const catResolvedBorderTopLeftRadius = formatStyleValue(
    isCatHovered ? (config.hoverBorderRadiusTop ?? config.hoverBorderRadius ?? config.borderRadiusTop ?? config.borderRadius) : (config.borderRadiusTop ?? config.borderRadius), 0);
  const catResolvedBorderTopRightRadius = formatStyleValue(
    isCatHovered ? (config.hoverBorderRadiusRight ?? config.hoverBorderRadius ?? config.borderRadiusRight ?? config.borderRadius) : (config.borderRadiusRight ?? config.borderRadius), 0);
  const catResolvedBorderBottomRightRadius = formatStyleValue(
    isCatHovered ? (config.hoverBorderRadiusBottom ?? config.hoverBorderRadius ?? config.borderRadiusBottom ?? config.borderRadius) : (config.borderRadiusBottom ?? config.borderRadius), 0);
  const catResolvedBorderBottomLeftRadius = formatStyleValue(
    isCatHovered ? (config.hoverBorderRadiusLeft ?? config.hoverBorderRadius ?? config.borderRadiusLeft ?? config.borderRadius) : (config.borderRadiusLeft ?? config.borderRadius), 0);

  const catResolvedBorderStyle = (() => {
    const bt = isCatHovered ? (config.hoverBorderType || config.borderType) : config.borderType;
    return bt && bt !== 'none' && bt !== 'Asali' ? bt : undefined;
  })();

  const catResolvedBorderTopWidth = (() => {
    const bw = isCatHovered
      ? (config.hoverBorderWidthTop ?? config.hoverBorderWidth ?? config.borderWidthTop ?? config.borderWidth)
      : (config.borderWidthTop ?? config.borderWidth);
    return bw !== undefined ? `${bw}px` : undefined;
  })();
  const catResolvedBorderRightWidth = (() => {
    const bw = isCatHovered
      ? (config.hoverBorderWidthRight ?? config.hoverBorderWidth ?? config.borderWidthRight ?? config.borderWidth)
      : (config.borderWidthRight ?? config.borderWidth);
    return bw !== undefined ? `${bw}px` : undefined;
  })();
  const catResolvedBorderBottomWidth = (() => {
    const bw = isCatHovered
      ? (config.hoverBorderWidthBottom ?? config.hoverBorderWidth ?? config.borderWidthBottom ?? config.borderWidth)
      : (config.borderWidthBottom ?? config.borderWidth);
    return bw !== undefined ? `${bw}px` : undefined;
  })();
  const catResolvedBorderLeftWidth = (() => {
    const bw = isCatHovered
      ? (config.hoverBorderWidthLeft ?? config.hoverBorderWidth ?? config.borderWidthLeft ?? config.borderWidth)
      : (config.borderWidthLeft ?? config.borderWidth);
    return bw !== undefined ? `${bw}px` : undefined;
  })();

  const catResolvedBorderColor = isCatHovered
    ? (config.hoverBorderColor || config.borderColor || undefined)
    : (config.borderColor || undefined);

  const catResolvedBoxShadow = (() => {
    if (isCatHovered && config.hoverBoxShadowType === 'custom') {
      return `${config.hoverShadowOffsetX ?? 0}px ${config.hoverShadowOffsetY ?? 0}px ${config.hoverShadowBlur ?? 10}px ${config.hoverShadowSpread ?? 0}px ${config.hoverShadowColor || 'rgba(0,0,0,0.5)'}`;
    }
    if (isCatHovered && config.hoverBoxShadow) {
      return config.hoverBoxShadow;
    }
    if (config.boxShadowType === 'custom') {
      return `${config.shadowOffsetX ?? 0}px ${config.shadowOffsetY ?? 0}px ${config.shadowBlur ?? 10}px ${config.shadowSpread ?? 0}px ${config.shadowColor || 'rgba(0,0,0,0.5)'}`;
    }
    return getCatShadow(config.boxShadow) || config.boxShadow || undefined;
  })();

  const catResolvedTransition = config.hoverTransitionDuration !== undefined
    ? `background-color ${config.hoverTransitionDuration}s ease, background-image ${config.hoverTransitionDuration}s ease, border-color ${config.hoverTransitionDuration}s ease, border-width ${config.hoverTransitionDuration}s ease, border-radius ${config.hoverTransitionDuration}s ease, box-shadow ${config.hoverTransitionDuration}s ease`
    : undefined;

  const catStyleObj: React.CSSProperties = {
    backgroundColor: catResolvedBgColor,
    backgroundImage: catResolvedBgImage,
    backgroundSize: config.bgImageUrl ? 'cover' : undefined,
    backgroundPosition: config.bgImageUrl ? 'center' : undefined,
    borderTopLeftRadius: catResolvedBorderTopLeftRadius,
    borderTopRightRadius: catResolvedBorderTopRightRadius,
    borderBottomRightRadius: catResolvedBorderBottomRightRadius,
    borderBottomLeftRadius: catResolvedBorderBottomLeftRadius,
    boxShadow: catResolvedBoxShadow,
    borderStyle: catResolvedBorderStyle,
    borderTopWidth: catResolvedBorderTopWidth,
    borderRightWidth: catResolvedBorderRightWidth,
    borderBottomWidth: catResolvedBorderBottomWidth,
    borderLeftWidth: catResolvedBorderLeftWidth,
    borderColor: catResolvedBorderColor,
    transition: catResolvedTransition,
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onElementSelect(elementId, null);
  };

  const handleSubFocusClick = (e: React.MouseEvent, focusType: string) => {
    e.stopPropagation();
    onElementSelect(elementId, focusType);
    console.log(`[CategoryListElement SubFocus] Mengaktifkan fokus sub-elemen: ${focusType}`);
  };

  // Reset page when columns or categories change
  useEffect(() => {
    setActivePage(0);
  }, [columns, displayCategories.length]);

  return (
    <div
      className={`w-full space-y-3 p-2 rounded-xl transition-all duration-300 ${isActive && !activeSubFocus ? 'bg-blue-500/5' : ''}`}
      onClick={showBuilderUI ? handleContainerClick : undefined}
      onMouseEnter={() => setIsCatHovered(true)}
      onMouseLeave={() => setIsCatHovered(false)}
      style={catStyleObj}
    >
      {title && (
        <h3
          className={`font-extrabold text-xs uppercase tracking-wider px-2 cursor-pointer transition-all ${isActive && activeSubFocus === 'header_title'
            ? 'outline outline-2 outline-blue-500/60 bg-blue-500/10 rounded px-1 scale-105 shadow-sm'
            : hoverTitleClass
            }`}
          style={titleStyle}
          onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'header_title') : undefined}
        >
          {title}
        </h3>
      )}
      {layout === 'slider' ? (
        <div className="relative group/slider w-full">
          <div
            ref={scrollRef}
            className="flex items-center gap-4 overflow-x-auto pb-2 px-2 snap-x no-scrollbar"
          >
            {displayCategories.map((cat: any) => (
              <div
                key={cat.id}
                className="flex flex-col items-center gap-2 shrink-0 snap-start select-none cursor-pointer"
                onClick={(e) => handleSubFocusClick(e, 'layout')}
              >
                <div
                  className={`w-14 h-14 border border-zinc-200/60 shadow-[0_4px_10px_rgba(0,0,0,0.03)] overflow-hidden flex items-center justify-center bg-zinc-50 transition-all duration-300 ${isActive && activeSubFocus === 'image'
                    ? 'outline outline-2 outline-blue-500/60 scale-105 shadow-md'
                    : hoverImageClass
                    }`}
                  style={{ borderRadius: `${borderRadius}px` }}
                  onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'image') : undefined}
                >
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
                <span
                  className={`font-bold leading-tight text-center tracking-tight transition-all duration-300 ${isActive && activeSubFocus === 'title'
                    ? 'outline outline-2 outline-blue-500/60 bg-blue-500/10 rounded px-1 scale-105'
                    : hoverNameClass
                    }`}
                  style={itemTitleStyle}
                  onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'title') : undefined}
                >
                  {cat.name}
                </span>
              </div>
            ))}
          </div>

          {/* Floating desktop scroll chevrons */}
          <button
            type="button"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-zinc-200/80 items-center justify-center text-zinc-700 hover:bg-zinc-50 active:scale-95 transition-all z-20 opacity-0 group-hover/slider:opacity-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("[CategoryListElement] Scroll horizontal ke kiri");
              scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-zinc-200/80 items-center justify-center text-zinc-700 hover:bg-zinc-50 active:scale-95 transition-all z-20 opacity-0 group-hover/slider:opacity-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("[CategoryListElement] Scroll horizontal ke kanan");
              scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div
            className="grid gap-4 px-2 animate-in fade-in duration-300"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {paginatedCategories.map((cat: any) => (
              <div
                key={cat.id}
                className="flex flex-col items-center gap-2 cursor-pointer select-none"
                onClick={(e) => handleSubFocusClick(e, 'layout')}
              >
                <div
                  className={`w-14 h-14 border border-zinc-200/60 shadow-[0_4px_10px_rgba(0,0,0,0.03)] overflow-hidden flex items-center justify-center bg-zinc-50 transition-all duration-300 ${isActive && activeSubFocus === 'image'
                    ? 'outline outline-2 outline-blue-500/60 scale-105 shadow-md'
                    : hoverImageClass
                    }`}
                  style={{ borderRadius: `${borderRadius}px` }}
                  onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'image') : undefined}
                >
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
                <span
                  className={`font-bold leading-tight text-center tracking-tight transition-all duration-300 ${isActive && activeSubFocus === 'title'
                    ? 'outline outline-2 outline-blue-500/60 bg-blue-500/10 rounded px-1 scale-105'
                    : hoverNameClass
                    }`}
                  style={itemTitleStyle}
                  onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'title') : undefined}
                >
                  {cat.name}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Pagination for Grid category if items exceed column capacity */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-1 pb-1">
              <button
                type="button"
                disabled={activePage === 0}
                className="p-1 rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`[CategoryListElement Grid Nav] Ke halaman sebelumnya (${activePage})`);
                  setActivePage(prev => Math.max(0, prev - 1));
                }}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activePage === idx ? 'bg-blue-500 w-3' : 'bg-zinc-300 hover:bg-zinc-400'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`[CategoryListElement Grid Nav] Ke halaman indeks: ${idx}`);
                      setActivePage(idx);
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                disabled={activePage === totalPages - 1}
                className="p-1 rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`[CategoryListElement Grid Nav] Ke halaman berikutnya (${activePage + 2})`);
                  setActivePage(prev => Math.min(totalPages - 1, prev + 1));
                }}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Ã¢â€â‚¬Ã¢â€â‚¬ PRODUCT LIST WIDGET Ã¢â€â‚¬Ã¢â€â‚¬
const PLACEHOLDER_PRODUCTS = [
  { id: 'p-dummy-1', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 },
  { id: 'p-dummy-2', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 },
  { id: 'p-dummy-3', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 },
  { id: 'p-dummy-4', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 },
  { id: 'p-dummy-5', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 },
  { id: 'p-dummy-6', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 },
  { id: 'p-dummy-7', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 },
  { id: 'p-dummy-8', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 },
  { id: 'p-dummy-9', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 },
  { id: 'p-dummy-10', name: 'Nama produk', price: 199000, discountPrice: 299000, images: ['/default-produk.png'], stock: 100 }
];

interface ProductListElementProps {
  config: any;
  onElementSelect: (id: string, subFocus?: string | null) => void;
  elementId: string;
  activeSubFocus?: string | null;
  isActive: boolean;
  readOnly?: boolean;
}

const ProductListElement = ({
  config,
  onElementSelect,
  elementId,
  activeSubFocus,
  isActive,
  readOnly = false,
}: ProductListElementProps) => {
  const { products, setSelectedProduct } = useStorefront();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isProdHovered, setIsProdHovered] = useState(false);
  console.log("[ProductListElement Canvas] Render dengan activeSubFocus:", activeSubFocus, "isActive:", isActive);

  const showBuilderUI = !readOnly;
  const hoverTitleClass = '';
  const hoverCardClass = '';
  const hoverImageClass = '';
  const hoverNameClass = '';
  const hoverPriceClass = '';

  const source = config?.source || 'ALL';
  const categoryId = config?.categoryId || '';
  const limit = config?.limit || 4;
  const title = config?.title || 'Produk Pilihan';
  const titleColor = config?.titleColor || '#18181b';
  const layout = config?.layout || 'grid'; // grid is default

  // Custom typography styles for Title
  const titleAlign = config?.titleAlign || 'left';
  const titleFontFamily = config?.titleFontFamily || 'inherit';
  const titleFontSize = config?.titleFontSize || 22;
  const titleFontWeight = config?.titleFontWeight || '800';
  const titleTextTransform = config?.titleTextTransform || 'none';
  const titleFontStyle = config?.titleFontStyle || 'normal';
  const titleTextDecoration = config?.titleTextDecoration || 'none';
  const titleLineHeight = config?.titleLineHeight || '1.2';
  const titleLetterSpacing = config?.titleLetterSpacing || '0px';
  const titleWordSpacing = config?.titleWordSpacing || '0px';

  // Text Stroke for Title
  const titleTextStrokeWidth = config?.titleTextStrokeWidth || 0;
  const titleTextStrokeColor = config?.titleTextStrokeColor || '#000000';
  const textStrokeStyle = titleTextStrokeWidth > 0
    ? `${titleTextStrokeWidth}px ${titleTextStrokeColor}`
    : undefined;

  // Text Shadow for Title
  const titleTextShadowColor = config?.titleTextShadowColor;
  const titleTextShadowBlur = config?.titleTextShadowBlur;
  const titleTextShadowOffsetX = config?.titleTextShadowOffsetX;
  const titleTextShadowOffsetY = config?.titleTextShadowOffsetY;
  const textShadowStyle = (titleTextShadowColor || titleTextShadowBlur !== undefined || titleTextShadowOffsetX !== undefined || titleTextShadowOffsetY !== undefined)
    ? `${titleTextShadowOffsetX || 0}px ${titleTextShadowOffsetY || 0}px ${titleTextShadowBlur || 0}px ${titleTextShadowColor || 'rgba(0,0,0,0.5)'}`
    : undefined;

  console.log(`[ProductListElement Canvas Debug] Rendering Title: "${title}", Color: "${titleColor}", Align: "${titleAlign}", FontSize: "${titleFontSize}", Stroke: "${textStrokeStyle}", Shadow: "${textShadowStyle}"`);

  const titleStyle: React.CSSProperties = {
    color: titleColor,
    textAlign: titleAlign as any,
    fontFamily: titleFontFamily,
    fontSize: titleFontSize,
    fontWeight: titleFontWeight,
    textTransform: titleTextTransform as any,
    fontStyle: titleFontStyle,
    textDecoration: titleTextDecoration,
    lineHeight: titleLineHeight,
    letterSpacing: titleLetterSpacing,
    wordSpacing: titleWordSpacing,
    WebkitTextStroke: textStrokeStyle,
    textShadow: textShadowStyle,
  };

  // Card customization styles from config
  const cardBgType = config?.cardBgType || 'classic';
  const cardBgColor = config?.cardBgColor || '#ffffff';
  const cardBgGradientType = config?.cardBgGradientType || 'linear';
  const cardBgGradientAngle = config?.cardBgGradientAngle ?? 180;
  const cardBgGradientColor1 = config?.cardBgGradientColor1 || '#ffffff';
  const cardBgGradientLoc1 = config?.cardBgGradientLoc1 ?? 0;
  const cardBgGradientColor2 = config?.cardBgGradientColor2 || '#e83a65';
  const cardBgGradientLoc2 = config?.cardBgGradientLoc2 ?? 100;
  const cardBgGradientRadialPos = config?.cardBgGradientRadialPos || 'center center';

  const getCardBackgroundStyle = () => {
    if (cardBgType === 'gradient') {
      if (cardBgGradientType === 'radial') {
        return { backgroundImage: `radial-gradient(circle at ${cardBgGradientRadialPos}, ${cardBgGradientColor1} ${cardBgGradientLoc1}%, ${cardBgGradientColor2} ${cardBgGradientLoc2}%)` };
      }
      return { backgroundImage: `linear-gradient(${cardBgGradientAngle}deg, ${cardBgGradientColor1} ${cardBgGradientLoc1}%, ${cardBgGradientColor2} ${cardBgGradientLoc2}%)` };
    }
    return { backgroundColor: cardBgColor !== 'transparent' ? cardBgColor : undefined };
  };
  const cardBorderRadius = config?.cardBorderRadius !== undefined ? config.cardBorderRadius : 16;
  const cardBorderColor = config?.cardBorderColor || '#f4f4f5';
  const cardBoxShadow = config?.cardBoxShadow || 'soft';
  const cardPadding = config?.cardPadding !== undefined ? config.cardPadding : 14;

  // Image customization styles from config
  const imageBorderRadius = config?.imageBorderRadius !== undefined ? config.imageBorderRadius : 16;
  const imagePadding = config?.imagePadding !== undefined ? config.imagePadding : 0;
  const imageBgColor = config?.imageBgColor || '#F5F4F2';

  // Typography styles for productName
  const productNameColor = config?.productNameColor || '#1f2937';
  const productNameAlign = config?.productNameAlign || 'left';
  const productNameFontFamily = config?.productNameFontFamily || 'inherit';
  const productNameFontSize = config?.productNameFontSize || 17;
  const productNameFontWeight = config?.productNameFontWeight || '600';
  const productNameTextTransform = config?.productNameTextTransform || 'none';
  const productNameFontStyle = config?.productNameFontStyle || 'normal';
  const productNameTextDecoration = config?.productNameTextDecoration || 'none';
  const productNameLineHeight = config?.productNameLineHeight || '1.2';
  const productNameLetterSpacing = config?.productNameLetterSpacing || '0px';
  const productNameWordSpacing = config?.productNameWordSpacing || '0px';

  // Text Stroke for productName
  const productNameTextStrokeWidth = config?.productNameTextStrokeWidth || 0;
  const productNameTextStrokeColor = config?.productNameTextStrokeColor || '#000000';
  const productNameTextStrokeStyle = productNameTextStrokeWidth > 0
    ? `${productNameTextStrokeWidth}px ${productNameTextStrokeColor}`
    : undefined;

  // Text Shadow for productName
  const productNameTextShadowColor = config?.productNameTextShadowColor;
  const productNameTextShadowBlur = config?.productNameTextShadowBlur;
  const productNameTextShadowOffsetX = config?.productNameTextShadowOffsetX;
  const productNameTextShadowOffsetY = config?.productNameTextShadowOffsetY;
  const productNameTextShadowStyle = (productNameTextShadowColor || productNameTextShadowBlur !== undefined || productNameTextShadowOffsetX !== undefined || productNameTextShadowOffsetY !== undefined)
    ? `${productNameTextShadowOffsetX || 0}px ${productNameTextShadowOffsetY || 0}px ${productNameTextShadowBlur || 0}px ${productNameTextShadowColor || 'rgba(0,0,0,0.5)'}`
    : undefined;

  const productNameStyle: React.CSSProperties = {
    color: productNameColor,
    textAlign: productNameAlign as any,
    fontFamily: productNameFontFamily,
    fontSize: productNameFontSize,
    fontWeight: productNameFontWeight,
    textTransform: productNameTextTransform as any,
    fontStyle: productNameFontStyle,
    textDecoration: productNameTextDecoration,
    lineHeight: productNameLineHeight,
    letterSpacing: productNameLetterSpacing,
    wordSpacing: productNameWordSpacing,
    WebkitTextStroke: productNameTextStrokeStyle,
    textShadow: productNameTextShadowStyle,
  };
  // Typography styles for price
  const priceColor = config?.priceColor || '#18181b';
  const priceAlign = config?.priceAlign || 'left';
  const priceFontFamily = config?.priceFontFamily || 'inherit';
  const priceFontSize = config?.priceFontSize || 14;
  const priceFontWeight = config?.priceFontWeight || '700';
  const priceTextTransform = config?.priceTextTransform || 'none';
  const priceFontStyle = config?.priceFontStyle || 'normal';
  const priceTextDecoration = config?.priceTextDecoration || 'none';
  const priceLineHeight = config?.priceLineHeight || '1.2';
  const priceLetterSpacing = config?.priceLetterSpacing || '0px';
  const priceWordSpacing = config?.priceWordSpacing || '0px';

  // Text Stroke for price
  const priceTextStrokeWidth = config?.priceTextStrokeWidth || 0;
  const priceTextStrokeColor = config?.priceTextStrokeColor || '#000000';
  const priceTextStrokeStyle = priceTextStrokeWidth > 0
    ? `${priceTextStrokeWidth}px ${priceTextStrokeColor}`
    : undefined;

  // Text Shadow for price
  const priceTextShadowColor = config?.priceTextShadowColor;
  const priceTextShadowBlur = config?.priceTextShadowBlur;
  const priceTextShadowOffsetX = config?.priceTextShadowOffsetX;
  const priceTextShadowOffsetY = config?.priceTextShadowOffsetY;
  const priceTextShadowStyle = (priceTextShadowColor || priceTextShadowBlur !== undefined || priceTextShadowOffsetX !== undefined || priceTextShadowOffsetY !== undefined)
    ? `${priceTextShadowOffsetX || 0}px ${priceTextShadowOffsetY || 0}px ${priceTextShadowBlur || 0}px ${priceTextShadowColor || 'rgba(0,0,0,0.5)'}`
    : undefined;

  const priceStyle: React.CSSProperties = {
    color: priceColor,
    textAlign: priceAlign as any,
    fontFamily: priceFontFamily,
    fontSize: priceFontSize,
    fontWeight: priceFontWeight,
    textTransform: priceTextTransform as any,
    fontStyle: priceFontStyle,
    textDecoration: priceTextDecoration,
    lineHeight: priceLineHeight,
    letterSpacing: priceLetterSpacing,
    wordSpacing: priceWordSpacing,
    WebkitTextStroke: priceTextStrokeStyle,
    textShadow: priceTextShadowStyle,
  };
  // Typography styles for discountPrice
  const discountPriceColor = config?.discountPriceColor || '#d1d5db';
  const discountPriceAlign = config?.discountPriceAlign || 'left';
  const discountPriceFontFamily = config?.discountPriceFontFamily || 'inherit';
  const discountPriceFontSize = config?.discountPriceFontSize || 10;
  const discountPriceFontWeight = config?.discountPriceFontWeight || '500';
  const discountPriceTextTransform = config?.discountPriceTextTransform || 'none';
  const discountPriceFontStyle = config?.discountPriceFontStyle || 'normal';
  const discountPriceTextDecoration = config?.discountPriceTextDecoration || 'none';
  const discountPriceLineHeight = config?.discountPriceLineHeight || '1.2';
  const discountPriceLetterSpacing = config?.discountPriceLetterSpacing || '0px';
  const discountPriceWordSpacing = config?.discountPriceWordSpacing || '0px';

  // Text Stroke for discountPrice
  const discountPriceTextStrokeWidth = config?.discountPriceTextStrokeWidth || 0;
  const discountPriceTextStrokeColor = config?.discountPriceTextStrokeColor || '#000000';
  const discountPriceTextStrokeStyle = discountPriceTextStrokeWidth > 0
    ? `${discountPriceTextStrokeWidth}px ${discountPriceTextStrokeColor}`
    : undefined;

  // Text Shadow for discountPrice
  const discountPriceTextShadowColor = config?.discountPriceTextShadowColor;
  const discountPriceTextShadowBlur = config?.discountPriceTextShadowBlur;
  const discountPriceTextShadowOffsetX = config?.discountPriceTextShadowOffsetX;
  const discountPriceTextShadowOffsetY = config?.discountPriceTextShadowOffsetY;
  const discountPriceTextShadowStyle = (discountPriceTextShadowColor || discountPriceTextShadowBlur !== undefined || discountPriceTextShadowOffsetX !== undefined || discountPriceTextShadowOffsetY !== undefined)
    ? `${discountPriceTextShadowOffsetX || 0}px ${discountPriceTextShadowOffsetY || 0}px ${discountPriceTextShadowBlur || 0}px ${discountPriceTextShadowColor || 'rgba(0,0,0,0.5)'}`
    : undefined;

  const discountPriceStyle: React.CSSProperties = {
    color: discountPriceColor,
    textAlign: discountPriceAlign as any,
    fontFamily: discountPriceFontFamily,
    fontSize: discountPriceFontSize,
    fontWeight: discountPriceFontWeight,
    textTransform: discountPriceTextTransform as any,
    fontStyle: discountPriceFontStyle,
    textDecoration: discountPriceTextDecoration,
    lineHeight: discountPriceLineHeight,
    letterSpacing: discountPriceLetterSpacing,
    wordSpacing: discountPriceWordSpacing,
    WebkitTextStroke: discountPriceTextStrokeStyle,
    textShadow: discountPriceTextShadowStyle,
  };
  // Typography styles for stock
  const stockColor = config?.stockColor || '#9ca3af';
  const stockAlign = config?.stockAlign || 'left';
  const stockFontFamily = config?.stockFontFamily || 'inherit';
  const stockFontSize = config?.stockFontSize || 9;
  const stockFontWeight = config?.stockFontWeight || '800';
  const stockTextTransform = config?.stockTextTransform || 'none';
  const stockFontStyle = config?.stockFontStyle || 'normal';
  const stockTextDecoration = config?.stockTextDecoration || 'none';
  const stockLineHeight = config?.stockLineHeight || '1.2';
  const stockLetterSpacing = config?.stockLetterSpacing || '0px';
  const stockWordSpacing = config?.stockWordSpacing || '0px';

  // Text Stroke for stock
  const stockTextStrokeWidth = config?.stockTextStrokeWidth || 0;
  const stockTextStrokeColor = config?.stockTextStrokeColor || '#000000';
  const stockTextStrokeStyle = stockTextStrokeWidth > 0
    ? `${stockTextStrokeWidth}px ${stockTextStrokeColor}`
    : undefined;

  // Text Shadow for stock
  const stockTextShadowColor = config?.stockTextShadowColor;
  const stockTextShadowBlur = config?.stockTextShadowBlur;
  const stockTextShadowOffsetX = config?.stockTextShadowOffsetX;
  const stockTextShadowOffsetY = config?.stockTextShadowOffsetY;
  const stockTextShadowStyle = (stockTextShadowColor || stockTextShadowBlur !== undefined || stockTextShadowOffsetX !== undefined || stockTextShadowOffsetY !== undefined)
    ? `${stockTextShadowOffsetX || 0}px ${stockTextShadowOffsetY || 0}px ${stockTextShadowBlur || 0}px ${stockTextShadowColor || 'rgba(0,0,0,0.5)'}`
    : undefined;

  const showStock = config?.showStock !== false;
  const stockStyle: React.CSSProperties = {
    color: stockColor,
    textAlign: stockAlign as any,
    fontFamily: stockFontFamily,
    fontSize: stockFontSize,
    fontWeight: stockFontWeight,
    textTransform: stockTextTransform as any,
    fontStyle: stockFontStyle,
    textDecoration: stockTextDecoration,
    lineHeight: stockLineHeight,
    letterSpacing: stockLetterSpacing,
    wordSpacing: stockWordSpacing,
    WebkitTextStroke: stockTextStrokeStyle,
    textShadow: stockTextShadowStyle,
  };

  let dbProds = products || [];
  if (source === 'CATEGORY' && categoryId) {
    dbProds = dbProds.filter((p: any) => p.categoryId === categoryId);
  } else if (source === 'DISCOUNT') {
    dbProds = dbProds.filter((p: any) => p.discountPrice && p.discountPrice < p.price);
  }

  // Slice based on limit, and pad with placeholders up to limit
  let slicedDbProds = dbProds.slice(0, limit);
  let displayProducts = [...slicedDbProds];
  if (readOnly) {
    // storefront: real data only, no filler
  } else if (displayProducts.length < limit) {
    const remainingCount = limit - displayProducts.length;
    const fillers = PLACEHOLDER_PRODUCTS.slice(slicedDbProds.length, slicedDbProds.length + remainingCount);
    displayProducts = [...displayProducts, ...fillers];
  }

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  // Ã¢â€â‚¬Ã¢â€â‚¬ Hover-aware style computation Ã¢â€â‚¬Ã¢â€â‚¬
  const getProdShadow = (s?: string) => {
    if (s === 'soft') return '0 2px 10px rgba(0, 0, 0, 0.05)';
    if (s === 'medium') return '0 4px 20px rgba(0, 0, 0, 0.08)';
    if (s === 'strong') return '0 10px 30px rgba(0, 0, 0, 0.12)';
    return undefined;
  };

  const prodResolvedBgColor = isProdHovered && config.hoverBgColor && config.hoverBgColor !== 'transparent'
    ? config.hoverBgColor
    : (config.bgColor || 'transparent');

  const prodResolvedBgImage = (() => {
    if (isProdHovered && config.hoverBgType === 'gradient') {
      return config.hoverBgGradientType === 'radial'
        ? `radial-gradient(circle at ${config.hoverBgGradientRadialPos || 'center center'}, ${config.hoverBgGradientColor1 || 'transparent'} ${config.hoverBgGradientLoc1 ?? 0}%, ${config.hoverBgGradientColor2 || 'transparent'} ${config.hoverBgGradientLoc2 ?? 100}%)`
        : `linear-gradient(${config.hoverBgGradientAngle ?? 180}deg, ${config.hoverBgGradientColor1 || 'transparent'} ${config.hoverBgGradientLoc1 ?? 0}%, ${config.hoverBgGradientColor2 || 'transparent'} ${config.hoverBgGradientLoc2 ?? 100}%)`;
    }
    if (config.bgType === 'gradient') {
      return config.bgGradientType === 'radial'
        ? `radial-gradient(circle at ${config.bgGradientRadialPos || 'center center'}, ${config.bgGradientColor1 || '#ffffff'} ${config.bgGradientLoc1 ?? 0}%, ${config.bgGradientColor2 || '#e83a65'} ${config.bgGradientLoc2 ?? 100}%)`
        : `linear-gradient(${config.bgGradientAngle ?? 180}deg, ${config.bgGradientColor1 || '#ffffff'} ${config.bgGradientLoc1 ?? 0}%, ${config.bgGradientColor2 || '#e83a65'} ${config.bgGradientLoc2 ?? 100}%)`;
    }
    if (config.bgImageUrl) return `url(${config.bgImageUrl})`;
    return undefined;
  })();

  const prodResolvedBorderTopLeftRadius = formatStyleValue(
    isProdHovered ? (config.hoverBorderRadiusTop ?? config.hoverBorderRadius ?? config.borderRadiusTop ?? config.borderRadius) : (config.borderRadiusTop ?? config.borderRadius), 0);
  const prodResolvedBorderTopRightRadius = formatStyleValue(
    isProdHovered ? (config.hoverBorderRadiusRight ?? config.hoverBorderRadius ?? config.borderRadiusRight ?? config.borderRadius) : (config.borderRadiusRight ?? config.borderRadius), 0);
  const prodResolvedBorderBottomRightRadius = formatStyleValue(
    isProdHovered ? (config.hoverBorderRadiusBottom ?? config.hoverBorderRadius ?? config.borderRadiusBottom ?? config.borderRadius) : (config.borderRadiusBottom ?? config.borderRadius), 0);
  const prodResolvedBorderBottomLeftRadius = formatStyleValue(
    isProdHovered ? (config.hoverBorderRadiusLeft ?? config.hoverBorderRadius ?? config.borderRadiusLeft ?? config.borderRadius) : (config.borderRadiusLeft ?? config.borderRadius), 0);

  const prodResolvedBorderStyle = (() => {
    const bt = isProdHovered ? (config.hoverBorderType || config.borderType) : config.borderType;
    return bt && bt !== 'none' && bt !== 'Asali' ? bt : undefined;
  })();

  const prodResolvedBorderTopWidth = (() => {
    const bw = isProdHovered
      ? (config.hoverBorderWidthTop ?? config.hoverBorderWidth ?? config.borderWidthTop ?? config.borderWidth)
      : (config.borderWidthTop ?? config.borderWidth);
    return bw !== undefined ? `${bw}px` : undefined;
  })();
  const prodResolvedBorderRightWidth = (() => {
    const bw = isProdHovered
      ? (config.hoverBorderWidthRight ?? config.hoverBorderWidth ?? config.borderWidthRight ?? config.borderWidth)
      : (config.borderWidthRight ?? config.borderWidth);
    return bw !== undefined ? `${bw}px` : undefined;
  })();
  const prodResolvedBorderBottomWidth = (() => {
    const bw = isProdHovered
      ? (config.hoverBorderWidthBottom ?? config.hoverBorderWidth ?? config.borderWidthBottom ?? config.borderWidth)
      : (config.borderWidthBottom ?? config.borderWidth);
    return bw !== undefined ? `${bw}px` : undefined;
  })();
  const prodResolvedBorderLeftWidth = (() => {
    const bw = isProdHovered
      ? (config.hoverBorderWidthLeft ?? config.hoverBorderWidth ?? config.borderWidthLeft ?? config.borderWidth)
      : (config.borderWidthLeft ?? config.borderWidth);
    return bw !== undefined ? `${bw}px` : undefined;
  })();

  const prodResolvedBorderColor = isProdHovered
    ? (config.hoverBorderColor || config.borderColor || undefined)
    : (config.borderColor || undefined);

  const prodResolvedBoxShadow = (() => {
    if (isProdHovered && config.hoverBoxShadowType === 'custom') {
      return `${config.hoverShadowOffsetX ?? 0}px ${config.hoverShadowOffsetY ?? 0}px ${config.hoverShadowBlur ?? 10}px ${config.hoverShadowSpread ?? 0}px ${config.hoverShadowColor || 'rgba(0,0,0,0.5)'}`;
    }
    if (isProdHovered && config.hoverBoxShadow) {
      return config.hoverBoxShadow;
    }
    if (config.boxShadowType === 'custom') {
      return `${config.shadowOffsetX ?? 0}px ${config.shadowOffsetY ?? 0}px ${config.shadowBlur ?? 10}px ${config.shadowSpread ?? 0}px ${config.shadowColor || 'rgba(0,0,0,0.5)'}`;
    }
    return getProdShadow(config.boxShadow) || config.boxShadow || undefined;
  })();

  const prodResolvedTransition = config.hoverTransitionDuration !== undefined
    ? `background-color ${config.hoverTransitionDuration}s ease, background-image ${config.hoverTransitionDuration}s ease, border-color ${config.hoverTransitionDuration}s ease, border-width ${config.hoverTransitionDuration}s ease, border-radius ${config.hoverTransitionDuration}s ease, box-shadow ${config.hoverTransitionDuration}s ease`
    : undefined;

  const prodStyleObj: React.CSSProperties = {
    backgroundColor: prodResolvedBgColor,
    backgroundImage: prodResolvedBgImage,
    backgroundSize: config.bgImageUrl ? 'cover' : undefined,
    backgroundPosition: config.bgImageUrl ? 'center' : undefined,
    borderTopLeftRadius: prodResolvedBorderTopLeftRadius,
    borderTopRightRadius: prodResolvedBorderTopRightRadius,
    borderBottomRightRadius: prodResolvedBorderBottomRightRadius,
    borderBottomLeftRadius: prodResolvedBorderBottomLeftRadius,
    boxShadow: prodResolvedBoxShadow,
    borderStyle: prodResolvedBorderStyle,
    borderTopWidth: prodResolvedBorderTopWidth,
    borderRightWidth: prodResolvedBorderRightWidth,
    borderBottomWidth: prodResolvedBorderBottomWidth,
    borderLeftWidth: prodResolvedBorderLeftWidth,
    borderColor: prodResolvedBorderColor,
    transition: prodResolvedTransition,
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onElementSelect(elementId, null);
  };

  const handleSubFocusClick = (e: React.MouseEvent, focusType: string) => {
    e.stopPropagation();
    onElementSelect(elementId, focusType);
    console.log(`[ProductListElement SubFocus] Mengaktifkan fokus sub-elemen: ${focusType}`);
  };

  // Map shadow string config to actual CSS value
  let shadowStyle = 'none';
  if (cardBoxShadow === 'soft') shadowStyle = '0 8px 30px rgb(0,0,0,0.04)';
  else if (cardBoxShadow === 'premium') shadowStyle = '0 20px 50px rgba(0,0,0,0.08)';
  else if (cardBoxShadow === 'bold') shadowStyle = '0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.15)';

  return (
    <div
      className={`w-full space-y-3 p-2 rounded-xl transition-all duration-300 ${isActive && !activeSubFocus ? 'bg-blue-500/5' : ''}`}
      onClick={showBuilderUI ? handleContainerClick : undefined}
      onMouseEnter={() => setIsProdHovered(true)}
      onMouseLeave={() => setIsProdHovered(false)}
      style={prodStyleObj}
    >
      {title && (
        <h3
          className={`font-extrabold text-xs uppercase tracking-wider px-2 cursor-pointer transition-all ${isActive && activeSubFocus === 'header_title'
            ? 'outline outline-2 outline-blue-500/60 bg-blue-500/10 rounded px-1 scale-105 shadow-sm'
            : hoverTitleClass
            }`}
          style={titleStyle}
          onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'header_title') : undefined}
        >
          {title}
        </h3>
      )}

      {layout === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-2">
          {displayProducts.map((product: any) => {
            const hasDiscount = product.discountPrice && product.discountPrice > 0;
            const discountPct = hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;

            return (
              <div
                key={product.id}
                className={`group border flex flex-col h-full transition-all duration-500 cursor-pointer ${isActive && activeSubFocus === 'card'
                  ? 'ring-4 ring-blue-500/50 scale-[1.02] shadow-lg'
                  : hoverCardClass
                  }`}
                style={{
                  ...getCardBackgroundStyle(),
                  borderRadius: `${cardBorderRadius}px`,
                  borderColor: cardBorderColor,
                  boxShadow: shadowStyle,
                }}
                onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'card') : () => setSelectedProduct(product)}
              >
                {/* Image Area */}
                <div
                  className={`aspect-square overflow-hidden relative transition-all duration-300 w-full ${isActive && activeSubFocus === 'image'
                    ? 'outline outline-2 outline-blue-500/60 scale-[1.01] shadow-md z-10'
                    : hoverImageClass
                    }`}
                  style={{
                    borderTopLeftRadius: `${cardBorderRadius}px`,
                    borderTopRightRadius: `${cardBorderRadius}px`,
                    borderBottomLeftRadius: `${imageBorderRadius}px`,
                    borderBottomRightRadius: `${imageBorderRadius}px`,
                    padding: `${imagePadding}px`,
                    backgroundColor: imageBgColor
                  }}
                  onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'image') : undefined}
                >
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{
                        borderTopLeftRadius: `${Math.max(0, cardBorderRadius - imagePadding)}px`,
                        borderTopRightRadius: `${Math.max(0, cardBorderRadius - imagePadding)}px`,
                        borderBottomLeftRadius: `${Math.max(0, imageBorderRadius - imagePadding)}px`,
                        borderBottomRightRadius: `${Math.max(0, imageBorderRadius - imagePadding)}px`,
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-200">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}

                  {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
                      -{discountPct}%
                    </div>
                  )}
                </div>

                {/* Info Area */}
                <div
                  className="pt-3.5 flex flex-col flex-grow text-left"
                  style={{
                    padding: `${cardPadding}px`,
                    paddingTop: '12px'
                  }}
                >
                  <h3
                    className={`line-clamp-2 transition-all duration-300 mb-2 group-hover:text-zinc-900 ${isActive && activeSubFocus === 'title'
                      ? 'outline outline-2 outline-blue-500/60 bg-blue-500/10 rounded px-1 scale-105'
                      : hoverNameClass
                      }`}
                    style={productNameStyle}
                    onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'title') : undefined}
                  >
                    {product.name}
                  </h3>

                  <div
                    className={`flex flex-col mt-auto pt-2.5 border-t border-zinc-50 transition-all duration-300 ${isActive && activeSubFocus === 'price'
                      ? 'outline outline-2 outline-blue-500/60 bg-blue-500/10 rounded p-1 scale-105'
                      : hoverPriceClass
                      }`}
                    onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'price') : undefined}
                  >
                    {showStock && (
                      <span
                        className="font-bold uppercase mb-0.5 tracking-tight"
                        style={stockStyle}
                      >
                        Stok: {product.stock || 0}
                      </span>
                    )}
                    {hasDiscount && (
                      <p
                        className="line-through font-medium leading-none mb-0.5"
                        style={{ ...discountPriceStyle, textDecoration: 'line-through' }}
                      >
                        {formatRupiah(product.price)}
                      </p>
                    )}
                    <p
                      className="tracking-tight leading-none"
                      style={priceStyle}
                    >
                      {formatRupiah(hasDiscount ? product.discountPrice : product.price)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative group/slider w-full">
          <div
            ref={scrollRef}
            className="flex items-center gap-4 overflow-x-auto pb-3 px-2 snap-x no-scrollbar"
          >
            {displayProducts.map((product: any) => {
              const hasDiscount = product.discountPrice && product.discountPrice > 0;
              const discountPct = hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;

              return (
              <div
                key={product.id}
                className={`group border flex flex-col w-[170px] shrink-0 snap-start transition-all duration-500 cursor-pointer ${isActive && activeSubFocus === 'card'
                  ? 'ring-4 ring-blue-500/50 scale-[1.02] shadow-lg'
                  : hoverCardClass
                  }`}
                style={{
                  ...getCardBackgroundStyle(),
                  borderRadius: `${cardBorderRadius}px`,
                  borderColor: cardBorderColor,
                  boxShadow: shadowStyle,
                }}
                onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'card') : () => setSelectedProduct(product)}
              >
                {/* Image Area */}
                <div
                  className={`aspect-square overflow-hidden relative transition-all duration-300 w-full ${isActive && activeSubFocus === 'image'
                    ? 'outline outline-2 outline-blue-500/60 scale-[1.01] shadow-md z-10'
                    : hoverImageClass
                    }`}
                  style={{
                    borderTopLeftRadius: `${cardBorderRadius}px`,
                    borderTopRightRadius: `${cardBorderRadius}px`,
                    borderBottomLeftRadius: `${imageBorderRadius}px`,
                    borderBottomRightRadius: `${imageBorderRadius}px`,
                    padding: `${imagePadding}px`,
                    backgroundColor: imageBgColor
                  }}
                  onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'image') : undefined}
                >
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{
                        borderTopLeftRadius: `${Math.max(0, cardBorderRadius - imagePadding)}px`,
                        borderTopRightRadius: `${Math.max(0, cardBorderRadius - imagePadding)}px`,
                        borderBottomLeftRadius: `${Math.max(0, imageBorderRadius - imagePadding)}px`,
                        borderBottomRightRadius: `${Math.max(0, imageBorderRadius - imagePadding)}px`,
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-200">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}

                  {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
                      -{discountPct}%
                    </div>
                  )}
                </div>

                {/* Info Area */}
                <div
                  className="pt-3.5 flex flex-col flex-grow text-left"
                  style={{
                    padding: `${cardPadding}px`,
                    paddingTop: '12px'
                  }}
                >
                  <h3
                    className={`line-clamp-2 transition-all duration-300 mb-2 group-hover:text-zinc-900 ${isActive && activeSubFocus === 'title'
                      ? 'outline outline-2 outline-blue-500/60 bg-blue-500/10 rounded px-1 scale-105'
                      : hoverNameClass
                      }`}
                    style={productNameStyle}
                    onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'title') : undefined}
                  >
                    {product.name}
                  </h3>

                  <div
                    className={`flex flex-col mt-auto pt-2.5 border-t border-zinc-50 transition-all duration-300 ${isActive && activeSubFocus === 'price'
                      ? 'outline outline-2 outline-blue-500/60 bg-blue-500/10 rounded p-1 scale-105'
                      : hoverPriceClass
                      }`}
                    onClick={showBuilderUI ? (e) => handleSubFocusClick(e, 'price') : undefined}
                  >
                    {showStock && (
                      <span
                        className="font-bold uppercase mb-0.5 tracking-tight"
                        style={stockStyle}
                      >
                        Stok: {product.stock || 0}
                      </span>
                    )}
                    {hasDiscount && (
                      <p
                        className="line-through font-medium leading-none mb-0.5"
                        style={{ ...discountPriceStyle, textDecoration: 'line-through' }}
                      >
                        {formatRupiah(product.price)}
                      </p>
                    )}
                    <p
                      className="tracking-tight leading-none"
                      style={priceStyle}
                    >
                      {formatRupiah(hasDiscount ? product.discountPrice : product.price)}
                    </p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Floating desktop scroll chevrons */}
          <button
            type="button"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-zinc-200/85 items-center justify-center text-zinc-700 hover:bg-zinc-50 active:scale-95 transition-all z-20 opacity-0 group-hover/slider:opacity-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("[ProductListElement] Scroll horizontal ke kiri");
              scrollRef.current?.scrollBy({ left: -240, behavior: 'smooth' });
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-zinc-200/85 items-center justify-center text-zinc-700 hover:bg-zinc-50 active:scale-95 transition-all z-20 opacity-0 group-hover/slider:opacity-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log("[ProductListElement] Scroll horizontal ke kanan");
              scrollRef.current?.scrollBy({ left: 240, behavior: 'smooth' });
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

// Ã¢â€â‚¬Ã¢â€â‚¬ COLUMN ELEMENT (nested container) Ã¢â€â‚¬Ã¢â€â‚¬
const PreviewColumn = ({
  element,
  activeElementId,
  onElementSelect,
}: any) => {
  const config = element.config || {};
  const isActive = activeElementId === element.id;

  const getGridMappingClass = (columns: any) => {
    if (!columns) return "";
    let cls = "";
    if (typeof columns === 'number') {
      cls += `grid-cols-${columns} `;
    }
    if (typeof columns === 'string') {
      const parts = columns.split(' ');
      parts.forEach((p: string) => {
        if (p.includes(':')) {
          cls += `${p.split(':')[0]}:grid-cols-${p.split(':')[1]} `;
        } else {
          cls += `grid-cols-${p} `;
        }
      });
    }
    return cls.trim();
  };

  const layout = config.layout || 'flexbox';
  
  const containerStyle: React.CSSProperties = {
    paddingTop: formatStyleValue(config.paddingTop),
    paddingBottom: formatStyleValue(config.paddingBottom),
    paddingLeft: formatStyleValue(config.paddingLeft),
    paddingRight: formatStyleValue(config.paddingRight),
    marginTop: formatStyleValue(config.marginTop),
    marginBottom: formatStyleValue(config.marginBottom),
    backgroundColor: config.bgColor || 'transparent',
    borderRadius: formatStyleValue(config.borderRadius),
    borderWidth: formatStyleValue(config.borderWidth),
    borderColor: config.borderColor || 'transparent',
    borderStyle: config.borderType || 'solid',
    boxShadow: config.boxShadowType && config.boxShadowType !== 'none' && config.shadowColor ? `${config.shadowOffsetX || 0}px ${config.shadowOffsetY || 4}px ${config.shadowBlur || 6}px ${config.shadowSpread || -1}px ${config.shadowColor}` : 'none',
    display: layout === 'flexbox' ? 'flex' : 'grid',
    gap: formatStyleValue(config.gap, 16),
  };

  if (layout === 'flexbox') {
    containerStyle.flexDirection = config.direction || 'col';
    containerStyle.alignItems = config.align || 'flex-start';
    containerStyle.justifyContent = config.justify || 'flex-start';
    containerStyle.flexWrap = config.flexWrap || 'nowrap';
  }

  const gridClass = layout === 'grid' ? getGridMappingClass(config.columns || 1) : '';

  return (
    <div
      className={`${gridClass} ${config.customClass || ''} ${isActive ? 'ring-2 ring-blue-500/50 rounded-lg' : 'hover:ring-2 hover:ring-blue-400/40 hover:bg-blue-50/10 rounded-lg'} transition-all cursor-pointer relative group w-full h-full min-h-[50px]`}
      style={containerStyle}
      onClick={(e) => {
        e.stopPropagation();
        onElementSelect?.(element.id);
      }}
    >
      {(element.children || []).map((child: any) => (
        <PreviewElement
          key={child.id}
          element={child}
          activeElementId={activeElementId}
          onElementSelect={onElementSelect}
        />
      ))}
    </div>
  );
};

const PreviewElement = ({
  element,
  activeElementId,
  onElementSelect,
}: any) => {
  const isActive = activeElementId === element.id;
  
  if (element.type === 'COLUMN') {
    return <PreviewColumn element={element} activeElementId={activeElementId} onElementSelect={onElementSelect} />;
  }

  return (
    <div 
      className={`relative transition-all cursor-pointer rounded-lg hover:ring-2 hover:ring-blue-400/40 ${isActive ? 'ring-2 ring-blue-500/50' : 'hover:bg-blue-50/10'}`}
      onClick={(e) => {
        e.stopPropagation();
        onElementSelect?.(element.id);
      }}
    >
      <div className={`${element.config?.customClass || ''}`}>
        {element.type === 'HEADING' && <HeadingElement config={element.config} />}
        {element.type === 'TEXT' && <TextElement config={element.config} elementId={element.id} />}
        {element.type === 'BUTTON' && <ButtonElement config={element.config} />}
        {element.type === 'IMAGE' && <ImageElement config={element.config} />}
        {element.type === 'GALLERY' && <GalleryElement config={element.config} />}
        {element.type === 'SPACER' && <SpacerElement config={element.config} />}
        {element.type === 'DIVIDER' && <DividerElement config={element.config} />}
        {element.type === 'BADGE' && <BadgeElement config={element.config} />}
        {element.type === 'BRANDING' && <BrandingElement config={element.config} />}
        {element.type === 'MENU' && <MenuElement config={element.config} />}
        {element.type === 'CART' && <CartElement config={element.config} />}
      </div>
    </div>
  );
};

export const PreviewSection = ({
  section,
  elements,
  activeElementId,
  onElementSelect,
  isHovered,
  isActive
}: any) => {
  const config = section.config || {};
  
  const containerStyle: React.CSSProperties = {
    backgroundColor: config.bgColor || 'transparent',
    paddingTop: formatStyleValue(config.paddingTop),
    paddingBottom: formatStyleValue(config.paddingBottom),
    paddingLeft: formatStyleValue(config.paddingLeft),
    paddingRight: formatStyleValue(config.paddingRight),
    marginTop: formatStyleValue(config.marginTop),
    marginBottom: formatStyleValue(config.marginBottom),
  };

  if (config.bgImageUrl) {
    containerStyle.backgroundImage = `url(${config.bgImageUrl})`;
    containerStyle.backgroundSize = config.bgWidth === 'fit' ? 'contain' : 'cover';
    containerStyle.backgroundPosition = 'center';
    containerStyle.backgroundRepeat = 'no-repeat';
  }

  const contentWidthClass = config.contentWidth === 'boxed' ? (config.maxWidth || 'max-w-7xl mx-auto') : 'w-full';

  return (
    <section 
      id={section.id} 
      style={containerStyle} 
      className={`relative w-full transition-all cursor-pointer ${isActive ? 'ring-2 ring-blue-500/20' : 'hover:ring-2 hover:ring-blue-400/20'}`}
      onClick={() => onElementSelect?.(section.id)}
    >
      {config.bgImageUrl && config.overlay > 0 && (
        <div className="absolute inset-0 bg-black" style={{ opacity: config.overlay / 100 }} />
      )}
      
      <div className={`relative z-10 ${contentWidthClass}`}>
        {elements && elements.length > 0 && (
          <div className="flex flex-col">
            {elements.map((el: any) => (
              <PreviewElement
                key={el.id}
                element={el}
                activeElementId={activeElementId}
                onElementSelect={onElementSelect}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

