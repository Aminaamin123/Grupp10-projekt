import './App.css';
import Search from './Search';
import Footer from './Footer';
const minHeight="500px";

function App() {
  return (
    <div>
      <div class="container" style={{minHeight: minHeight}}>
      <h1 className="display-4 fw-normal" >Correspondre</h1>
      <p> Welcome, here you can search for song lyric and get songs that includes the lyric previewed & and a direct link to the album on spotify.  </p>
      <Search/>
      </div>
      <Footer/> 
    </div>
  );
}

export default App;
