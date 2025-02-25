import adminApi from '../../../redux/fetures/admin/adminApi';

const EmailCollection = () => {
    const {data} = adminApi.useGetAllEmailCollectionDataQuery();
    console.log(data?.data);

    
    return (
        <div>
            
        </div>
    );
};

export default EmailCollection;