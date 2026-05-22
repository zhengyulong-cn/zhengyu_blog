import { defineConfig } from "vitepress";
import tradingSystemSidebar from "./tradingSystemSidebar";
import socialNormsSidebar from "./socialNormsSidebar";
import computerSkillsSidebar from "./computerSkillsSidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "筝语的博客",
  description: "纸上得来终觉浅，绝知此事要躬行",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      {
        text: "计算机技术",
        link: "/computer-skills/HTML和CSS/CSS选择器汇总",
      },
      {
        text: "社会生存",
        link: "/social-norms/社会与人性",
      },
      { text: "交易系统", link: "/trading-system/期货短线交易系统v4版" }
    ],
    sidebar: {
      "/computer-skills": computerSkillsSidebar,
      "/trading-system/": tradingSystemSidebar,
      "/social-norms": socialNormsSidebar,
    },
    outline: [2, 4],
  },
});
