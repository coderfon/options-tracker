import OptionsList from '../../components/options/options-list/options-list.component'



const Home = () => {

    return (
        <div>
            <h1>This is the Home Page</h1>
            <OptionsList></OptionsList>

            <h2>TO DO</h2>
            <ul>
                <li>Import css</li>
                <li>Bell icon alarm to inform that export is needed</li>
            </ul>
        </div>       
    );
}

export default Home;