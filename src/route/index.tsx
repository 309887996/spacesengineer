import Three from "../pages/three";
import LearnNode from "../pages/learnNode"
import Home from "../pages/home"

export default [
  {
    path: '/', component: () => <Home />, name: 'home'
  },
  {
    path: '/three', component: () => <Three />, name: 'three'
  },
  {
    path: '/learnnode', component: () => <LearnNode />, name: 'learnNode'
  }
]