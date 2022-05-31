import { ChatIcon } from '@heroicons/react/outline';
import * as dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import FormsService from '@/lib/forms/forms-service';

import CreateModal, {
  FormStatus,
  TalkioForm,
} from '@/components/customer/CreateModal';
import CustomerLayout from '@/components/layout/CustomerLayout';

import { db } from '../../../firebase-config';

const Forms = () => {
  const [forms, setForms] = useState([] as TalkioForm[]);
  useEffect(() => {
    const service = new FormsService(db);
    service.get(1).then((response) => setForms(response));
  }, []);
  return (
    <CustomerLayout>
      <div className='rounded-sm'>
        <div className='flex justify-between'>
          <div>
            <h4 className='font-medium'>Forms</h4>
            <p className='text-sm text-gray-500'>Forms built to receive data</p>
          </div>
          <div>
            <CreateModal />
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-2/3'>
            {forms.length > 0 && (
              <table className='mt-4 w-full text-left text-sm text-gray-500'>
                <tbody>
                  {forms.map((form, index) => (
                    <tr
                      className='cursor-pointer bg-white hover:bg-gray-50'
                      key={index}
                    >
                      <td className='py-4 px-3 '>
                        <div className='flex'>
                          <div>
                            <div className='rounded bg-amber-200 p-1'>
                              <ChatIcon
                                className='h-5 w-5 text-amber-600'
                                aria-hidden='true'
                              />
                            </div>
                          </div>
                          <div className='ml-2'>
                            {form.name}
                            <div className='text-xs text-gray-400'>
                              {form.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='py-3'>
                        <div
                          className={`w-16 rounded py-1 px-2 text-xs capitalize ${
                            form.status === FormStatus.DISABLED
                              ? `bg-red-100 text-red-700`
                              : `bg-emerald-100 text-emerald-700`
                          }`}
                        >
                          {form.status}
                        </div>
                      </td>
                      <td className='py-3 text-xs'>
                        {dayjs.unix(form.dateCreated).format('DD MMM, YYYY')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className='basis-1/3'>ola</div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Forms;
