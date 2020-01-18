import React from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Title,
  Right,
  Icon,
  Button,
  Input, CardItem, Card, FooterTab, Footer,
} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import {NavigationActions} from "react-navigation";
import {StatusBar} from 'react-native';
import {withSelectDateTimeModal} from '../../components/SelectTimeModal';
import {withAddressListModal} from '../../components/AddressListModal';
import moment from 'moment';

export interface IProps {

}
export interface IState {

}

@(connect() as any)
class Me extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  state = {
    name: '',
  }

  componentDidMount(): void {
    console.log('me componentDidMount')
  }

  render() {
    const { navigation, exams } = this.props;
    const { params = {} } = navigation.state;
    const { type } = params;
    return (
      <Container style={styles.container}>
        <Header noShadow style={{ borderBottomWidth: 0, backgroundColor: '#fff' }}>
          <Left>
            <Button
              transparent
              onPress={() => {
                const { dispatch } = this.props;
                dispatch(NavigationActions.back());
              }}
            >
              <Icon style={{ paddingHorizontal: 12, color: '#333333', fontSize: 26 }} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#333333' }}>{type}</Title>
          </Body>
          <Right />
        </Header>
        <StatusBar barStyle="dark-content" />
        <Content>
          <Card noShadow style={styles.formCard}>
            <CardItem style={styles.formItem}>
              <Text style={styles.formItemLabel}>会议名称</Text>
              <Input value={this.state.name} style={styles.ipt} placeholder="请输入" placeholderTextColor={"#9C9EB9"}
                     onChangeText={(value) => {
                       this.setState({
                         name: value,
                       })
                     }}
              />
              <Right>

              </Right>
            </CardItem>
            {
              type === '预约会议' ? <>
                <CardItem
                  button
                  onPress={() => {
                    this.props.handleShowSelectDateTimeModal((date) => {
                      this.setState({
                        startTime: date
                      })
                    })
                  }}
                  style={styles.formItem}>
                  <Text style={styles.formItemLabel}>开始时间</Text>
                  <Text style={[styles.ipt, this.state.startTime ? {}: {color: "#9C9EB9"}]}>
                    {this.state.startTime ? moment(this.state.startTime).format('YYYY-MM-DD HH:mm') : '请选择'}
                  </Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
                <CardItem
                  button
                  onPress={() => {
                    this.props.handleShowSelectDateTimeModal((date) => {
                      this.setState({
                        endTime: date
                      })
                    })
                  }}
                  style={styles.formItem}>
                  <Text style={styles.formItemLabel}>结束时间</Text>
                  <Text style={[styles.ipt, this.state.endTime ? {}: {color: "#9C9EB9"}]}>
                    {this.state.endTime ? moment(this.state.endTime).format('YYYY-MM-DD HH:mm') : '请选择'}
                  </Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
              </> : undefined
            }

            {
              type === '发起会议' ? <>
                <CardItem
                  onPress={() => {
                    this.props.handleShowSelectDateTimeModal((date) => {
                      this.setState({
                        startTime: date
                      })
                    })
                  }}
                  style={styles.formItem}>
                  <Text style={styles.formItemLabel}>开始时间</Text>
                  <Input value={this.state.会议时长} style={styles.ipt} placeholder="请输入" placeholderTextColor={"#9C9EB9"}
                         onChangeText={(value) => {
                           this.setState({
                             name: value,
                           })
                         }}
                  />
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Text style={[styles.formItemLabel, { minWidth: 0}]}>分钟</Text>
                  </View>
                </CardItem>
              </> : undefined
            }

            <CardItem
              button
              onPress={() => {
                this.props.handleShowAddressListModal((data) => {
                  this.setState({
                    person: data
                  })
                })
              }}
              style={styles.formItem}>
              <Text style={styles.formItemLabel}>选择参会人</Text>
              <Text style={[styles.ipt, this.state.person ? {}: {color: "#9C9EB9"}]}>
                {this.state.person ? person.join(',') : '请选择'}
              </Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
        </Content>
        <Footer style={styles.footerWrap}>
          <FooterTab style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button
              onPress={() => {
                this.setState({
                  active: 0,
                })
              }}
              full style={[styles.btnTab]}>
              <Text style={[styles.btnTabText]}>预约会议</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default withAddressListModal(withSelectDateTimeModal(Me));

