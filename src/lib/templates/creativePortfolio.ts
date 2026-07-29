import { Section } from "@/types/builder";

export const CREATIVE_PORTFOLIO_TEMPLATE: Section[] = [
  {
    id: "global-settings",
    type: "CANVAS_SETTINGS",
    order: -1,
    isActive: true,
    config: { bgType: "solid", bgColor: "#09090b" }, // Zinc-950 dark background
    elements: [],
  },
  {
    id: "hero-section",
    type: "SECTION",
    order: 1,
    isActive: false,
    config: {
      bgColor: "transparent",
      contentWidth: "boxed",
      maxWidth: "1200px",
      paddingTop: 160,
      paddingBottom: 120,
      paddingLeft: 40,
      paddingRight: 40,
      layout: "flexbox",
      direction: "col",
      align: "center",
      gap: 24,
    },
    elements: [
      {
        id: "hero-badge",
        type: "BADGE",
        config: {
          text: "AVAILABLE FOR HIRE",
          style: "outline",
          textColor: "#10b981", // Emerald-500
          borderColor: "#10b981",
          borderRadius: 9999,
          align: "center",
        },
      },
      {
        id: "hero-title",
        type: "HEADING",
        config: {
          text: "Crafting Digital Experiences",
          fontSize: 72,
          fontWeight: "900",
          textColor: "#ffffff",
          align: "center",
          lineHeight: 1.1,
          letterSpacing: -1,
        },
      },
      {
        id: "hero-subtitle",
        type: "TEXT",
        config: {
          text: "I'm a UI/UX Designer & Developer building modern, responsive, and beautiful web applications that users love.",
          fontSize: 20,
          textColor: "#a1a1aa", // Zinc-400
          align: "center",
          widthType: "custom",
          customWidth: 600,
          margin: "0 auto",
        },
      },
      {
        id: "hero-btn-group",
        type: "COLUMN",
        config: {
          sizing: "fit",
          width: "fit-content",
        },
        elements: [
          {
            id: "btn-primary",
            type: "BUTTON",
            config: {
              text: "View My Works",
              style: "primary",
              bgColor: "#3b82f6", // Blue-500
              textColor: "#ffffff",
              borderRadius: 9999,
              paddingTop: 16,
              paddingBottom: 16,
              paddingLeft: 32,
              paddingRight: 32,
            },
          },
        ],
      },
    ],
  },
  {
    id: "services-section",
    type: "SECTION",
    order: 2,
    isActive: false,
    config: {
      bgColor: "#18181b", // Zinc-900
      contentWidth: "boxed",
      maxWidth: "1200px",
      paddingTop: 100,
      paddingBottom: 100,
      paddingLeft: 40,
      paddingRight: 40,
      layout: "flexbox",
      direction: "col",
      align: "left",
      gap: 48,
    },
    elements: [
      {
        id: "service-title",
        type: "HEADING",
        config: {
          text: "What I Do",
          fontSize: 40,
          fontWeight: "800",
          textColor: "#ffffff",
          align: "left",
        },
      },
      {
        id: "service-row",
        type: "COLUMN", // Act as a row wrapper
        config: {
          width: "100%",
          layout: "flexbox",
          direction: "row", // Ensure flex-row
        },
        elements: [
          {
            id: "service-col-1",
            type: "COLUMN",
            config: {
              width: "33.333%",
              bgColor: "#27272a", // Zinc-800
              borderRadius: 16,
              paddingTop: 32,
              paddingBottom: 32,
              paddingLeft: 32,
              paddingRight: 32,
            },
            elements: [
              {
                id: "s1-title",
                type: "HEADING",
                config: {
                  text: "UI/UX Design",
                  fontSize: 24,
                  fontWeight: "700",
                  textColor: "#ffffff",
                  marginBottom: 16,
                },
              },
              {
                id: "s1-desc",
                type: "TEXT",
                config: {
                  text: "Designing intuitive interfaces that engage users and solve complex problems elegantly.",
                  textColor: "#a1a1aa",
                  fontSize: 16,
                },
              },
            ],
          },
          {
            id: "service-col-2",
            type: "COLUMN",
            config: {
              width: "33.333%",
              bgColor: "#27272a",
              borderRadius: 16,
              paddingTop: 32,
              paddingBottom: 32,
              paddingLeft: 32,
              paddingRight: 32,
            },
            elements: [
              {
                id: "s2-title",
                type: "HEADING",
                config: {
                  text: "Frontend Dev",
                  fontSize: 24,
                  fontWeight: "700",
                  textColor: "#ffffff",
                  marginBottom: 16,
                },
              },
              {
                id: "s2-desc",
                type: "TEXT",
                config: {
                  text: "Building responsive, blazing-fast web applications using React, Next.js, and Tailwind CSS.",
                  textColor: "#a1a1aa",
                  fontSize: 16,
                },
              },
            ],
          },
          {
            id: "service-col-3",
            type: "COLUMN",
            config: {
              width: "33.333%",
              bgColor: "#27272a",
              borderRadius: 16,
              paddingTop: 32,
              paddingBottom: 32,
              paddingLeft: 32,
              paddingRight: 32,
            },
            elements: [
              {
                id: "s3-title",
                type: "HEADING",
                config: {
                  text: "Visual Identity",
                  fontSize: 24,
                  fontWeight: "700",
                  textColor: "#ffffff",
                  marginBottom: 16,
                },
              },
              {
                id: "s3-desc",
                type: "TEXT",
                config: {
                  text: "Creating memorable brand identities that resonate with your target audience.",
                  textColor: "#a1a1aa",
                  fontSize: 16,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cta-section",
    type: "SECTION",
    order: 3,
    isActive: false,
    config: {
      bgColor: "#3b82f6", // Blue-500
      contentWidth: "boxed",
      maxWidth: "1200px",
      paddingTop: 80,
      paddingBottom: 80,
      paddingLeft: 40,
      paddingRight: 40,
      layout: "flexbox",
      direction: "col",
      align: "center",
      gap: 24,
    },
    elements: [
      {
        id: "cta-title",
        type: "HEADING",
        config: {
          text: "Ready to start a project?",
          fontSize: 48,
          fontWeight: "800",
          textColor: "#ffffff",
          align: "center",
        },
      },
      {
        id: "cta-btn",
        type: "BUTTON",
        config: {
          text: "Let's Talk",
          style: "primary",
          bgColor: "#ffffff",
          textColor: "#3b82f6",
          borderRadius: 9999,
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 40,
          paddingRight: 40,
          fontSize: 18,
          fontWeight: "700",
        },
      },
    ],
  },
];
