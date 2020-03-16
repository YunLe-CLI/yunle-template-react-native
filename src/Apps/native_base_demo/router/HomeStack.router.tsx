import { createStackNavigator } from "react-navigation-stack";
import * as routerConf from "../pages";
import Drawer from './Drawer.router';

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },

    Header1: { screen: routerConf.Header1 },
    Header2: { screen: routerConf.Header2 },
    Header3: { screen: routerConf.Header3 },
    Header4: { screen: routerConf.Header4 },
    Header5: { screen: routerConf.Header5 },
    Header6: { screen: routerConf.Header6 },
    Header7: { screen: routerConf.Header7 },
    Header8: { screen: routerConf.Header8 },
    HeaderSpan: { screen: routerConf.HeaderSpan },
    HeaderNoShadow: { screen: routerConf.HeaderNoShadow },
    HeaderNoLeft: { screen: routerConf.HeaderNoLeft },
    HeaderTransparent: { screen: routerConf.HeaderTransparent },

    BasicFooter: { screen: routerConf.BasicFooter },
    IconFooter: { screen: routerConf.IconFooter },
    IconText: { screen: routerConf.IconText },
    BadgeFooter: { screen: routerConf.BadgeFooter },

    Default: { screen: routerConf.Default },
    Outline: { screen: routerConf.Outline },
    Rounded: { screen: routerConf.Rounded },
    Block: { screen: routerConf.Block },
    Full: { screen: routerConf.Full },
    Custom: { screen: routerConf.Custom },
    Transparent: { screen: routerConf.Transparent },
    IconBtn: { screen: routerConf.IconBtn },
    Disabled: { screen: routerConf.Disabled },

    BasicCard: { screen: routerConf.BasicCard },
    NHCardItemBordered: { screen: routerConf.NHCardItemBordered },
    NHCardItemButton: { screen: routerConf.NHCardItemButton },
    NHCardImage: { screen: routerConf.NHCardImage },
    NHCardShowcase: { screen: routerConf.NHCardShowcase },
    NHCardList: { screen: routerConf.NHCardList },
    NHCardHeaderAndFooter: { screen: routerConf.NHCardHeaderAndFooter },
    NHCardTransparent: { screen: routerConf.NHCardTransparent },
    NHCardCustomBorderRadius: { screen: routerConf.NHCardCustomBorderRadius },

    SimpleDeck: { screen: routerConf.SimpleDeck },
    AdvancedDeck: { screen: routerConf.AdvancedDeck },

    BasicFab: { screen: routerConf.BasicFab },
    MultipleFab: { screen: routerConf.MultipleFab },

    FixedLabel: { screen: routerConf.FixedLabel },
    InlineLabel: { screen: routerConf.InlineLabel },
    FloatingLabel: { screen: routerConf.FloatingLabel },
    PlaceholderLabel: { screen: routerConf.PlaceholderLabel },
    StackedLabel: { screen: routerConf.StackedLabel },
    RegularInput: { screen: routerConf.RegularInput },
    UnderlineInput: { screen: routerConf.UnderlineInput },
    RoundedInput: { screen: routerConf.RoundedInput },
    IconInput: { screen: routerConf.IconInput },
    SuccessInput: { screen: routerConf.SuccessInput },
    ErrorInput: { screen: routerConf.ErrorInput },
    DisabledInput: { screen: routerConf.DisabledInput },
    PickerInput: { screen: routerConf.PickerInput },
    TextArea: { screen: routerConf.TextArea },

    Icons: { screen: routerConf.Icons },
    BasicIcon: { screen: routerConf.BasicIcon },
    StateIcon: { screen: routerConf.StateIcon },
    PlatformSpecificIcon: { screen: routerConf.PlatformSpecificIcon },
    IconFamily: { screen: routerConf.IconFamily },

    RowNB: { screen: routerConf.RowNB },
    ColumnNB: { screen: routerConf.ColumnNB },
    NestedGrid: { screen: routerConf.NestedGrid },
    CustomRow: { screen: routerConf.CustomRow },
    CustomCol: { screen: routerConf.CustomCol },

    NHBasicList: { screen: routerConf.NHBasicList },
    NHListItemSelected: { screen: routerConf.NHListItemSelected },
    NHListDivider: { screen: routerConf.NHListDivider },
    NHListSeparator: { screen: routerConf.NHListSeparator },
    NHListHeader: { screen: routerConf.NHListHeader },
    NHListIcon: { screen: routerConf.NHListIcon },
    NHListAvatar: { screen: routerConf.NHListAvatar },
    NHListThumbnail: { screen: routerConf.NHListThumbnail },
    NHListItemNoIndent: { screen: routerConf.NHListItemNoIndent },

    BasicListSwipe: { screen: routerConf.BasicListSwipe },
    SwipeRowCustomStyle: { screen: routerConf.SwipeRowCustomStyle },
    MultiListSwipe: { screen: routerConf.MultiListSwipe },

    RegularPicker: { screen: routerConf.RegularPicker },
    PickerWithIcon: { screen: routerConf.PickerWithIcon },
    PlaceholderPicker: { screen: routerConf.PlaceholderPicker },
    PlaceholderPickerNote: { screen: routerConf.PlaceholderPickerNote },
    BackButtonPicker: { screen: routerConf.BackButtonPicker },
    PickerTextItemText: { screen: routerConf.PickerTextItemText },
    HeaderPicker: { screen: routerConf.HeaderPicker },
    HeaderStylePicker: { screen: routerConf.HeaderStylePicker },
    CustomHeaderPicker: { screen: routerConf.CustomHeaderPicker },
    PickerWithIconStyle: { screen: routerConf.PickerWithIconStyle },

    NHCustomRadio: { screen: routerConf.NHCustomRadio },
    NHDefaultRadio: { screen: routerConf.NHDefaultRadio },

    BasicTab: { screen: routerConf.BasicTab },
    ConfigTab: { screen: routerConf.ConfigTab },
    ScrollableTab: { screen: routerConf.ScrollableTab },

    BasicSegment: { screen: routerConf.BasicSegment },
    AdvSegment: { screen: routerConf.AdvSegment },
    SegmentHeaderIcon: { screen: routerConf.SegmentHeaderIcon },

    BasicToast: { screen: routerConf.BasicToast },
    ToastDuration: { screen: routerConf.ToastDuration },
    ToastPosition: { screen: routerConf.ToastPosition },
    ToastType: { screen: routerConf.ToastType },
    ToastText: { screen: routerConf.ToastText },
    ToastButton: { screen: routerConf.ToastButton },

    RegularActionSheet: { screen: routerConf.RegularActionSheet },
    IconActionSheet: { screen: routerConf.IconActionSheet },

    AccordionDefault: { screen: routerConf.AccordionDefault },
    AccordionIcon: { screen: routerConf.AccordionIcon },
    AccordionIconStyle: { screen: routerConf.AccordionIconStyle },
    AccordionHeaderContentStyle: { screen: routerConf.AccordionHeaderContentStyle },
    AccordionCustomHeaderContent: { screen: routerConf.AccordionCustomHeaderContent }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default AppNavigator;
