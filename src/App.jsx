import { useState } from 'react'
import {isPalindrome} from './utils/palindrome'
import { getEvenNumbers, sumEvenNumbers } from './utils/evenNumber'
import { isAnagram } from './utils/anagram'
import { formatJsonData } from './utils/jsonFormatter'
import caseData from './assets/json/case.json'
import initialPets from './data/initialPets'
import './App.css'

function App() {
  const [pets, setPets] = useState(initialPets);
  const [sortOrder, setSortOrder] = useState("asc");
  const numbers = [15, 18, 3, 9, 6, 2, 12, 14];
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");

  const formattedJson = formatJsonData(caseData);

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

  const updatePersiaCat = () => {
    setPets((prevPets) => 
      prevPets.map((pet) =>
        pet.jenis === "Kucing" && pet.ras === "Persia" ? {...pet, ras: "Maine Coon"} : pet
      )
    )
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

  const getPetCountByType = () => {
    return pets.reduce((acc, pet) => {
      acc[pet.jenis] = (acc[pet.jenis] || 0) + 1;
      return acc;
    }, {})
  }

  const getPalindromePets = () => {
    return pets
      .filter((pet) => isPalindrome(pet.nama))
      .map((pet) => ({
        nama: pet.nama,
        panjangNama: pet.nama.length
      }));
  }

  return(
    <div style={{ padding: '24px' }}>
      <h1>Tes Front End Developer</h1>
      <p>Data Hewan Peliharaan Esa</p>

      <hr />

      <button onClick={addNewPet} style={{ marginBottom: "16px" }}>
        Tambah Hewan Baru
      </button>

      <button onClick={updatePersiaCat} style={{ marginBottom: "16px", marginLeft: "10px" }}>
        Ganti Jenis Kucing
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

      <h2>Jumlah Hewan Berdasarkan Jenis</h2>

      <ul>
        {Object.entries(getPetCountByType()).map(([jenis, jumlah]) => (
          <li key={jenis}>
            {jenis}: {jumlah}
          </li>
        ))}
      </ul>

      <h2>Hewan dengan nama palindrome</h2>

      {getPalindromePets().length === 0 ? (
        <p>Tidak ada nama hewan palindrome</p>
      ) : (
        <ul>
          {getPalindromePets().map((pet) => (
            <li key={pet.nama}>
              {pet.nama} - Panjang Nama: {pet.panjangNama}
            </li>
          ))}
        </ul>
      )}

      <h2>Bilangan Genap</h2>

      <p>
        Bilangan Genap: {getEvenNumbers(numbers).join(", ")}
      </p>

      <p>
        Total Bilangan Genap: {sumEvenNumbers(numbers)}
      </p>

      <h2>Cek Anagram</h2>

      <input type="text" placeholder='Kata Pertama' value={firstWord} onChange={(e) => setFirstWord(e.target.value)} />
      <input type="text" placeholder='Kata Kedua' value={secondWord} onChange={(e) => setSecondWord(e.target.value)} 
      style={{ marginLeft: "10px" }}/>

      <p>
        Hasil:{" "}
        {firstWord && secondWord ? isAnagram(firstWord, secondWord)
          ? "Anagram": "Bukan Anagram": "_"}
      </p>

      <h2>JSON Formatter Result</h2>

      <pre style={{ background: "#929191ff", padding: "16px" }}>
        {JSON.stringify(formattedJson, null, 2)}
      </pre>

    </div>
  );
}

export default App



// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

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