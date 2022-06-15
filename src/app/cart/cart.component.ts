import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../db.service';
import { getFirestore, collection, addDoc, getDocs, doc, Timestamp, deleteDoc, setDoc} from '@firebase/firestore/lite'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  file: any;
  packagesList : any;

  constructor(private db: DbService, private route: ActivatedRoute) {
    this.fetchPackages(route)
   }

  providerId: String = "";
  providerName:String = "";

  action: String = "";
  packagesData: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.providerId = params['id'];
      this.providerName = params['name'];
     });
  }

  async fetchPackages(route: ActivatedRoute){
    
    this.route.queryParams.subscribe(params => {
      this.providerId = params['id'];
      this.providerName = params['name'];
     });
    console.log(this.providerId);
    console.log('restaurants/dish1/tables'+this.providerId+'/cart');
    

    const firestoreDB = getFirestore(this.db.app);
    const ShowPackages = collection(firestoreDB, 'restaurants/dish1/tables/'+this.providerId+'/cart');
    const snapshots = await getDocs(ShowPackages);
    
    this.packagesList = snapshots.docs.map(
      doc => {
          const data = doc.data();
          data['docId'] = doc.id;
          return data;
      }
    );

}
}
