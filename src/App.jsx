import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import initialPets from './data/initialPets'
import './App.css'

function App() {
  const [pets, setPets] = useState(initialPets);
  const [sortOrder, setSortOrder] = useState("asc");

  const addNewPet = () => {
    const newPet = {
      id: pets.length + 1,
      jenis: "Badak",
      ras: "Badak Jawa",
      nama: "Rino",
      karakteristik: "Pekerja Keras",
      kesayangan: true
    };

    setPets((prevPets) => [...prevPets, newPet]);
  }

  const getFavoritePets = () => {
    const favorites = pets.filter((pet) => pet.kesayangan);

    return favorites.sort((a,b) => {
      if (sortOrder === "asc") {
        return a.nama.localeCompare(b.nama);
      }
        return b.nama.localeCompare(a.nama);
    });
    
  };

  return(
    <div style={{ padding: '24px' }}>
      <h1>Tes Front End Developer</h1>
      <p>Data Hewan Peliharaan Esa</p>

      <hr />

      <button onClick={addNewPet} style={{ marginBottom: "16px" }}>
        Tambah Hewan Baru
      </button>

      <div style={{ marginBottom: "16px" }}>
        <label>Urutkan Hewan Kesayangan:</label>
        <select 
        value={sortOrder} 
        onChange={(e) => setSortOrder(e.target.value)}>

          <option value="asc">Ascending (A-Z)</option>
          <option value="desc">Descending (Z-A)</option>

        </select>
      </div>

      <h2>Daftar Hewan</h2>

      <ul>
        {pets.map((pet) =>(
          <li key={pet.id} style={{ marginBottom: "12px" }}>
            <strong>{pet.nama}</strong> ({pet.jenis})<br/>
            Ras: {pet.ras}<br/>
            Karakteristik: {pet.karakteristik}<br/>
            Kesayangan: {pet.kesayangan ? "Ya" : "Tidak"}

          </li>
        ))}
      </ul>

      <h2>Hewan Kesayangan Esa</h2>

      <ul>
        {getFavoritePets().map((pet) => (
          <li key={pet.id}>
            {pet.nama} ({pet.jenis})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

// const [count, setCount] = useState(0)

// return (
//   <>
//     <div>
//       <a href="https://vite.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.jsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )