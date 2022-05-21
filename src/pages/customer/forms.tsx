import CreateModal from '@/components/customer/CreateModal';
import CustomerLayout from '@/components/layout/CustomerLayout';

const Forms = () => {
  return (
    <CustomerLayout>
      <div className='rounded-sm bg-white p-6 shadow'>
        <div className='flex justify-between'>
          <div>
            <h4 className='font-medium'>Forms</h4>
            <p className='text-sm text-gray-500'>Forms built to receive data</p>
          </div>
          <div>
            <CreateModal />
          </div>
        </div>
        <div className='mt-4 rounded border border-gray-100 p-4'></div>
      </div>
    </CustomerLayout>
  );
};

export default Forms;
