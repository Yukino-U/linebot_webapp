// export default function Article({ params }: { params: { userId: string } }) {
//   return <div>{params.userId}</div>;
"use client";
import Link from "next/link";
import { GoogleSpreadsheetService } from "../spreadsheet";
import { Dispatch, useEffect, useState } from "react";
import { GiCook } from "react-icons/gi";
// }
import HashLoader from "react-spinners/HashLoader";
import Image from "next/image";

async function hoge(params?: string) {
  //   const pink = "#FEA1A1";
  //   const spreadService = await GoogleSpreadsheetService.getInstance();
  //   // スプレットシートのタイトルを取得
  //   console.log(spreadService.getTitle())
}

const fetchData = async (
  url: string,
  setName: any,
  setValues: any,
  setLoading: any
) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw Error(`Failed to fetch users: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    const values = data["values"];
    //   setUsers(users);
    const disp_name = values[3][0];
    setName(disp_name);
    setValues(values);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};

export default function Article({
  params,
}: {
  params: { userId: string; key: number };
}) {
  console.log("fuga");
  const [name, setName] = useState("");
  const [database, setDatabase] = useState([[]]);
  const [loading, setLoading] = useState(true);
  const recipekey: number = params.key;
  const url =
    "https://sheets.googleapis.com/v4/spreadsheets/1A0Atc9_5FyXO775Jpvu-aXwC72RWL-zUdboEGLfkFx4/values/" +
    params.userId +
    "?key=AIzaSyCWex2ftB2_kLwKd54Ywh_fhkAwGDh-164";
  // console.log(recipekey)
  useEffect(() => {
    fetchData(url, setName, setDatabase, setLoading);
  }, [url]);
  //   console.log(database);
  //   const how = database[recipekey];
  //   console.log(how);

  return (
    <div>
      <div className="bg-[#FEA1A1] px-3 py-3">
        <Link href={params.userId}>
          <Image src="/airecipe_logo.png" alt="logo" height={40} width={200} />
        </Link>
      </div>
      {loading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <HashLoader color="#FEA1A1" className="" />
        </div>
      ) : (
        <div className="p-3">
          {database.map((item, key) => {
            if (key == recipekey) {
              return (
                <div key={key} className="bg-white/50 rounded-lg p-3">
                  <div className="flex text-lg font-bold text-black/80 items-end pt-1">
                    <div className="border-b border-b-black/80 border-double px-1">
                      {item[4]} の作り方
                    </div>
                    <GiCook size={24}></GiCook>
                  </div>
                  <div className="whitespace-pre-line py-2">{item[5]}</div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
