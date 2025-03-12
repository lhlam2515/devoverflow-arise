import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log(session);

  return (
    <div>
      <h1 className="h1-bold text-primary-gradient">
        Welcome to the world of NextJS!
      </h1>
    </div>
  );
};

export default Home;
