import { Dialog } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';
import * as React from 'react';

import Authenticator from '@/lib/authentication/authenticator';
import FormsService from '@/lib/forms/forms-service';
import FormsValidator from '@/lib/forms/forms-validator';

import Loading from '@/components/Loading';
import SuccessIcon from '@/components/SuccessIcon';

import { userContext } from '@/context/user-context';

import { db } from '../../../firebase-config';

export enum FormStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export enum FormType {
  POPUP = 'popup',
  LEGACY = 'legacy',
}

export type TalkioForm = {
  userId: string;
  name: string;
  email: string;
  status: FormStatus;
  type: FormType;
  dateCreated: number;
};

enum State {
  Loading,
  Success,
  InProgress,
}

const CreateModal = () => {
  const defaultForm: TalkioForm = {
    userId: '',
    name: '',
    email: '',
    status: FormStatus.ENABLED,
    type: FormType.POPUP,
    dateCreated: 0,
  };
  const authenticator = new Authenticator(useContext(userContext));
  useEffect(() => {
    try {
      const userId = authenticator.getUserId();
      // eslint-disable-next-line no-console
      console.log({ userId });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log({ e });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [state, setState] = useState(State.InProgress);
  const [error, setError] = useState('');
  const formsService = new FormsService(db);
  const formsValidator = new FormsValidator();

  const save = async () => {
    try {
      setState(State.Loading);
      formsValidator.validate(form);
      setForm({
        ...form,
        dateCreated: Math.round(new Date().getTime() / 1000),
      });
      await formsService.save(form);
      setState(State.Success);
    } catch (e) {
      setState(State.InProgress);
      setError((e as Error).message);
    }
  };

  return (
    <>
      <button
        className='inline-block cursor-pointer rounded border border-gray-200 px-6 py-2.5 text-xs font-medium leading-tight text-gray-500 text-white shadow-sm transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-700'
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <div className='flex min-h-full items-center justify-center'>
            <Dialog.Panel className='mx-auto h-[34em]  w-[30em] rounded bg-white p-8'>
              <div
                className={`${
                  state !== State.InProgress &&
                  `flex h-full items-center justify-center`
                }`}
              >
                <Loading isLoading={state === State.Loading} />
                {state === State.Success && <SuccessIcon />}
                {state === State.InProgress && (
                  <div>
                    <h4>Create a new form</h4>
                    <p className='text-sm text-gray-400'>
                      Fill in the details to create a new form.
                    </p>
                    <form>
                      <div className='mt-6 mb-4'>
                        <label
                          htmlFor='email'
                          className='mb-2 block text-sm font-medium'
                        >
                          Name
                        </label>
                        <input
                          type='email'
                          id='email'
                          className={`block w-full rounded-sm border border-gray-300 text-sm text-gray-900 focus:border focus:border-blue-500 focus:outline-2 focus:ring-blue-500 active:border active:border-gray-300 ${
                            error !== '' &&
                            error.includes('name') &&
                            `border-red-700 bg-red-100`
                          }`}
                          placeholder='Form name'
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          required
                        />
                        {error !== '' && error.includes('name') && (
                          <p className='text-xs font-medium text-red-700'>
                            {error}
                          </p>
                        )}
                      </div>
                      <div className='mt-6 mb-4'>
                        <label
                          htmlFor='email'
                          className='mb-2 block text-sm font-medium'
                        >
                          Email to receive form submission
                        </label>
                        <input
                          type='email'
                          id='email'
                          className={`block w-full rounded-sm border border-gray-300 text-sm  text-gray-900 focus:border focus:border-blue-500 focus:outline-2 focus:ring-blue-500 active:border active:border-gray-300 ${
                            error !== '' &&
                            error.includes('email') &&
                            `border-red-700 bg-red-100`
                          }`}
                          placeholder='email@email.com '
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          required
                        />
                        {error !== '' && error.includes('email') && (
                          <p className='text-xs font-medium text-red-700'>
                            {error}
                          </p>
                        )}
                        <small className='text-xs text-gray-500'>
                          <b>Note:</b> This is the email that will receive the
                          submission in the form
                        </small>
                      </div>
                      <div className='mt-6 mb-4'>
                        <label
                          htmlFor='email'
                          className='mb-2 block text-sm font-medium'
                        >
                          Form Type
                        </label>
                        <select
                          className=' block w-full rounded-sm border border-gray-300 text-sm capitalize text-gray-900 focus:border focus:border-blue-500 focus:outline-2 focus:ring-blue-500 active:border active:border-gray-300'
                          value={form.type}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              type: e.target.value as FormType,
                            })
                          }
                        >
                          <option value={FormType.LEGACY}>
                            {FormType.LEGACY}
                          </option>
                          <option value={FormType.POPUP}>
                            {FormType.POPUP}
                          </option>
                        </select>
                      </div>
                      <div className='mt-6 mb-4 grid grid-cols-2 gap-8'>
                        <div>
                          <input
                            type='checkbox'
                            id='status'
                            className='border border-gray-300 checked:bg-blue-500 focus:border focus:border-blue-500 focus:border-pink-500 focus:ring  focus:ring-pink-400/50 active:border active:outline'
                            value={form.status}
                            checked={form.status === FormStatus.ENABLED}
                            onChange={() =>
                              setForm({
                                ...form,
                                status:
                                  form.status === 'disabled'
                                    ? FormStatus.ENABLED
                                    : FormStatus.DISABLED,
                              })
                            }
                          />
                          <label
                            htmlFor='status'
                            className='mb-2 ml-2 text-sm font-medium'
                          >
                            Enabled
                          </label>
                        </div>
                      </div>
                    </form>

                    <div className='mt-10 flex justify-between'>
                      <button
                        className='ml-4 cursor-pointer text-xs font-medium'
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className='inline-block cursor-pointer rounded bg-blue-600 px-6 py-2.5 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
                        onClick={save}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateModal;
