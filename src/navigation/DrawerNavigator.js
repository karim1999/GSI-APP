import { DrawerNavigator } from 'react-navigation'
import drawerContentComponents from './drawerContentComponents ';
import AppStackStudent from './appNavigationStudent';

export default DrawerNavigator({
    AppStackStudent: {screen: AppStackStudent}

},{
    contentComponent: drawerContentComponents
},
)

