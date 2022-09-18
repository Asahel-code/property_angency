import Cards from "../../components/Cards"
import ContactButtonSection from "../../components/ContactButtonSection"
import Search from "../../components/Search"

const Home = () => {
    return (
        <div>
            <Search />
            <Cards />
            <div className="m-4">
                <ContactButtonSection />
            </div>
        </div>
    )
}

export default Home