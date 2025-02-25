import adminApi from '../../../redux/fetures/admin/adminApi';

const EmailCollection = () => {
    const { data, isLoading } = adminApi.useGetAllEmailCollectionDataQuery();
    const [deleteEmailCollectionData, { isLoading: emailDeleteIsLoading }] = adminApi.useDeleteEmailCollectionDataMutation()
    console.log(data?.data);


    return (
        <div>

        </div>
    );
};

export default EmailCollection;