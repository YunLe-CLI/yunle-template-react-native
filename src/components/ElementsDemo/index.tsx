import React from 'react';
import {Image, ScrollView, Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { presetPrimaryColors, generate } from '@ant-design/colors';
import _ from 'lodash';
import {
    Theme,
    UpdateTheme,
    withTheme,
    Badge,
    Text,
    ThemeConsumer,
    Avatar,
    Button,
    Header,
    Divider,
    SocialIcon,
    ButtonGroup,
    CheckBox,
    Input,
    PricingCard,
    Rating, AirbnbRating,
    SearchBar,
    Slider,
    Tile,
    Tooltip,
    Card,
    ListItem,
} from 'react-native-elements';
import { NavigationActions } from "react-navigation";
import Modal from "react-native-modal";


export interface IProps {
    navigation: any;
    client: any;
    dispatch: Dispatch<{}>;
    handleChangeTheme: Function;
    theme: Theme;
    updateTheme: UpdateTheme;

}
class ElementsDemo extends React.Component<IProps> {
    state = {
        slider1ActiveSlide: 1,
        isModalVisible: false,
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    handleChangeTheme = (type: string) => {
        let themeColor: any = generate(presetPrimaryColors[type]);
        const theme = {
            colors: {
                primary: presetPrimaryColors[type],
                grey0: themeColor[0],
                grey1: themeColor[1],
                grey2: themeColor[2],
                grey3: themeColor[3],
                grey4: themeColor[4],
                grey5: themeColor[5],
                greyOutline: themeColor[6],
            },
            Button: {
                // titleStyle: {
                //     color: color.primary,
                // },
            },
            Text: {
                // style: [{
                //     color: color.primary,
                // }]
            }
        }
        this.props.handleChangeTheme(theme).then(() => {
            this.props.updateTheme(theme)
            this.toggleModal();
        })
    }

    renderDivider = () => {
        return (
            <ThemeConsumer>
                {({ theme }: any) => (
                    <Divider style={{ marginVertical: 10 }} />
                )}
            </ThemeConsumer>
        )
    }

    render() {
        const primary = _.get(this.props, 'theme.colors.primary', '#FF9800')
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<TouchableOpacity
                        style={{
                            paddingHorizontal: 15,
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            const { dispatch } = this.props;
                            dispatch(NavigationActions.back());
                        }}
                    >
                        <Icon name="angle-left" size={28} color="#fff" />
                    </TouchableOpacity>}
                    centerComponent={{ text: 'UI库主题', style: { color: '#fff' } }}
                    rightComponent={
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 15,
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this.toggleModal()
                            }}
                        >
                            <Icon name="cogs" size={18} color="#fff" />
                        </TouchableOpacity>
                    }
                />
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackButtonPress={() => {
                        this.setState({ isModalVisible: false });
                    }}
                    onBackdropPress={() => {
                        this.setState({ isModalVisible: false });
                    }}
                >
                    <View style={{
                        paddingVertical: 15,
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                    }}>
                        <View style={{
                            height: 400,
                        }}>
                            <View style={{ alignItems: 'center', paddingHorizontal: 15, }}>
                                <Text>切换主题</Text>
                            </View>
                            <Divider style={{ marginVertical: 15, }} />
                            <View style={{
                                flex: 1,
                            }}>
                                <ScrollView>
                                    <View style={{ paddingHorizontal: 15, }}>
                                        {
                                            Object.keys(presetPrimaryColors).map((item) => {
                                                return <Button
                                                    key={item}
                                                    buttonStyle={{
                                                        borderRadius: 0,
                                                        backgroundColor: presetPrimaryColors[item]
                                                    }}
                                                    title={item}
                                                    onPress={() =>this.handleChangeTheme(item)}
                                                />
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={styles.container}>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text>Avatar</Text>
                        {this.renderDivider()}
                        <Avatar
                            rounded
                            source={{
                                uri: 'https://picsum.photos/128/128',
                            }}
                        />
                        {this.renderDivider()}
                            <Text>Avatar</Text>
                        {this.renderDivider()}
                           <View>
                               <Badge value="99+" status="error" />
                               {this.renderDivider()}
                               <Badge value={<Text>My Custom Badge</Text>} />
                               {this.renderDivider()}
                               <Badge status="success" />
                               {this.renderDivider()}
                               <Badge status="error" />
                               {this.renderDivider()}
                               <Badge status="primary" />
                               {this.renderDivider()}
                               <Badge status="warning" />
                               {this.renderDivider()}
                               <View style={{ width: 60, }}>
                                   <Avatar
                                       rounded
                                       source={{
                                           uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                                       }}
                                       size="large"
                                   />

                                   <Badge
                                       status="success"
                                       containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                                   />
                               </View>
                           </View>
                        {this.renderDivider()}

                        <Text>Button</Text>
                        {this.renderDivider()}
                        <View>
                            {this.renderDivider()}
                            <Button
                                title="Solid Button"
                            />
                            {this.renderDivider()}
                            <Button
                                title="Outline button"
                                type="outline"
                            />
                            {this.renderDivider()}
                            <Button
                                title="Clear button"
                                type="clear"
                            />
                            {this.renderDivider()}
                            <Button
                                icon={
                                    <Icon
                                        name="arrow-right"
                                        size={15}
                                        color="white"
                                    />
                                }
                                title="Button with icon component"
                            />
                            {this.renderDivider()}
                            <Button
                                icon={{
                                    name: "arrow-right",
                                    size: 15,
                                    color: "white"
                                }}
                                title="Button with icon object"
                            />
                            {this.renderDivider()}
                            <Button
                                icon={
                                    <Icon
                                        name="arrow-right"
                                        size={15}
                                        color="white"
                                    />
                                }
                                iconRight
                                title="Button with right icon"
                            />
                            {this.renderDivider()}
                            <Button
                                title="Loading button"
                                loading
                            />
                        </View>
                        {this.renderDivider()}
                        <Text>ButtonGroup</Text>
                        {this.renderDivider()}
                        <View>
                            <ButtonGroup
                                buttons={['Hello', 'World', 'Buttons']}
                                containerStyle={{height: 50}}
                            />
                        </View>
                        {this.renderDivider()}
                        <View>
                            <Card title="CARD WITH DIVIDER">
                                {
                                    [
                                        {
                                            name: 'brynn',
                                            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
                                        }
                                    ].map((u, i) => {
                                        return (
                                            <View key={i}>
                                                <Image
                                                    style={styles.image}
                                                    resizeMode="cover"
                                                    source={{ uri: u.avatar }}
                                                />
                                                <Text>{u.name}</Text>
                                            </View>
                                        );
                                    })
                                }
                            </Card>
                        </View>

                        {this.renderDivider()}
                        <Text>CheckBox</Text>
                        {this.renderDivider()}
                        <View>
                            <CheckBox
                                title='Click Here'
                            />
                            {this.renderDivider()}
                            <CheckBox
                                center
                                title='Click Here'
                            />
                            {this.renderDivider()}
                            <CheckBox
                                center
                                title='Click Here'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                            />
                            {this.renderDivider()}
                            <CheckBox
                                center
                                title='Click Here to Remove This Item'
                                iconRight
                                iconType='material'
                                checkedIcon='clear'
                                uncheckedIcon='add'
                                checkedColor='red'
                            />
                        </View>
                        {this.renderDivider()}

                        <Text>Input</Text>
                        {this.renderDivider()}
                        <View>
                            <Input
                                placeholder='BASIC INPUT'
                            />

                            <Input
                                placeholder='INPUT WITH ICON'
                                leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                            />

                            <Input
                                placeholder='INPUT WITH CUSTOM ICON'
                                leftIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        color='black'
                                    />
                                }
                            />

                            <Input
                                placeholder='INPUT WITH SHAKING EFFECT'
                                shake={true}
                            />

                            <Input
                                placeholder='INPUT WITH ERROR MESSAGE'
                                errorStyle={{ color: 'red' }}
                                errorMessage='ENTER A VALID ERROR HERE'
                            />
                        </View>
                        {this.renderDivider()}
                        <Text>ListItem</Text>
                        {this.renderDivider()}
                        <View>
                            {
                                [
                                    {
                                        name: 'Amy Farha',
                                        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                        subtitle: 'Vice President'
                                    },
                                    {
                                        name: 'Chris Jackson',
                                        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                                        subtitle: 'Vice Chairman'
                                    },
                                ].map((l, i) => (
                                    <ListItem
                                        key={i}
                                        leftAvatar={{ source: { uri: l.avatar_url } }}
                                        title={l.name}
                                        subtitle={l.subtitle}
                                    />
                                ))
                            }
                        </View>
                        {this.renderDivider()}
                        <Text>PricingCard</Text>
                        {this.renderDivider()}
                        <View>
                            <PricingCard
                                color="#4f9deb"
                                title="Free"
                                price="$0"
                                info={['1 User', 'Basic Support', 'All Core Features']}
                                button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
                            />
                        </View>
                        {this.renderDivider()}
                        <Text>CheckBox</Text>
                        {this.renderDivider()}
                        <View>
                            <AirbnbRating />

                            <AirbnbRating
                                count={11}
                                reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                                defaultRating={11}
                                size={20}
                            />

                            <Rating
                                showRating
                                onFinishRating={this.ratingCompleted}
                                style={{ paddingVertical: 10 }}
                            />

                            <Rating
                                type='heart'
                                ratingCount={3}
                                imageSize={60}
                                showRating
                                onFinishRating={this.ratingCompleted}
                            />
                        </View>

                        {this.renderDivider()}
                        <Text>SearchBar</Text>
                        {this.renderDivider()}
                        <View>
                            <SearchBar
                                placeholder="Type Here..."
                            />
                        </View>
                        {this.renderDivider()}
                        <Text>Slider</Text>
                        {this.renderDivider()}
                        <View>
                            <Slider
                            />
                        </View>
                        {this.renderDivider()}
                        <Text>SocialIcon</Text>
                        {this.renderDivider()}
                        <View>
                            <SocialIcon
                                type='twitter'
                            />

                            <SocialIcon
                                raised={false}
                                type='gitlab'
                            />

                            <SocialIcon
                                light
                                type='medium'
                            />

                            <SocialIcon
                                light
                                raised={false}
                                type='medium'
                            />


                            <SocialIcon
                                title='Sign In With Facebook'
                                button
                                type='facebook'
                            />

                            <SocialIcon
                                title='Some Twitter Message'
                                button
                                type='twitter'
                            />

                            <SocialIcon
                                button
                                type='medium'
                            />

                            <SocialIcon
                                button
                                light
                                type='instagram'
                            />
                        </View>
                        {this.renderDivider()}
                        <Text>Text</Text>
                        {this.renderDivider()}
                        <View>
                            <Text h1>Heading 1</Text>
                            <Text h2>Heading 2</Text>
                            <Text h3>Heading 3</Text>
                            <Text h4>Heading 4</Text>
                        </View>
                        {this.renderDivider()}

                        <Text>Tile</Text>
                        {this.renderDivider()}
                        <View>
                            <Tile
                                imageSrc={{ uri: 'https://picsum.photos/740/300' }}
                                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                                featured
                                caption="Some Caption Text"
                            />
                        </View>
                        {this.renderDivider()}

                        <Text>Tooltip</Text>
                        {this.renderDivider()}
                        <View>
                            <Tooltip popover={<Text>Info here</Text>}>
                                <Text>Press me</Text>
                            </Tooltip>
                        </View>
                        {this.renderDivider()}
                        <Text>font Icon</Text>
                        <ThemeConsumer>
                            {({ theme }: any) => (
                                <Icon name="rocket" size={30} color={theme.colors.primary} />
                            )}
                        </ThemeConsumer>
                        {this.renderDivider()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
    return {
        dispatch,
        handleChangeTheme: (theme: {}) => dispatch({ type: 'app/changeTheme', payload: theme })
    }
},)(withTheme(withApollo(ElementsDemo)));


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  image: {
    height: Dimensions.get('window').width / (1125 / 1290),
  },
  text: {
    alignItems: 'center',
  },
  hero: {
    fontSize: 20,
    color: '#999',
  },
  appName: {
    padding: 15,
    fontSize: 40,
  },
  version: {
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    color: '#ccc',
  },
  progressWrap: {
    alignSelf: 'center',
  },
  progress: {
    alignSelf: 'center',
    marginBottom: 35,
    backgroundColor: '#e5e5e5',
  },
});
