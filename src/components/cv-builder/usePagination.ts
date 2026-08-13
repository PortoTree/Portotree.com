import { useEffect, useState, useCallback } from 'react';

// A4 height in pixels at standard 96 DPI (297mm = 1122.52px)
const A4_HEIGHT_PX = 1122.5;

export function usePagination(dependencies: any[]) {
  const [pages, setPages] = useState<number>(1);
  const [isPaginating, setIsPaginating] = useState(true);

  const runPagination = useCallback(() => {
    setIsPaginating(true);
    
    // Use a small timeout to ensure DOM is fully updated before measuring
    setTimeout(() => {
      const measurer = document.getElementById('cv-content-measurer');
      if (!measurer) {
        setIsPaginating(false);
        return;
      }
      
      // 1. Reset all previously applied margins
      const measurerElements = measurer.querySelectorAll('.break-inside-avoid, .cv-section');
      measurerElements.forEach((el: any) => {
        el.style.marginTop = '0px';
      });

      const pushes: { el: any; pushAmount: number }[] = [];
      const measurerRect = measurer.getBoundingClientRect();
      
      // We will track which sections we have already pushed to avoid pushing them multiple times
      const pushedSections = new Set<Element>();

      measurerElements.forEach((el: any) => {
        let rectToMeasure = el.getBoundingClientRect();
        let elToPush = el;

        // Check if this element is the first child of its immediate list container
        const isFirstItem = el.parentElement && el.parentElement.firstElementChild === el;
        const section = el.closest('.cv-section');

        // If it's the first item of a cv-section, we treat the ENTIRE top part of the section as part of this element!
        // This prevents orphan headings (heading on Page X, first item on Page Y).
        if (isFirstItem && section && !pushedSections.has(section)) {
           const sectionRect = section.getBoundingClientRect();
           rectToMeasure = {
             top: sectionRect.top,
             height: rectToMeasure.bottom - sectionRect.top,
             bottom: rectToMeasure.bottom,
             left: sectionRect.left,
             right: sectionRect.right,
             width: sectionRect.width,
             x: sectionRect.x,
             y: sectionRect.y,
             toJSON: () => {}
           };
           elToPush = section;
        }
        
        // Get element's position relative to the container
        const relativeTop = rectToMeasure.top - measurerRect.top;
        const relativeBottom = relativeTop + rectToMeasure.height;

        // Which page does this element start and end on?
        const startPage = Math.floor((relativeTop + 1) / A4_HEIGHT_PX); // page index (0-based) where element starts
        const endPage = Math.floor((relativeBottom - 1) / A4_HEIGHT_PX); // page index where element ends

        // If it crosses a page boundary, push it down to the next page
        if (endPage > startPage) {
          // Calculate how much margin we need to push it to the exact start of the next page
          const nextPageTop = (startPage + 1) * A4_HEIGHT_PX;
          const pushAmount = nextPageTop - relativeTop;
          
          // Add 20px buffer so it doesn't touch the exact edge
          const finalPush = pushAmount + 20;
          pushes.push({ el: elToPush, pushAmount: finalPush });
          
          // Apply to measurer immediately so subsequent elements are calculated correctly
          elToPush.style.marginTop = `${finalPush}px`;
          
          if (elToPush === section) {
            pushedSections.add(section);
          }
        }
      });

      // After pushing elements, recalculate total height to determine number of pages
      const newTotalHeight = measurer.getBoundingClientRect().height;
      const newPageCount = Math.max(1, Math.ceil(newTotalHeight / A4_HEIGHT_PX));
      
      setPages(newPageCount);

      // then find the corresponding element in the clones and apply the margin.
      
      let pushIdCounter = 0;
      pushes.forEach((pushTask) => {
         pushTask.el.setAttribute('data-pagination-push-id', pushIdCounter.toString());
         
         const allInstances = document.querySelectorAll('.cv-instance');
         allInstances.forEach(instance => {
            // Because the HTML was cloned (or rendered identically by React),
            // the nodes are in the exact same order.
            // We can find the corresponding node by tree traversal, or just by relying on React rendering the same DOM structure.
            // Actually, React re-renders the instances, so they DON'T have the 'data-pagination-push-id' attribute!
            // Wait, we can't use an attribute injected via JS if the instances are re-rendered by React!
         });
         
         pushIdCounter++;
      });
      
      // Wait, if React renders identical DOM trees, we can just use the flat index of the DOM nodes!
      // Let's re-query all break-inside-avoid and cv-section in the measurer to get their indices.
      const allMeasurerNodes = Array.from(measurer.querySelectorAll('.break-inside-avoid, .cv-section'));
      
      const allInstances = document.querySelectorAll('.cv-instance');
      allInstances.forEach(instance => {
         const instanceNodes = Array.from(instance.querySelectorAll('.break-inside-avoid, .cv-section'));
         
         // Sync the margins!
         instanceNodes.forEach((node: any, index: number) => {
            if (allMeasurerNodes[index]) {
               node.style.marginTop = (allMeasurerNodes[index] as HTMLElement).style.marginTop;
            }
         });
      });

      setIsPaginating(false);
    }, 100);
  }, []);

  useEffect(() => {
    runPagination();
    
    // Ensure we re-calculate after fonts are loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runPagination);
    }

    window.addEventListener('resize', runPagination);
    
    // Add ResizeObserver to detect when the container becomes visible (e.g., mobile preview toggled)
    const measurer = document.getElementById('cv-content-measurer');
    let resizeObserver: ResizeObserver | null = null;
    if (measurer) {
      resizeObserver = new ResizeObserver(() => {
        // Only repaginate if it has actual height (not display: none)
        if (measurer.getBoundingClientRect().height > 0) {
          runPagination();
        }
      });
      resizeObserver.observe(measurer);
    }

    return () => {
      window.removeEventListener('resize', runPagination);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, dependencies);

  return { pages, isPaginating, forceRepaginate: runPagination };
}
