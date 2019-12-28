import React, { createContext } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
export const LoadingSpinnerContext = createContext({
  showLoading: () => {},
  hiddenLoading: () => {}
})
export const LoadingSpinnerConsumer = LoadingSpinnerContext.Consumer

class LoadingSpinnerProvider extends React.Component<{}> {

  constructor(props: {}) {
    super(props);
  }

  state={
    spinner: false,
    spinnerText: 'loading...'
  }

  render() {
    return (
      <LoadingSpinnerContext.Provider value={{
        showLoading: async (text: string) => {
          this.setState({
            spinner: true,
            spinnerText: text || 'loading...',
          })
        },
        hiddenLoading: async () => {
          this.setState({
            spinner: false,
            spinnerText: 'loading...',
          })
        }
      }}>
        {this.props.children}
        <Spinner
            visible={this.state.spinner}
            textContent={this.state.spinnerText || 'Loading...'}
            textStyle={{ color: '#FFF' }}
        />
      </LoadingSpinnerContext.Provider>
    );
  }
}

export default LoadingSpinnerProvider