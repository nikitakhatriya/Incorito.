import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ApplicationProvider, Icon, Layout, Text, BottomNavigation, BottomNavigationTab, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// Import all screens required here:

//Authentication
import SignUp from '../Screens/Authentication/Signup'
import Loading from '../Screens/Authentication/Loading'

// Home
import HomeScreen from '../Screens/Home/Main';
import AnnouncementScreen from '../Screens/Home/Announcements';
import Meeting from '../Screens/Home/Add_meeting';

//Calendar
import CalendarScreen from '../Screens/Calendar/Main';

//plus
import plus from '../Screens/Calendar/plus'

//Discussion
import DiscussionScreen from '../Screens/Discussion/Main';
import PostScreen from '../Screens/Discussion/Post';
import AddPostScreen from '../Screens/Discussion/Addpost';


//ContactUs
import ContactUs from '../Screens/ContactUs/Main';
import ContactUs1 from '../Screens/ContactUs/Post';

//Todo
import TodoScreen from '../Screens/Todo/Main.js';

const Navigator = () => (
  <React.Fragment>
  <IconRegistry icons={EvaIconsPack} />
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <AppNavigator />
  </ApplicationProvider>
  </React.Fragment>
);

// const OrdersScreen = () => (
//   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text category='h1'>ORDERS</Text>
//   </Layout>
// );

// Home Screen Stack /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const HomeStack = createStackNavigator({First: { screen: HomeScreen}, Second: { screen: AnnouncementScreen } , Third : { screen: Meeting }});

// Discussion Screen Stack /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const DiscussionStack = createStackNavigator({ First: { screen: DiscussionScreen}, Second: { screen: PostScreen }, Third : { screen: AddPostScreen } });

// Calendar Screen Stack //////////////////////////////////////////////////////////////////////////////////////////////////////////////

const CalendarStack = createStackNavigator({ First: { screen: CalendarScreen }, Second: { screen: plus }});

// Calendar Screen Stack //////////////////////////////////////////////////////////////////////////////////////////////////////////////
const TodoStack = createStackNavigator({ First: { screen: TodoScreen } });

// Bottom Navigation //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Contact = createStackNavigator({First: {screen: ContactUs}, Second : {screen:ContactUs1} });

const HomeIcon = (style) => (
  <Icon {...style} name='home-outline' />
);

const AgendaIcon = (style) => (
  <Icon {...style} name='checkmark-square-outline' />
);

const CalendarIcon = (style) => (
  <Icon {...style} name='calendar-outline' />
);

const DiscussionIcon = (style) => (
  <Icon {...style} name='message-circle-outline' />
);

const ContactIcon = (style) => (
  <Icon {...style} name='people-outline' />
);

const TabBarComponent = ({ navigation }) => {

  const onSelect = (index) => {
    const selectedTabRoute = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
  };

  return (
    <Layout>

     <BottomNavigation selectedIndex={navigation.state.index} onSelect={onSelect}>
        <BottomNavigationTab icon={HomeIcon}/>
        <BottomNavigationTab icon={AgendaIcon}/>
        <BottomNavigationTab icon={CalendarIcon}/>
        <BottomNavigationTab icon={DiscussionIcon}/>
        <BottomNavigationTab icon={ContactIcon}/>
      </BottomNavigation>

    </Layout>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});


const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Agenda: TodoStack,
  Calendar: CalendarStack,
  Discussion: DiscussionStack,
  ContactUs: Contact,
}, {
  tabBarComponent: TabBarComponent,
});

// Root Switch Login //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const MainNav = createSwitchNavigator(
  {
    Loading,
    SignUp,
    TabNavigator
  },
  {
    initialRouteName: 'Loading'
  }
);

export const AppNavigator = createAppContainer(MainNav);

export default Navigator;