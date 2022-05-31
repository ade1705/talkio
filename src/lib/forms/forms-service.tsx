import {
  addDoc,
  collection,
  DocumentData,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
} from '@firebase/firestore';

import {
  FormStatus,
  FormType,
  TalkioForm,
} from '@/components/customer/CreateModal';

class FormsService {
  private db: Firestore;

  private collection = 'forms';

  constructor(db: Firestore) {
    this.db = db;
  }

  public save = async (form: TalkioForm): Promise<void> => {
    await addDoc(collection(this.db, this.collection), form);
  };

  public get = async (
    page: number,
    limitValue = 10,
    forms: TalkioForm[] = []
  ): Promise<TalkioForm[]> => {
    const querySnapshot = await getDocs(
      query(
        collection(this.db, this.collection),
        orderBy('dateCreated'),
        limit(limitValue)
      )
    );
    querySnapshot.forEach((doc) => forms.push(this.hydrateForm(doc.data())));
    return forms;
  };

  private hydrateForm = (doc: DocumentData): TalkioForm => ({
    userId: doc?.userId ?? '',
    name: doc?.name ?? '',
    email: doc?.email ?? '',
    status: doc?.status ?? FormStatus.DISABLED,
    type: doc?.userId ?? FormType.POPUP,
    dateCreated: doc?.dateCreated ?? 0,
  });
}

export default FormsService;
