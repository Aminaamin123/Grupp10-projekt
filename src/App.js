import './App.css';
import Search from './Search';
import Footer from './Footer';
import logo from './logo.png';
const minHeight="500px";
const widthImg = "350px"
function App() {
  return (
    <div> 
      <div class="container text-center" style={{minHeight: minHeight}}>
      <img className="img-fluid" style={{width: widthImg}} src={logo}/>
      <p> Welcome, here you can search for song lyric and get songs that includes the lyric previewed & and a direct link to the album on spotify.  </p>
      <Search/>
      </div>
      <Footer/> 
    </div>
  );
}

export default App;
