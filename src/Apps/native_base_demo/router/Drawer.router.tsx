
import React from "react";
import { createDrawerNavigator } from 'react-navigation-drawer'
import * as routerConf from "../pages";

const Drawer = createDrawerNavigator(
  {
    Home: { screen: routerConf.Home },
    Anatomy: { screen: routerConf.Anatomy },
    Header: { screen: routerConf.Header },
    Footer: { screen: routerConf.Footer },
    NHBadge: { screen: routerConf.NHBadge },
    NHButton: { screen: routerConf.NHButton },
    NHCard: { screen: routerConf.NHCard },
    NHCheckbox: { screen: routerConf.NHCheckbox },
    NHDeckSwiper: { screen: routerConf.NHDeckSwiper },
    NHFab: { screen: routerConf.NHFab },
    NHForm: { screen: routerConf.NHForm },
    NHIcon: { screen: routerConf.NHIcon },
    NHLayout: { screen: routerConf.NHLayout },
    NHList: { screen: routerConf.NHList },
    ListSwipe: { screen: routerConf.ListSwipe },
    NHRadio: { screen: routerConf.NHRadio },
    NHSearchbar: { screen: routerConf.NHSearchbar },
    NHSpinner: { screen: routerConf.NHSpinner },
    NHPicker: { screen: routerConf.NHPicker },
    NHTab: { screen: routerConf.NHTab },
    NHThumbnail: { screen: routerConf.NHThumbnail },
    NHTypography: { screen: routerConf.NHTypography },
    Segment: { screen: routerConf.Segment },
    NHToast: { screen: routerConf.NHToast },
    Actionsheet: { screen: routerConf.Actionsheet },
    NHAccordion: { screen: routerConf.NHAccordion },
    NHDatePicker: { screen: routerConf.NHDatePicker }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <routerConf.SideBar {...props} />
  }
);

export default Drawer