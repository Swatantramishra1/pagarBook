import { BodyComponent } from './components/body/body.component';
import { MenuComponent } from './components/menu/menu.component';
import './App.css';

function App() {
  return (
    <div className="container">
      <MenuComponent></MenuComponent>
      <BodyComponent></BodyComponent>
    </div>
  );
}

export default App;
