import './globals.css'
import Header from './Header.tsx';
import Section from './Section.tsx';
import SearchAndSort from './SearchAndSort.tsx';
import Products from './Products.tsx';

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