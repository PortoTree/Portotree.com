import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateMobileCss(selector: string, config: any): string {
  if (!config || Object.keys(config).length === 0) return '';
  
  const cssProps: string[] = [];
  
  // Mapping for common styles. The key is the config property, value is the CSS property or a function.
  if (config.fontSize) cssProps.push(`font-size: ${typeof config.fontSize === 'number' ? config.fontSize + 'px' : config.fontSize} !important;`);
  if (config.fontWeight) cssProps.push(`font-weight: ${config.fontWeight} !important;`);
  if (config.textColor || config.color) cssProps.push(`color: ${config.textColor || config.color} !important;`);
  if (config.align || config.textAlign) cssProps.push(`text-align: ${config.align || config.textAlign} !important;`);
  
  if (config.bgColor) cssProps.push(`background-color: ${config.bgColor} !important;`);
  
  if (config.paddingTop !== undefined) cssProps.push(`padding-top: ${typeof config.paddingTop === 'number' ? config.paddingTop + 'px' : config.paddingTop} !important;`);
  if (config.paddingBottom !== undefined) cssProps.push(`padding-bottom: ${typeof config.paddingBottom === 'number' ? config.paddingBottom + 'px' : config.paddingBottom} !important;`);
  if (config.paddingLeft !== undefined) cssProps.push(`padding-left: ${typeof config.paddingLeft === 'number' ? config.paddingLeft + 'px' : config.paddingLeft} !important;`);
  if (config.paddingRight !== undefined) cssProps.push(`padding-right: ${typeof config.paddingRight === 'number' ? config.paddingRight + 'px' : config.paddingRight} !important;`);
  
  if (config.marginTop !== undefined) cssProps.push(`margin-top: ${typeof config.marginTop === 'number' ? config.marginTop + 'px' : config.marginTop} !important;`);
  if (config.marginBottom !== undefined) cssProps.push(`margin-bottom: ${typeof config.marginBottom === 'number' ? config.marginBottom + 'px' : config.marginBottom} !important;`);
  if (config.marginLeft !== undefined) cssProps.push(`margin-left: ${typeof config.marginLeft === 'number' ? config.marginLeft + 'px' : config.marginLeft} !important;`);
  if (config.marginRight !== undefined) cssProps.push(`margin-right: ${typeof config.marginRight === 'number' ? config.marginRight + 'px' : config.marginRight} !important;`);
  
  if (config.gap) cssProps.push(`gap: ${typeof config.gap === 'number' ? config.gap + 'px' : config.gap} !important;`);
  
  if (config.flexDirection) cssProps.push(`flex-direction: ${config.flexDirection} !important;`);
  if (config.justifyContent) cssProps.push(`justify-content: ${config.justifyContent} !important;`);
  if (config.alignItems) cssProps.push(`align-items: ${config.alignItems} !important;`);
  
  if (config.customWidth) cssProps.push(`width: ${config.customWidth} !important;`);
  if (config.height) cssProps.push(`height: ${config.height} !important;`);
  
  if (config.borderRadius !== undefined) cssProps.push(`border-radius: ${typeof config.borderRadius === 'number' ? config.borderRadius + 'px' : config.borderRadius} !important;`);

  if (cssProps.length === 0) return '';
  
  // Apply to actual device size OR the visual builder's mobile preview wrapper
  return `
    @media (max-width: 768px) {
      ${selector} {
        ${cssProps.join('\n        ')}
      }
    }
    .is-mobile-preview ${selector} {
      ${cssProps.join('\n      ')}
    }
  `;
}
