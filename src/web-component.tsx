import { createRoot } from "react-dom/client";
import { Widget } from "./components/Widget";

export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    if (this.shadowRoot) {
      const root = createRoot(this.shadowRoot);
      root.render(<Widget projectId={""} {...props} />);
    }
  }

  getPropsFromAttributes() {
    const props: Record<string, string> = {};
    for (const { name, value } of this.attributes) {
      props[normalizeAttribute(name)] = value;
    }

    return props;
  }
}

export default WidgetWebComponent;
