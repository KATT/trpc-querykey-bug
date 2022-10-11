import superjson from "superjson";
import type { InferGetServerSidePropsType } from "next";
import { trpc } from "../utils/trpc";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "../server/trpc/router";
import { createContextInner } from "../server/trpc/context";

function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(props.trpcState);

  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  if (hello.isLoading) {
    console.log("loading");
    return <div>Loading...</div>;
  }

  if (!hello.data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(hello.data, null, 2)}</pre>
    </div>
  );
}

export default Home;

export async function getServerSideProps() {
  const ssgHelper = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({}),
    transformer: superjson,
  });

  await ssgHelper.example.hello.prefetch({ text: "from tRPC" });

  return {
    props: {
      trpcState: ssgHelper.dehydrate(),
    },
  };
}
