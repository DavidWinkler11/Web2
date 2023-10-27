import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const[CompetitorList, setCompetitorList] = useState([]);

  const competitorCollectionRef = collection(db, "Competitors");

  useEffect(() => {
  const getCompetitorList = async() => {
    try{
      const data = await getDocs(competitorCollectionRef);
      const filteredData = data.docs.map((doc) => ( {
        ...doc.data(),
        id: doc.id,
      }));
      filteredData.sort((a, b) => b.Points - a.Points);
      setCompetitorList(filteredData);
      console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getCompetitorList();
  }, [])
  return (
    <div className="App">
      <Auth/>
      <div>
        {CompetitorList.map((competitor) => (
          <div>
            <h1>{competitor.Name} : {competitor.Points}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
