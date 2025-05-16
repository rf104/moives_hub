
import './App.css'
import MovieCard from './components/MovieCard'
import SearchCard from './components/SearchCard'

function App() {
  

  return (
    <>
      <SearchCard/>
      <MovieCard movie = {{title:'Forest Gump',release_date:'2021', img:"https://images.pexels.com/photos/9807584/pexels-photo-9807584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}}/>
      <MovieCard movie = {{title:'Chernobyl',release_date:'2024', img:"https://images.pexels.com/photos/29097935/pexels-photo-29097935/free-photo-of-apocalyptic-scene-with-gas-mask-in-armenia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}}/>
      <MovieCard movie = {{title:'Sex Education',release_date:'2025', img:"https://images.pexels.com/photos/3979153/pexels-photo-3979153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}}/>
    </>
  )
}

// function Hello({name = 'rf'}){
//     return (
//       <>
//         <p>Welcome Back! {name}</p>
//       </>
//     )
// }

export default App
