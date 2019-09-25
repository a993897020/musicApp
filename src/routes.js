import Mine from './components/mine/Mine'
import Find from './components/find/Find'
import Cloud from './components/cloud/Cloud'
import Video from './components/video/Video'
import Transition from './components/transition/Transition'
import Login from './components/login/Login'
import Register from './components/register/Register'
import PhoneLogin from './components/login/phoneLogin/PhoneLogin'
import PhoneRegister from './components/register/phoneRegister/PhoneRegister'
import EveryDaySong from './components/find/everyDaySong/EveryDaySong'

export const routes=[
    {path:'/',name:'transitionLink',component:Transition},
    {path:'/login',name:'loginLink',component:Login},
    {path:'/phoneLogin',name:'phoneLoginLink',component:PhoneLogin},
    {path:'/register',name:'registerLink',component:Register},
    {path:'/phoneRegister',name:'phoneRegisterLink',component:PhoneRegister},
    {path:"/mine",name:"mineLink",component:Mine},
    {path:"/find",name:"findLink",component:Find},
    {path:"/cloud",name:"cloudLink",component:Cloud},
    {path:"/video",name:"videoLink",component:Video},
    {path:'/everyDaySong',name:'everyDaySong',component:EveryDaySong}

]