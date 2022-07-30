import SvgIconStyle from "../../../components/SvgIconStyle";

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon("ic_user"),
  home: getIcon("ic_home"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
};

const sidebarConfig = [
  {
    items: [
      { title: "Home", path: "/home", icon: ICONS.home },
      { title: "Page One", path: "/page-one", icon: ICONS.dashboard },
      { title: "Page Two", path: "/page-two", icon: ICONS.dashboard },
    ],
  },
];

export default sidebarConfig;
