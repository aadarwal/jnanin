const data = {
    essays: [
      {
        id: 1,
        title: "The Future of AI",
        currentContent: "Recent developments in large language models have shown unprecedented capabilities in reasoning and generation. However, these advances raise important questions about AI safety and ethics. We need to carefully consider the implications of these systems as they continue to evolve.",
        lastUpdated: "2024-02-15",
        wordCount: 2300,
        currentBranch: "main",
        changes: [
          {
            id: "c1",
            date: "2024-02-15",
            timestamp: 1707987600000,
            message: "Added section on recent LLM developments",
            type: "major",
            details: "Extended the discussion of emergent abilities in large language models based on new research",
            wordDiff: "+350 -120",
            tags: ["revision", "research"],
            branch: "main",
            diff: {
              added: [
                {
                  line: 1,
                  content: "Recent developments in large language models have shown unprecedented capabilities in reasoning and generation."
                }
              ],
              removed: [
                {
                  line: 1,
                  content: "Large language models are becoming increasingly sophisticated."
                }
              ],
              unchanged: [
                {
                  line: 2,
                  content: "However, these advances raise important questions about AI safety and ethics."
                }
              ],
              inlineDiff: [
                {
                  content: "[-Large language models are becoming increasingly sophisticated.-]{+Recent developments in large language models have shown unprecedented capabilities in reasoning and generation.+}"
                }
              ]
            }
          },
          {
            id: "c2",
            date: "2024-02-10",
            timestamp: 1707555600000,
            message: "Restructured the introduction",
            type: "minor",
            details: "Improved flow of opening arguments",
            wordDiff: "+80 -65",
            branch: "main",
            diff: {
              added: [
                {
                  line: 3,
                  content: "We need to carefully consider the implications of these systems as they continue to evolve."
                }
              ],
              removed: [
                {
                  line: 3,
                  content: "The future impact of these systems remains unclear."
                }
              ],
              unchanged: [
                {
                  line: 2,
                  content: "However, these advances raise important questions about AI safety and ethics."
                }
              ]
            }
          },
          {
            id: "c3",
            date: "2024-02-05",
            timestamp: 1707123600000,
            message: "Added ethics considerations",
            type: "major",
            details: "Incorporated feedback from philosophy department",
            wordDiff: "+250 -30",
            branch: "ethics-exploration",
            tags: ["review", "feedback"]
          },
          {
            id: "c4",
            date: "2024-02-01",
            timestamp: 1706691600000,
            message: "Initial draft",
            type: "initial",
            details: "First version exploring core ideas",
            wordDiff: "+1200 -0",
            branch: "main",
            tags: ["initial"]
          }
        ]
      },
      {
        id: 2,
        title: "Digital Gardens as Knowledge Management",
        currentContent: "Digital gardens represent a paradigm shift in how we organize and share knowledge online. Unlike traditional blogs with their chronological structure, digital gardens emphasize connection, growth, and evolution of ideas.",
        lastUpdated: "2024-02-12",
        wordCount: 1850,
        currentBranch: "main",
        changes: [
          {
            id: "c5",
            date: "2024-02-12",
            timestamp: 1707728400000,
            message: "Added case studies",
            type: "major",
            details: "Incorporated examples of successful digital gardens",
            wordDiff: "+420 -50",
            branch: "main",
            tags: ["examples", "research"]
          },
          {
            id: "c6",
            date: "2024-02-08",
            timestamp: 1707382800000,
            message: "Expanded on key principles",
            type: "minor",
            details: "Clarified the core concepts that define digital gardens",
            wordDiff: "+180 -120",
            branch: "main"
          },
          {
            id: "c7",
            date: "2024-02-03",
            timestamp: 1706950800000,
            message: "Created experimental section on tooling",
            type: "major",
            details: "Explored different tools for building digital gardens",
            wordDiff: "+350 -0",
            branch: "tooling-exploration",
            mergeFrom: "c8"
          },
          {
            id: "c8",
            date: "2024-01-30",
            timestamp: 1706605200000,
            message: "Initial outline",
            type: "initial",
            details: "Basic structure and main points",
            wordDiff: "+900 -0",
            branch: "main",
            tags: ["initial"]
          }
        ]
      }
    ]
  };
  
  export default data;