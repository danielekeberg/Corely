import Header from "../Header";
import Section from "../Section";
// import Contact from "../Contact";
import ContactForm from "../ContactForm";

function App() {
    return (
        <div>
            <Header />
            <Section title="Contact" desc="Have a question or need help? We're here to assist you." />
            {/* <Contact /> */}
            <ContactForm />
        </div>
    )
}

export default App;