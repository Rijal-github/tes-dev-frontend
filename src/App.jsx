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

            <div className="table-wrapper">
              <table className="pet-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Hewan</th>
                    <th>Jenis</th>
                    <th>Ras Hewan</th>
                    <th>Karakteristik</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {pets.map((pet, index) => (
                    <tr key={pet.id}>
                      <td>{index + 1}</td>
                      <td>{pet.nama}</td>
                      <td>{pet.jenis}</td>
                      <td>{pet.ras}</td>
                      <td>{pet.karakteristik}</td>
                      {/* <td>{pet.kesayangan ? "Kesayangan" : "Biasa"}</td> */}
                      <td>
                        {pet.kesayangan ? (
                          <span className="badge-favorite">Kesayangan</span>
                        ) : (
                          <span className="badge-biasa">Biasa</span>
                          // "Biasa"
                        )}
                     </td>
                   </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

            <div className="table-wrapper">
              <table className="pet-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Hewan</th>
                    <th>Jenis</th>
                    <th>Ras Hewan</th>
                    <th>Karakteristik</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {getFavoritePets().map((pet, index) => (
                    <tr key={pet.id}>
                      <td>{index + 1}</td>
                      <td>{pet.nama}</td>
                      <td>{pet.jenis}</td>
                      <td>{pet.ras}</td>
                      <td>{pet.karakteristik}</td>
                      <td>
                        <span className="badge-favorite">Kesayangan</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );

        case "jumlah":
          return (
            <section className="card">
              <h2>Jumlah Hewan Berdasarkan Jenis</h2>

              <div className="table-wrapper">
                <table className="pet-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Jenis Hewan</th>
                      <th>Jumlah</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(getPetCountByType()).map(
                      ([jenis, jumlah], index) => (
                        <tr key={jenis}>
                          <td>{index + 1}</td>
                          <td>{jenis}</td>
                          <td>{jumlah}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          );

      case "palindrome":
        return (
          <section className="card">
            <h2>Nama Hewan Palindrome</h2>

            {getPalindromePets().length === 0 ? (
              <p>Tidak ada nama hewan palindrome</p>
            ) : (
              <div className="table-wrapper">
                <table className="pet-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Hewan</th>
                      <th>Panjang Nama</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getPalindromePets().map((pet, index) => (
                      <tr key={pet.nama}>
                        <td>{index + 1}</td>
                        <td>{pet.nama}</td>
                        <td>{pet.panjangNama}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

      // case "daftar":
      //   return (
      //     <section className="card">
      //       <h2>Daftar Hewan</h2>

      //       <div className="button-group">
      //         <button onClick={addNewPet}>Tambah Hewan Baru</button>
      //         <button style={{ marginLeft: "10px" }} onClick={updatePersiaCat}>Ganti Jenis Kucing</button>
      //       </div>

      //       <ul className="pet-list">
      //         {pets.map((pet) => (
      //           <li key={pet.id} className="pet-item">
      //             <div className="pet-title">
      //               {pet.nama} ({pet.jenis})
      //             </div>
      //             <div className="pet-meta">
      //               <div><strong>Ras:</strong> {pet.ras}</div>
      //               <div><strong>Karakteristik:</strong> {pet.karakteristik}</div>
      //               <div><strong>Kesayangan:</strong> {pet.kesayangan ? "Ya" : "Tidak"}</div>
      //             </div>
      //           </li>
      //         ))}
      //       </ul>
      //     </section>
      //   );