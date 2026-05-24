export const sideBarData = [
  {
    title: "👋 Introduction",
    url: "/docs/introduction",
    description: "Get started with Nerzo",
    next: {
      title: "Technology",
      url: "/docs/technology",
    }
  },
  {
    title: "Technology",
    url: "/docs/technology",
    description: "Learn about the technology behind Nerzo",
    prev: {
      title: "👋 Introduction",
      url: "/docs/introduction",
    }
  },
  {
    title: "Platform",
    url: "/docs/platform",
    description: "Learn about the platform",
    items: [
      {
        title: "🐣 How To Use",
        url: "/docs/platform/how-to-use",
        description: "How to use the platform",
        next: {
          title: "Nerzo Token",
          url: "/docs/platform/nerzo-token",
        }
      },
      {
        title: "Nerzo Token",
        url: "/docs/platform/nerzo-token",
        description: "Learn about the Nerzo token",
        prev: {
          title: "🐣 How To Use",
          url: "/docs/platform/how-to-use",

        }
      },
    ],
  },
  {
    title: "Roadmap",
    url: "roadmap",
    description: "Learn about the roadmap",
    items: [
      {
        title: "Season I",
        url: "/docs/roadmap/season-1",
        description: "Learn about Season I",
        prev: {
          title: "Nerzo Token",
          url: "/docs/platform/how-to-use",
        },
        next: {
          title: "Season II",
          url: "/docs/roadmap/season-2",
        }
      },
      {
        title: "Season II",
        url: "/docs/roadmap/season-2",
        description: "Learn about Season II",
        prev: {
          title: "Season I",
          url: "/docs/roadmap/season-1",
        }
      },
    ],
  },
]



