import { defineConfig } from "vitepress";
import tradingSystemSidebar from "./tradingSystemSidebar";
import socialNormsSidebar from "./socialNormsSidebar";
import computerSkillsSidebar from "./computerSkillsSidebar";
import zhchessSidebar from "./zhchessSidebar";
import theoryStudySidebar from "./theoryStudySidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "筝语的博客",
  description: "纸上得来终觉浅，绝知此事要躬行",
  themeConfig: {
    logo: './butterfly.png',
    nav: [
      { text: "首页", link: "/" },
      // { text: "理论学习", link: "/theory-study/数学分析" },
      {
        text: "计算机技术",
        link: "/computer-skills/HTML和CSS/CSS选择器汇总",
      },
      // {
      //   text: "象棋",
      //   link: "/zh-chess/基础杀法",
      // },
      // {
      //   text: "社会生存",
      //   link: "/social-norms/社会与人性",
      // },
      { text: "交易系统", link: "/trading-system/趋势交易系统v7版" }
    ],
    sidebar: {
      "/theory-study": theoryStudySidebar,
      "/computer-skills": computerSkillsSidebar,
      "/zh-chess": zhchessSidebar,
      "/trading-system/": tradingSystemSidebar,
      "/social-norms": socialNormsSidebar,
    },
    outline: [2, 4],
  },
  markdown: {
    math: true,
  },
});
