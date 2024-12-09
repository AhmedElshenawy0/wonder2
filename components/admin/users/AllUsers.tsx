"use client";
import { User_States } from "@/app/types/types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "@/app/store/api-calls/user-api";
import dynamic from "next/dynamic";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import Link from "next/link";
import UpdateUser from "./UpdateUser";

const GlobaleDots = dynamic(() => import("../GlobaleAdmin/GlobaleDots"));
const TableTitle = dynamic(() => import("../GlobaleAdmin/TableTitle"));

const AllUsers = () => {
  const { users } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  const ProductPerPage: number = 10;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIndex, setFirstIndex] = useState<number>();
  const [lastIndex, setLastIndex] = useState<number>();

  useEffect(() => {
    setFirstIndex((currentPage - 1) * ProductPerPage);
    setLastIndex(currentPage * ProductPerPage);
  }, [currentPage]);

  const totalPages: number = Math.ceil(users.length / ProductPerPage);

  const paginationHandleClick = (e: number) => {
    setCurrentPage(e);
  };

  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ===> Update <===

  const [openUpdatePopup, setOpenUpdatePopup] = useState<boolean>(false);
  const [user, setUser] = useState<number | undefined>();

  const handleUpdate = (id: any) => {
    setOpenUpdatePopup(true);
    setUser(id);
  };

  // ===> DELETE <===

  const handleDeleteUser = (id: number) => {
    try {
      dispatch(deleteUser(id));
      dispatch(fetchUsers());
    } catch (error) {
      console.log("errrrrrrrrror");
    }
  };
  return (
    <div className="relative bg-white rounded-xl mt-16">
      <TableTitle>جدول العملاء</TableTitle>

      <div className="relative rounded-lg bg-white pb-12 pt-[70px] overflow-x-scroll">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs bg-[#003322b2] text-[#ffffff] ">
            <tr className="text-[15px]">
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                الإسم
              </th>
              <th scope="col" className="px-6 py-3">
                الإيميل
              </th>
              <th scope="col" className="px-6 py-3">
                رقم الموبايل
              </th>
              <th scope="col" className="px-6 py-3">
                عمليات الشراء
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.slice(firstIndex, lastIndex).map((ele, i) => (
                <tr
                  key={ele?.id}
                  className="bg-[#ffffff] border-b border-[#00332249]"
                >
                  <td className="px-6 py-4 font-medium">
                    {i + 1 + firstIndex!}
                  </td>
                  <td className="px-6 py-4 text-black font-bold">
                    {ele?.userName}
                  </td>
                  <td className="px-6 py-4 font-medium">{ele?.email}</td>
                  <td className="px-6 py-4 font-medium text-black">
                    {ele?.phone}
                  </td>
                  <td className="px-6 py-4 font-medium text-black">3 عمليات</td>
                  <td className="px-6 py-4 gap-1 font-medium min-w-[160px] text-black">
                    <button className="py-1 px-2 h-[100%] mx-1 ">
                      <Link href={`/admin/products/${ele?.id}`} className="">
                        <LuEye color="green" width={40} />
                      </Link>
                    </button>
                    <button
                      className="py-1 px-2  h-[100%] mx-1 "
                      onClick={() => handleUpdate(ele)}
                    >
                      <CiEdit color="green" width={40} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(ele.id!)}
                      className="py-1 px-2  h-[100%] mx-1 "
                    >
                      <MdOutlineDelete color="green" width={40} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <GlobaleDots
          totalPages={totalPages}
          currentPage={currentPage}
          paginationHandleClick={paginationHandleClick}
        />
      </div>
      {openUpdatePopup && (
        <UpdateUser
          setOpenUpdatePopup={setOpenUpdatePopup}
          openUpdatePopup={openUpdatePopup}
          user={user!}
        />
      )}
    </div>
  );
};

export default AllUsers;
