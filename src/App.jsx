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

  const [activeMenu, setActiveMenu] = useState("daftar");

  const renderContent = () => {
    switch (activeMenu) {
      case "daftar":
        return (
          <section className="card">
            <h2>Daftar Hewan</h2>

            <div className="button-group">
              <button onClick={addNewPet}>Tambah Hewan Baru</button>
              <button style={{ marginLeft: "10px" }} onClick={updatePersiaCat}>Ganti Jenis Kucing</button>
            </div>

            <ul className="pet-list">
              {pets.map((pet) => (
                <li key={pet.id} className="pet-item">
                  <div className="pet-title">
                    {pet.nama} ({pet.jenis})
                  </div>
                  <div className="pet-meta">
                    <div><strong>Ras:</strong> {pet.ras}</div>
                    <div><strong>Karakteristik:</strong> {pet.karakteristik}</div>
                    <div><strong>Kesayangan:</strong> {pet.kesayangan ? "Ya" : "Tidak"}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );

      case "favorit":
        return (
          <section className="card">
            <h2>Hewan Kesayangan</h2>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending (A-Z)</option>
              <option value="desc">Descending (Z-A)</option>
            </select>

            <ul>
              {getFavoritePets().map((pet) => (
                <li key={pet.id}>
                  {pet.nama} ({pet.jenis})
                </li>
              ))}
            </ul>
          </section>
        );

      case "jumlah":
        return (
          <section className="card">
            <h2>Jumlah Hewan Berdasarkan Jenis</h2>
            <ul>
              {Object.entries(getPetCountByType()).map(([jenis, jumlah]) => (
                <li key={jenis}>
                  {jenis}: {jumlah}
                </li>
              ))}
            </ul>
          </section>
        );

      case "palindrome":
        return (
          <section className="card">
            <h2>Nama Hewan Palindrome</h2>
            {getPalindromePets().length === 0 ? (
              <p>Tidak ada nama hewan palindrome</p>
            ) : (
              <ul>
                {getPalindromePets().map((pet) => (
                  <li key={pet.nama}>
                    {pet.nama} — Panjang Nama: {pet.panjangNama}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );

      case "genap":
        return (
          <section className="card">
            <h2>Bilangan Genap</h2>
            <p>{getEvenNumbers(numbers).join(", ")}</p>
            <p>Total: {sumEvenNumbers(numbers)}</p>
          </section>
        );

      case "anagram":
        return (
          <section className="card">
            <h2>Cek Anagram</h2>
            <input
              placeholder="Kata Pertama"
              value={firstWord}
              onChange={(e) => setFirstWord(e.target.value)}
            />
            <input
              placeholder="Kata Kedua"
              value={secondWord}
              onChange={(e) => setSecondWord(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
            <p>
              Hasil:{" "}
              {firstWord && secondWord
                ? isAnagram(firstWord, secondWord)
                  ? "Anagram"
                  : "Bukan Anagram"
                : "-"}
            </p>
          </section>
        );

      case "json":
        return (
          <section className="card">
            <h2>JSON Formatter Result</h2>
            <pre className="json-box">
              {JSON.stringify(formattedJson, null, 2)}
            </pre>
          </section>
        );

      default:
        return null;
    }
  }

  return(
    
    <div className='container'>
      <header className='header'>
        <h1>Tes Front End Developer</h1>
        <p>Data Hewan Peliharaan Esa</p>

        <hr />
      </header>

      <nav className="menu-horizontal">
        {[
          ["daftar", "Daftar Hewan"],
          ["favorit", "Hewan Kesayangan"],
          ["jumlah", "Jumlah per Jenis"],
          ["palindrome", "Nama Palindrome"],
          ["genap", "Bilangan Genap"],
          ["anagram", "Cek Anagram"],
          ["json", "JSON Formatter"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={activeMenu === key ? "active" : ""}
            onClick={() => setActiveMenu(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {renderContent()}

    </div>
  );
}

export default App



{/* <section className='card'>
        <h2>Daftar Hewan</h2>

        <div>
          <button className='button' onClick={addNewPet} style={{ marginBottom: "16px" }}>
            Tambah Hewan Baru
          </button>

          <button className='button' onClick={updatePersiaCat} style={{ marginBottom: "16px", marginLeft: "10px" }}>
            Ganti Jenis Kucing
          </button>
        </div>

        <ul className="pet-list">
          {pets.map((pet) => (
            <li key={pet.id} className="pet-item">
              <div className="pet-title">
                {pet.nama} ({pet.jenis})
              </div>

              <div className="pet-meta">
                <div><strong>Ras:</strong> {pet.ras}</div>
                <div><strong>Karakteristik:</strong> {pet.karakteristik}</div>
                <div><strong>Kesayangan:</strong> {pet.kesayangan ? "Ya" : "Tidak"}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className='card'>
        <div style={{ marginBottom: "16px" }}>
            <label>Urutkan Hewan Kesayangan:</label>
            <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}>

              <option value="asc">Ascending (A-Z)</option>
              <option value="desc">Descending (Z-A)</option>

            </select>
          </div>

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
      </section>

      <section className='card'>
        <h2>Bilangan Genap</h2>

        <p>
          Bilangan Genap: {getEvenNumbers(numbers).join(", ")}
        </p>

        <p>
          Total Bilangan Genap: {sumEvenNumbers(numbers)}
        </p>

        <h2>Cek Anagram</h2>
        <div style={{ marginBottom: "8px" }}>
          <input type="text" placeholder='Kata Pertama' value={firstWord} onChange={(e) => setFirstWord(e.target.value)} />
          <input type="text" placeholder='Kata Kedua' value={secondWord} onChange={(e) => setSecondWord(e.target.value)} 
          style={{ marginLeft: "10px" }}/>
        </div>

        <p>
          Hasil:{" "}
          {firstWord && secondWord ? isAnagram(firstWord, secondWord)
            ? "Anagram": "Bukan Anagram": "_"}
        </p>    
      </section>

      <section className='card'>
        <h2>JSON Formatter Result</h2>

        <pre style={{ background: "#ffffffff", padding: "16px", color: "#000", overflow: "auto" }}>
          {JSON.stringify(formattedJson, null, 2)}
        </pre>
      </section> */}

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