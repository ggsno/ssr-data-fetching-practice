import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { AppProps } from "next/app";

const getData = () =>
  fetch("https://httpbin.org/get", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const Home: NextPage<{ isSSRFetchSuccess: string }> = ({
  isSSRFetchSuccess,
}) => {
  const { data } = useQuery(["key"], () => {}, {
    initialData: isSSRFetchSuccess,
  });

  return (
    <>
      <h1>test</h1>
      <div>{data}</div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const data = await getData();
  return {
    props: { isSSRFetchSuccess: data !== undefined ? "success" : "false" },
  };
}
