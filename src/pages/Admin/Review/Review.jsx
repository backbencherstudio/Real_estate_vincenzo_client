import { Avatar, Table } from "antd";
import adminApi from "../../../redux/fetures/admin/adminApi";
import moment from "moment";
import { useState } from "react";
import { url } from "../../../globalConst/const";
import { UserOutlined } from "@ant-design/icons";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "sonner";

const Review = () => {
    const { data , isLoading} = adminApi.useGetAllReviewQuery();
    const [pageSize, setPageSize] = useState(10);
    const [deleteReviewByAdmin] = adminApi.useDeleteReviewByAdminMutation();

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const tableData = data?.data?.map(({ _id, designation, email, image, message, status, createdAt, name }) => ({
        key: _id,
        designation,
        email,
        image,
        message,
        status,
        createdAt,
        name
    }));


    const deleteReviewHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
              const res = await deleteReviewByAdmin(id);
              if (res?.data?.success) {
                toast.success(res?.data?.message);
              }
            }
          });
    }


    const columns = [
        {
            title: "SL",
            dataIndex: "sl",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (text, record) => (
                <div>
                    {record.image ? (
                        <img src={`${url}${record.image}`} className="size-20 rounded-full cursor-pointer" alt="Profile" />
                    ) : (
                        <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer" />
                    )}
                </div>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
        },
        { title: 'Email', dataIndex: 'email' },
        {
            title: 'Review', dataIndex: 'message',
            render: (text) => (
                <div style={{ maxWidth: "500px",  overflow: "hidden", textOverflow: "ellipsis" }} title={text}>
                    {text}
                </div>
            )
        },
        {
            title: "Review Placed Date",
            dataIndex: "createdAt",
            render: (createdAt) => (
                <div>
                    {moment(createdAt).format("DD MMMM YYYY, h:mm A")}
                </div>
            )
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="flex items-center" >

                    <span
                        onClick={() => deleteReviewHandler(record?.key)}
                        className="text-red-500 flex items-center cursor-pointer"
                    >
                        <MdDeleteForever className="text-[30px] ml-1" />
                    </span>


                </div>
            ),
        },

    ];


    return (
        <div>

            <h2 className="text-xl" >All review </h2>

            <Table
                columns={columns}
                dataSource={tableData}
                loading={isLoading}
                scroll={{ x: 800 }}
                pagination={{
                    pageSize: pageSize,
                    pageSizeOptions: ["5", "10", "15", "20", "25"],
                    showSizeChanger: true,
                    onShowSizeChange: handlePageSizeChange,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                }}
            />

        </div>
    );
};

export default Review;