import { DrawerNavigator } from 'react-navigation'
import drawerContentComponentsTeacher from './drawerContentComponentsTeacher';
import AppStackTeacher from './appNavigationTeacher';

export default DrawerNavigator({
    AppStackTeacher: {screen: AppStackTeacher}

},{
    contentComponent: drawerContentComponentsTeacher
},
)

