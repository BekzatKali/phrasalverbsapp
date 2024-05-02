import { getServerSession } from "next-auth";
import AddUser from "./components/AddUser";
import Login from "./components/Login";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/dashboard');
  }
  
  return (
    <main>
      Here we go again, the only options are to be strong and successful. The strength and success are inevitable for me!
      <Login />
    </main>
  );
}
