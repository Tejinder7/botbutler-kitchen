import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../db.service';
import { getFirestore, collection, addDoc, getDocs, doc, Timestamp, deleteDoc, setDoc} from '@firebase/firestore/lite'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file: any;
  providersList : any;

  constructor(private db: DbService, private route: ActivatedRoute) {
    this.fetchProviders();
   }

  ngOnInit(): void {
  }

  async fetchProviders(){
    const firestoreDB = getFirestore(this.db.app);
    const ShowTables = collection(firestoreDB, 'restaurants/dish1/tables');
    const snapshots = await getDocs(ShowTables);
    
    this.providersList = snapshots.docs.map(
      doc => {
          const data = doc.data();
          data['docId'] = doc.id;
          return data;
      }
    );

}
}