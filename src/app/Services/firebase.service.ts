import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore, public auth: AngularFireAuthModule) {}


  generateId(): string {
    return this.firestore.createId()
  }

  getItem(collectionPath: string, docId: string): Observable<any> {
    return this.firestore.collection(collectionPath).doc(docId).valueChanges()
  }

  getItems(collectionPath: string): Observable<any[]> {
    return this.firestore.collection(collectionPath).valueChanges();
  }

  addItem(collectionPath: string, item: any, documentId?: string): Promise<unknown> {
    if (documentId) {
      // If a custom document ID is provided, use it
      return this.firestore.collection(collectionPath).doc(documentId).set(item);
    } else {
      // If no custom document ID is provided, Firestore will generate one
      return this.firestore.collection(collectionPath).add(item);
    }
  }

  updateItem(collectionPath: string, id: string, updatedData: any): Promise<void> {
    return this.firestore.collection(collectionPath).doc(id).update(updatedData);
  }

  deleteItem(collectionPath: string, id: string): Promise<void> {
    return this.firestore.collection(collectionPath).doc(id).delete();
  }
  
}

