import './globals.css'
import Header from './Header';
import Section from './Section';
import SearchAndSort from './SearchAndSort';
import Products from './Products';

function App() {

  return (
    <>
      <Header />
      <Section title="Welcome to Corely" desc="Discover premium features and services tailored for your needs." />
      <SearchAndSort />
      <Products />
    </>
  )
}

export default App