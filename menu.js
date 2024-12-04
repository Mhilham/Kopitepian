import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCksetmQe_ec2BH6g5MKqQU_1K1U6htmww",
  authDomain: "data-7d32f.firebaseapp.com",
  projectId: "data-7d32f",
  storageBucket: "data-7d32f.appspot.com",
  messagingSenderId: "156748846014",
  appId: "1:156748846014:web:4269883b14bdb400b2dfef",
  measurementId: "G-W3SBB85TF1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftarmenu() {
  const refDokumen = collection(db, "Menu");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikankueri.forEach((dok) => {
    hasil.push({ 
      id: dok.id, 
      nama: dok.data().nama,
      harga:dok.data().harga,
      });
  });
  
  return hasil;
}



export async function tambahmenu( nama, harga ) {
  try {
    const dokRef = await addDoc(collection(db, 'Menu'), {
     nama:nama,
     harga:harga,
    });
    console.log('berhasil menembah menu ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah menu ' + e);
  }
}


export async function hapusmenu(docId) {
  await deleteDoc(doc(db, "Menu", docId));
}

export async function ubahmenu(docId, nama, harga) {
  await updateDoc(doc(db, "Menu", docId), {
    nama: nama,
    harga: harga,
  });
}

export async function ambilmenu(docId) {
  const docRef = await doc(db, "Menu", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
