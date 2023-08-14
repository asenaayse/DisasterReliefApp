import React, {useEffect, useState} from 'react'
import CaseStudyScreenUI from './CaseStudyScreenUI';
import { useNavigation } from '@react-navigation/core';
import { db } from '../../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const CaseStudyScreen = () => {
    const [N, setNorth] = useState('');
    const [S, setSouth] = useState('');
    const [W, setWest] = useState('');
    const [E, setEast] = useState('');
    const [areaNeeds, setAreaNeeds] = useState([]);

    const clickGetNeeds = async () => {
        console.log('N:', N);
        console.log('S:', S);
        console.log('W:', W);
        console.log('E:', E);

        try {
            //const collectionRef = db.collection('needs');
            const collectionRef = getDocs(collection(db, 'needs'));
            // get needs only between the given coordinates
            const querySnapshot = await collectionRef
            // Maraş case: N: 39, S: 36, W:35, E:40.5
                .where('lang', '>=', parseFloat(S)) 
                .where('lang', '<=', parseFloat(N))
                .where('ltd', '>=', parseFloat(W)) 
                .where('ltd', '<=', parseFloat(E))
                .get();
            // needs we fetched / get
            const fetchedNeeds = [];
            querySnapshot.forEach((doc) => {
                const itemData = doc.data();
                console.log('Fetched Item:', itemData);
                fetchedNeeds.push(itemData);
            });
            //set the variable with our fetched data
            setAreaNeeds(fetchedNeeds);

        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    return (
      <CaseStudyScreenUI 
      setNorth = {setNorth}
      setSouth = {setSouth}
      setWest  = {setWest}
      setEast  = {setEast}
      clickGetNeeds = {clickGetNeeds}
      areaNeeds={areaNeeds}
      />
    )
}

export default CaseStudyScreen