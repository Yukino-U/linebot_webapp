// export default function Article({ params }: { params: { userId: string } }) {
//   return <div>{params.userId}</div>;
"use client";
import Link from "next/link";
import { GoogleSpreadsheetService } from "./spreadsheet";
import { Dispatch, useEffect, useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { BsSearchHeart, BsSearchHeartFill } from "react-icons/bs";

const fetchData = async (
  url: string,
  setName: any,
  setValues: any,
  setNum: any
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
    setNum(values[5][0]);
    // console.log(disp_name + "foo");

    // return disp_name,values;
    //   return values;
  } catch (err) {
    console.error(err);
  }
};

export default function Article({ params }: { params: { userId: string } }) {
  console.log("fuga");
  const [name, setName] = useState("");
  const [database, setDatabase] = useState([[]]);
  const [num, setNum] = useState(0);
  const [inputText, setInputText] = useState("");
  const url =
    "https://sheets.googleapis.com/v4/spreadsheets/1A0Atc9_5FyXO775Jpvu-aXwC72RWL-zUdboEGLfkFx4/values/" +
    params.userId +
    "?key=AIzaSyCWex2ftB2_kLwKd54Ywh_fhkAwGDh-164";

  useEffect(() => {
    fetchData(url, setName, setDatabase, setNum);
  }, [url]);

  return (
    <div>
      <div className="bg-[#FEA1A1] h-20 text-white font-bold items-center flex text-2xl px-5">
        Ai Recipe
      </div>
      <div className="p-5">
        <div className="flex items-end gap-2 text-lg font-bold text-black/80 pt-1 pb-3 px-3">
          <div className="border-b px-1 h-full border-black/80">
            {name}さんの登録したレシピ
          </div>
          <GiNotebook size={32}></GiNotebook>
        </div>
        <div className="px-1 py-2 flex gap-2 items-center justify-center">
          <BsSearchHeartFill size={24} color="#FEA1A1"></BsSearchHeartFill>
          <input
            className="p-1 bg-[#FEA1A1]/50 rounded text-black/60"
            value={inputText}
            placeholder="レシピ名検索"
            onChange={(e) => setInputText(e.target.value)}
          ></input>
        </div>

        <div className="bg-white/50 rounded-xl px-3 pb-3 pt-3 ">
          {database.map((item, key) => {
            if (num > key && String(item[4]).includes(inputText)) {
              return (
                <Link href={params.userId + "/" + key} key={key}>
                  <div className="border-b-2 border-[#FEA1A1] border-double text-lg py-2 break-words">
                    ・{item[4]}
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
