import adminApi from "../../../redux/fetures/admin/adminApi";

const AddAdvisor = () => {
    const [realEstateAdvisor, { isLoading : addIsLoading }] = adminApi.useRealEstateAdvisorMutation();
    const { data , isLoading} = adminApi.useGetAdvisersDataQuery();
    const [realEstateAdvisordelete, {isLoading : deleteIsLoading}] = adminApi.useRealEstateAdvisordeleteMutation();

    console.log(data?.data);

    return (
        <div>

            <h2>Add advisore page</h2>
            ==========================
            ==========================
            
            <h2>Advisore Form create here</h2>
            {/* =================================== */}
            <h1> show all advisore data in card with delete button </h1>


        </div>
    );
};

export default AddAdvisor;