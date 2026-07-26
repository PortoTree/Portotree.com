import VisualPageBuilder from "@/components/builder/CanvasArea";
import { UIProvider } from "@/components/ui/UIProvider";

export default function TemplateBuilderPage() {
  return (
    <UIProvider>
      <VisualPageBuilder />
    </UIProvider>
  );
}
