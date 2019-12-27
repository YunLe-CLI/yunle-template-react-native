import React, { createContext } from 'react';
import DropdownAlert from "react-native-dropdownalert";

export const DropdownAlertContext = createContext({
  handleCheck: () => {}
})
export const DropdownAlertConsumer = DropdownAlertContext.Consumer

class DropdownAlertProvider extends React.Component<{}> {

  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <DropdownAlertContext.Provider value={{
        handleCheck: async () => {  }
      }}>
        {this.props.children}
        <DropdownAlert closeInterval={1000} useNativeDriver wrapperStyle={{ zIndex: 99999 }} ref={ref => this.dropDownAlertRef = ref} />
      </DropdownAlertContext.Provider>
    );
  }
}

export default DropdownAlertProvider
