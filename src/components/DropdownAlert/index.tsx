import React, { createContext } from 'react';
import DropdownAlert, {DropdownAlertType} from "react-native-dropdownalert";

export const DropdownAlertContext = createContext({
  showAlert: (info: infoType) => {}
})
export const DropdownAlertConsumer = DropdownAlertContext.Consumer

export function withDropdownAlert(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <DropdownAlertConsumer>
          {
            ({ showAlert }) => {
              return <WrappedComponent {...this.props} showAlert={showAlert} />;
            }
          }
        </DropdownAlertConsumer>
      </>
    }
  }
}

type infoType = {
  type: DropdownAlertType,
  title: string,
  message: string,
  payload?: object,
  interval?: number,
}

class DropdownAlertProvider extends React.Component<{}> {

  constructor(props: {}) {
    super(props);
  }

  showAlert = (info: infoType) => {
    this.dropDownAlertRef.alertWithType(info.type, info.title, info.message)
  }

  render() {
    return (
      <DropdownAlertContext.Provider value={{
        showAlert: this.showAlert
      }}>
        {this.props.children}
        <DropdownAlert closeInterval={1000} useNativeDriver wrapperStyle={{ zIndex: 99999, elevation: 99999 }} ref={ref => this.dropDownAlertRef = ref} />
      </DropdownAlertContext.Provider>
    );
  }
}

export default DropdownAlertProvider
