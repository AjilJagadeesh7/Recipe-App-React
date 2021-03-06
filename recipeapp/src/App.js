import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = 'c5344576';
  const APP_KEY = 'a73b4d8f6cc9d7942748a775780a8554';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] =useState("");

  useEffect(()=>{
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
  }

  return(
    <div className="App">

      <form className="search-form" onSubmit= {getSearch}>
        <input type="text" className="search-bar" value={search}
        onChange={updateSearch}/>
        <button type="submit" className="search-button">Search</button>
      </form>
      
      <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe 
          key = {recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          url={recipe.recipe.url}/>
        ))}
      </div>
      
    </div>
  );
}

export default App;
