import './App.css';
import Search from './Search';
import Footer from './Footer';

function App() {
  return (
    <div class="container">
      <h1 className="display-4 fw-normal" >Correspondre</h1>
      <p> Welcome, here you can search for song lyric and get songs that includes the lyric previewed & and a direct link to the album on spotify.  </p>
      <Search/>
      <Footer/> 
    </div>
  );
}

export default App;
