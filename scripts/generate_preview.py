import re

with open(r'C:\PortoTree\src\components\storefront\sections\BuilderSection.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Extract from line 1 to 2406
base_content = ''.join(lines[:2406])

# Fix recursive rendering inside CategoryListElement and ProductListElement
base_content = base_content.replace('<ElementWrapper', '<PreviewElement')

custom_code = '''
const PreviewColumn = ({
  element,
  activeElementId,
  onElementSelect,
}: any) => {
  const config = element.config || {};
  const isActive = activeElementId === element.id;

  // Resolve grid mapping string for responsive columns
  const getGridMappingClass = (columns: any) => {
    if (!columns) return "";
    let cls = "";
    if (typeof columns === 'number') {
      cls += grid-cols- ;
    }
    if (typeof columns === 'string') {
      const parts = columns.split(' ');
      parts.forEach(p => {
        if (p.includes(':')) {
          cls += ${p.split(':')[0]}:grid-cols- ;
        } else {
          cls += grid-cols- ;
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
    boxShadow: config.boxShadowType !== 'none' && config.shadowColor ? \\px \px \px \px \\ : 'none',
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
      className={\\ \ \ transition-all cursor-pointer relative group/col w-full h-full min-h-[50px]\}
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
      className={\elative transition-all \\}
      onClick={(e) => {
        e.stopPropagation();
        onElementSelect?.(element.id);
      }}
    >
      <div className={\\\}>
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
    containerStyle.backgroundImage = \url(\)\;
    containerStyle.backgroundSize = config.bgWidth === 'fit' ? 'contain' : 'cover';
    containerStyle.backgroundPosition = 'center';
    containerStyle.backgroundRepeat = 'no-repeat';
  }

  const contentWidthClass = config.contentWidth === 'boxed' ? (config.maxWidth || 'max-w-7xl mx-auto') : 'w-full';

  return (
    <section 
      id={section.id} 
      style={containerStyle} 
      className={\elative w-full transition-all \\}
      onClick={() => onElementSelect?.(section.id)}
    >
      {config.bgImageUrl && config.overlay > 0 && (
        <div className="absolute inset-0 bg-black" style={{ opacity: config.overlay / 100 }} />
      )}
      
      <div className={\elative z-10 \\}>
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
'''

with open(r'C:\PortoTree\src\components\builder\PreviewSection.tsx', 'w', encoding='utf-8') as f:
    f.write(base_content + '\n' + custom_code)

print("Generated PreviewSection.tsx successfully.")
