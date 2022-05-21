import { addDoc, collection, Firestore } from '@firebase/firestore';

import { Form } from '@/components/customer/CreateModal';

class FormsService {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  public save = async (form: Form): Promise<void> => {
    await addDoc(collection(this.db, 'forms'), form);
  };

  public get = async (form: Form): Promise<void> => {
    await addDoc(collection(this.db, 'forms'), form);
  };
}

export default FormsService;
