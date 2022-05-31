import { TalkioForm } from '@/components/customer/CreateModal';

class FormsValidator {
  errors: string[] = [];

  validate = (form: TalkioForm) => {
    if (form.name === '') {
      throw new Error('`name` field is empty');
    }
    if (form.email === '') {
      throw new Error('`email` field is empty');
    }
  };
}

export default FormsValidator;
