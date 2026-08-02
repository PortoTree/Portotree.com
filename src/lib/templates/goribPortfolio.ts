import { Section } from "@/types/builder";
import { v4 as uuidv4 } from "uuid";

export const GORIB_PORTFOLIO_TEMPLATE: Section[] = [
  {
    id: "global-settings",
    type: "CANVAS_SETTINGS",
    order: -1,
    isActive: true,
    config: { bgType: "solid", bgColor: "#ffffff" },
    elements: [],
  },
  // HEADER
  {
    id: "global-header",
    type: "HEADER",
    order: 0,
    isActive: true,
    config: {
      bgColor: "#ffffff",
      contentWidth: "boxed",
      maxWidth: "1200px",
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
      layout: "flexbox",
      direction: "row",
      align: "center",
      justifyContent: "space-between",
      position: "sticky",
      zIndex: 100,
      margin: 0,
      borderRadius: 0,
      gap: 16,
      _v16_upgraded: true
    },
    elements: [
      {
        id: "header-logo",
        type: "HEADING",
        order: 0,
        config: {
          text: "Nama anda.",
          fontSize: 24,
          fontWeight: "800",
          textColor: "#10b981", // Emerald green
        },
      },
      {
        id: "header-right-col",
        type: "COLUMN",
        order: 1,
        config: {
          layout: "flexbox",
          direction: "row",
          align: "center",
          justifyContent: "flex-end",
          gap: 24,
          sizing: "fit",
          customClass: "flex-nowrap",
        },
        elements: [
          {
            id: "header-nav",
            type: "NAVIGATION",
            order: 0,
            config: {
              showNavigation: true,
              fontSize: 14,
              fontWeight: "600",
              textColor: "#334155",
            },
          },
          {
            id: "header-btn",
            type: "BUTTON",
            order: 1,
            config: {
              text: "Hire Me",
              actionType: "whatsapp",
              link: "",
              size: "sm",
              variant: "solid",
              bgColor: "#10b981",
              textColor: "#ffffff",
              borderRadius: 9999,
            },
          }
        ]
      }
    ],
  },
  // 1. HERO
  {
    id: "hero-section",
    type: "SECTION",
    order: 1,
    isActive: true,
    config: {
      bgColor: "#d1fae5", // Light green background
      customClass: "bg-grid-pattern relative",
      contentWidth: "boxed",
      maxWidth: "1200px",
      paddingTop: 80,
      paddingBottom: 80,
      paddingLeft: 40,
      paddingRight: 40,
      layout: "flexbox",
      direction: "row",
      align: "center",
      justifyContent: "space-between",
      gap: 40,
    },
    elements: [
      {
        id: "hero-col-1",
        type: "COLUMN",
        order: 0,
        config: {
          layout: "flexbox",
          direction: "col",
          align: "start",
          gap: 20,
          width: "50%",
        },
        elements: [
          {
            id: "hero-greeting",
            type: "TEXT",
            order: 0,
            config: {
              text: "Hello There !",
              fontSize: 18,
              fontWeight: "600",
              textColor: "#334155",
            },
          },
          {
            id: "hero-title",
            type: "HEADING",
            order: 1,
            config: {
              text: "I'M <span style='color: #10b981'>KILLER MILLERSE</span>",
              fontSize: 48,
              fontWeight: "900",
              textColor: "#1e293b",
              lineHeight: 1.1,
            },
          },
          {
            id: "hero-desc",
            type: "TEXT",
            order: 2,
            config: {
              text: "Hi, I'm a professional web designer and developer with a UI/UX designer. So your experience.",
              fontSize: 16,
              textColor: "#475569",
              lineHeight: 1.6,
            },
          }
        ],
      },
      {
        id: "hero-img-col",
        type: "COLUMN",
        order: 1,
        config: {
          layout: "flexbox",
          direction: "col",
          align: "center",
          justifyContent: "center",
          width: "50%",
        },
        elements: [
          {
            id: "hero-image",
            type: "IMAGE",
            order: 0,
            config: {
              src: "/placeholder-person-4x4.png",
              alt: "Killer Millerse",
              width: 400,
              height: 400,
              borderRadius: 24, // Approximation of the blob shape for now
              objectFit: "cover",
            },
          }
        ],
      }
    ],
  },
  // 2. ABOUT ME
  {
    id: "about-section",
    type: "SECTION",
    order: 2,
    isActive: true,
    config: {
      bgColor: "#ffffff",
      contentWidth: "boxed",
      maxWidth: "1000px",
      paddingTop: 80,
      paddingBottom: 80,
      paddingLeft: 40,
      paddingRight: 40,
      layout: "flexbox",
      direction: "col",
      align: "center",
      gap: 40,
    },
    elements: [
      {
        id: "about-header",
        type: "HEADING",
        order: 0,
        config: {
          text: "ABOUT ME",
          fontSize: 32,
          fontWeight: "800",
          textColor: "#10b981",
          align: "center",
        },
      },
      {
        id: "about-content-row",
        type: "COLUMN",
        order: 1,
        config: {
          layout: "flexbox",
          direction: "row",
          mobileDirection: "col-reverse",
          align: "start",
          justifyContent: "center",
          gap: 60,
          width: "100%",
        },
        elements: [
          {
            id: "about-img",
            type: "IMAGE",
            order: 0,
            config: {
              src: "/placeholder-person.png",
              alt: "About Me",
              width: 300,
              height: 400,
              borderRadius: 16,
              objectFit: "cover",
            },
          },
          {
            id: "about-text-col",
            type: "COLUMN",
            order: 1,
            config: {
              layout: "flexbox",
              direction: "col",
              align: "start",
              gap: 20,
              width: "50%",
            },
            elements: [
              {
                id: "about-title",
                type: "HEADING",
                order: 0,
                config: {
                  text: "I'm killers millerse",
                  fontSize: 24,
                  fontWeight: "700",
                  textColor: "#1e293b",
                },
              },
              {
                id: "about-subtitle",
                type: "TEXT",
                order: 1,
                config: {
                  text: "UI & UX Designer with developer",
                  fontSize: 14,
                  fontWeight: "600",
                  textColor: "#64748b",
                },
              },
              {
                id: "about-desc",
                type: "TEXT",
                order: 2,
                config: {
                  text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
                  fontSize: 15,
                  textColor: "#475569",
                  lineHeight: 1.6,
                },
              },
              {
                id: "about-btn-group",
                type: "COLUMN",
                order: 3,
                config: {
                  layout: "flexbox",
                  direction: "row",
                  align: "center",
                  gap: 16,
                },
                elements: [
                  {
                    id: "about-dl-btn",
                    type: "BUTTON",
                    order: 0,
                    config: {
                      text: "Download CV",
                      size: "md",
                      variant: "outline",
                      borderColor: "#10b981",
                      textColor: "#10b981",
                      borderRadius: 9999,
                    },
                  },
                  {
                    id: "about-hire-btn",
                    type: "BUTTON",
                    order: 1,
                    config: {
                      text: "Hire Me",
                      size: "md",
                      variant: "solid",
                      bgColor: "#10b981",
                      textColor: "#ffffff",
                      borderRadius: 9999,
                    },
                  }
                ]
              }
            ],
          }
        ],
      }
    ]
  },
  // 3. MY SERVICES
  {
    id: "services-section",
    type: "SECTION",
    order: 3,
    isActive: true,
    config: {
      bgColor: "#d1fae5",
      contentWidth: "boxed",
      maxWidth: "1000px",
      paddingTop: 80,
      paddingBottom: 80,
      paddingLeft: 40,
      paddingRight: 40,
      layout: "flexbox",
      direction: "col",
      align: "center",
      gap: 40,
    },
    elements: [
      {
        id: "services-header",
        type: "HEADING",
        order: 0,
        config: {
          text: "MY SERVICES",
          fontSize: 32,
          fontWeight: "800",
          textColor: "#10b981",
          align: "center",
        },
      },
      {
        id: "services-grid",
        type: "COLUMN",
        order: 1,
        config: {
          layout: "grid",
          gridCols: 3,
          gap: 24,
          width: "100%",
        },
        elements: [
          {
            id: "srv-1",
            type: "COLUMN",
            order: 0,
            config: {
              bgColor: "#ffffff",
              paddingTop: 32, paddingBottom: 32, paddingLeft: 24, paddingRight: 24,
              borderRadius: 16,
              layout: "flexbox",
              direction: "col",
              align: "center",
              gap: 16,
            },
            elements: [
              { id: "srv-icon-1", type: "TEXT", order: 0, config: { text: "💻", fontSize: 32 } },
              { id: "srv-title-1", type: "HEADING", order: 1, config: { text: "Web Design", fontSize: 18, fontWeight: "700" } },
              { id: "srv-desc-1", type: "TEXT", order: 2, config: { text: "It is a long established fact that a reader.", fontSize: 14, align: "center", textColor: "#64748b" } }
            ]
          },
          {
            id: "srv-2",
            type: "COLUMN",
            order: 1,
            config: {
              bgColor: "#ffffff",
              paddingTop: 32, paddingBottom: 32, paddingLeft: 24, paddingRight: 24,
              borderRadius: 16,
              layout: "flexbox",
              direction: "col",
              align: "center",
              gap: 16,
            },
            elements: [
              { id: "srv-icon-2", type: "TEXT", order: 0, config: { text: "🎨", fontSize: 32 } },
              { id: "srv-title-2", type: "HEADING", order: 1, config: { text: "Graphic Design", fontSize: 18, fontWeight: "700" } },
              { id: "srv-desc-2", type: "TEXT", order: 2, config: { text: "It is a long established fact that a reader.", fontSize: 14, align: "center", textColor: "#64748b" } }
            ]
          },
          {
            id: "srv-3",
            type: "COLUMN",
            order: 2,
            config: {
              bgColor: "#ffffff",
              paddingTop: 32, paddingBottom: 32, paddingLeft: 24, paddingRight: 24,
              borderRadius: 16,
              layout: "flexbox",
              direction: "col",
              align: "center",
              gap: 16,
            },
            elements: [
              { id: "srv-icon-3", type: "TEXT", order: 0, config: { text: "📱", fontSize: 32 } },
              { id: "srv-title-3", type: "HEADING", order: 1, config: { text: "UI/UX Design", fontSize: 18, fontWeight: "700" } },
              { id: "srv-desc-3", type: "TEXT", order: 2, config: { text: "It is a long established fact that a reader.", fontSize: 14, align: "center", textColor: "#64748b" } }
            ]
          }
        ]
      }
    ]
  },
  // 4. MY PORTFOLIO
  {
    id: "portfolio-section",
    type: "SECTION",
    order: 4,
    isActive: true,
    config: {
      bgColor: "#ffffff",
      contentWidth: "boxed",
      maxWidth: "1000px",
      paddingTop: 80,
      paddingBottom: 80,
      paddingLeft: 40,
      paddingRight: 40,
      layout: "flexbox",
      direction: "col",
      align: "center",
      gap: 40,
    },
    elements: [
      {
        id: "portfolio-header",
        type: "HEADING",
        order: 0,
        config: {
          text: "MY PORTFOLIO",
          fontSize: 32,
          fontWeight: "800",
          textColor: "#10b981",
          align: "center",
        },
      },
      {
        id: "portfolio-grid",
        type: "COLUMN",
        order: 1,
        config: {
          layout: "grid",
          gridCols: 3,
          gap: 16,
          width: "100%",
        },
        elements: [
          { id: "ptf-1", type: "IMAGE", order: 0, config: { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc", width: 300, height: 200, objectFit: "cover", borderRadius: 8 } },
          { id: "ptf-2", type: "IMAGE", order: 1, config: { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", width: 300, height: 200, objectFit: "cover", borderRadius: 8 } },
          { id: "ptf-3", type: "IMAGE", order: 2, config: { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", width: 300, height: 200, objectFit: "cover", borderRadius: 8 } },
          { id: "ptf-4", type: "IMAGE", order: 3, config: { src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3", width: 300, height: 200, objectFit: "cover", borderRadius: 8 } },
          { id: "ptf-5", type: "IMAGE", order: 4, config: { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5", width: 300, height: 200, objectFit: "cover", borderRadius: 8 } },
          { id: "ptf-6", type: "IMAGE", order: 5, config: { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97", width: 300, height: 200, objectFit: "cover", borderRadius: 8 } }
        ]
      },
      {
        id: "stats-row",
        type: "COLUMN",
        order: 2,
        config: {
          layout: "flexbox",
          direction: "row",
          align: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingTop: 40,
        },
        elements: [
          { id: "stat-1", type: "TEXT", order: 0, config: { text: "200+<br/><span style='font-size:12px;color:#64748b'>TOTAL PROJECT</span>", align: "center", fontWeight: "700", textColor: "#10b981", fontSize: 24 } },
          { id: "stat-2", type: "TEXT", order: 1, config: { text: "150+<br/><span style='font-size:12px;color:#64748b'>HAPPY CLIENTS</span>", align: "center", fontWeight: "700", textColor: "#10b981", fontSize: 24 } },
          { id: "stat-3", type: "TEXT", order: 2, config: { text: "250+<br/><span style='font-size:12px;color:#64748b'>TOTAL REVIEW</span>", align: "center", fontWeight: "700", textColor: "#10b981", fontSize: 24 } },
          { id: "stat-4", type: "TEXT", order: 3, config: { text: "850+<br/><span style='font-size:12px;color:#64748b'>WORKING HOURS</span>", align: "center", fontWeight: "700", textColor: "#10b981", fontSize: 24 } }
        ]
      }
    ]
  },
  // 5. CONTACT ME
  {
    id: "contact-section",
    type: "SECTION",
    order: 5,
    isActive: true,
    config: {
      bgColor: "#d1fae5",
      contentWidth: "boxed",
      maxWidth: "800px",
      paddingTop: 80,
      paddingBottom: 80,
      paddingLeft: 40,
      paddingRight: 40,
      layout: "flexbox",
      direction: "col",
      align: "center",
      gap: 40,
    },
    elements: [
      {
        id: "contact-header",
        type: "HEADING",
        order: 0,
        config: {
          text: "CONTACT ME",
          fontSize: 32,
          fontWeight: "800",
          textColor: "#10b981",
          align: "center",
        },
      },
      {
        id: "contact-form",
        type: "COLUMN",
        order: 1,
        config: {
          layout: "flexbox",
          direction: "col",
          align: "center",
          gap: 16,
          width: "100%",
        },
        elements: [
          {
            id: "contact-row",
            type: "COLUMN",
            order: 0,
            config: {
              layout: "flexbox",
              direction: "row",
              gap: 16,
              width: "100%",
            },
            elements: [
               { id: "input-name", type: "TEXT", order: 0, config: { text: "Name", bgColor: "#ffffff", paddingLeft: 16, paddingTop: 12, paddingBottom: 12, borderRadius: 8, width: "50%", textColor: "#94a3b8" } },
               { id: "input-email", type: "TEXT", order: 1, config: { text: "Email", bgColor: "#ffffff", paddingLeft: 16, paddingTop: 12, paddingBottom: 12, borderRadius: 8, width: "50%", textColor: "#94a3b8" } }
            ]
          },
          { id: "input-msg", type: "TEXT", order: 1, config: { text: "Message", bgColor: "#ffffff", paddingLeft: 16, paddingTop: 12, paddingBottom: 60, borderRadius: 8, width: "100%", textColor: "#94a3b8" } },
          { id: "contact-submit", type: "BUTTON", order: 2, config: { text: "Submit", bgColor: "#10b981", textColor: "#ffffff", borderRadius: 9999, align: "start" } }
        ]
      }
    ]
  },
  // 7. FOOTER
  {
    id: "footer-section",
    type: "SECTION",
    order: 7,
    isActive: true,
    config: {
      bgColor: "#10b981", // Emerald green footer
      contentWidth: "boxed",
      maxWidth: "1200px",
      paddingTop: 24,
      paddingBottom: 24,
      layout: "flexbox",
      direction: "row",
      align: "center",
      justifyContent: "center",
    },
    elements: [
      {
        id: "footer-text",
        type: "TEXT",
        order: 0,
        config: {
          text: "Copyright 2026 by Gorib.",
          fontSize: 14,
          textColor: "#ffffff",
          align: "center",
        },
      }
    ],
  }
];
