import { useState } from "react";
import './style/Starwars.css'
function Starwars() {
    const [id, setID] = useState()
    const [data, setData] = useState(null)
    const [list, setList] = useState([])
    const charList = list.map(char => {
        return(
            <div className='charCard'>
                <div>
                    <h2>Character Details</h2>
                    <div>Name: {char.name}</div>
                    <div>Year: {char.birth_year}</div>
                    <div>Height: {char.height}</div>
                    <div>Gender: {char.gender}</div>
                    <div>Eye Color: {char.eye_color}</div>
                </div>
                <div>
                    <h2>Homeworld Details</h2>
                    <div>Planet: {char.homeworld.name}</div>
                    <div>Climate: {char.homeworld.climate}</div>
                </div>
                <div>
                    <h2>Films</h2>
                    {char.films.map(film => {
                        return(
                            <div>
                                {film.title}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    })
    return (
        <div className='content'>
            <div className='interactable'>
                <div className='input'>
                    <input type='text' placeholder='Character ID'onChange={e => {
                        setID(e.target.value)
                    }}></input>
                    <button onClick={e => {
                        fetchData(id)
                    }}>Enter</button>
                </div>
                <div className='data'>
                    {data && 
                        <div>
                            <div>
                                <h2>Character Details</h2>
                                <div>Name: {data.name}</div>
                                <div>Year: {data.birth_year}</div>
                                <div>Height: {data.height}</div>
                                <div>Gender: {data.gender}</div>
                                <div>Eye Color: {data.eye_color}</div>
                            </div>
                            <div>
                                <h2>Homeworld Details</h2>
                                <div>Planet: {data.homeworld.name}</div>
                                <div>Climate: {data.homeworld.climate}</div>
                            </div>
                            <div>
                                <h2>Films</h2>
                                {data.films.map(film => {
                                    return(
                                        <div>
                                            {film.title}
                                        </div>
                                    )
                                })}
                            </div>
                            <button onClick={e => {
                                setList([...list, data])
                            }}>Save</button>
                        </div>
                    }
                </div>
            </div>
            <div className='charList'>
                {list && charList}
            </div>
      </div>
    );
    async function fetchData(id){
        const res = await fetch(`https://swapi.dev/api/people/${id}/`)
        const json = await res.json()
        if(!json.detail){
            const homeworldRes = await fetch(json.homeworld)
            const homeworldJson = await homeworldRes.json()
            const filmsRes = await Promise.all(json.films.map(film => fetch(film)))
            const filmsJSON = await Promise.all(filmsRes.map(res => res.json()))
            json.films = filmsJSON
            json.homeworld = homeworldJson
            setData(json)
        }
    }
  }
  
  export default Starwars;
  