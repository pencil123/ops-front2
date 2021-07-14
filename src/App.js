import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import 'antd/dist/antd.less';
import './assets/common.less';
function App() {
  return (
      <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
      </BrowserRouter>
  );
}

export default App;
