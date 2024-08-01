// https://tailwindcomponents.com/component/hoverable-table

import { getPaginateUser } from "@/actions";
import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { UserTable } from "./iu/UserTable";

type UserPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function UsersPage({ searchParams }: UserPageProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { ok, users = [], totalPages } = await getPaginateUser(page);

  if (!ok) {
    redirect("/");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UserTable users={users} />
        {totalPages && <Pagination totalPages={totalPages} className="mt-10" />}
      </div>
    </>
  );
}
