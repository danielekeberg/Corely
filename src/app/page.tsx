import './globals.css'
import Header from './Header';
import Section from './Section';
import Products from './Products';

function App() {

  return (
    <>
      <Header />
      <Section title="Welcome to Corely" desc="Discover premium features and services tailored for your needs." />
      <Products />
    </>
  )
}

export default App