import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import { AddressForm } from "./ui/AdressForm";

export default async function AddressPage() {
  const session = await auth();
  const countries = await getCountries();

  if (!session?.user) return null;

  const address = await getUserAddress(session.user.id);

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subTitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoreAddress={address} />
      </div>
    </div>
  );
}
