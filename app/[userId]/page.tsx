// export default function Article({ params }: { params: { userId: string } }) {
//   return <div>{params.userId}</div>;
// }

export default function Article({ params }: { params: { userId: string } }) {
  //   const pink = "#FEA1A1";
  return (
    <div>
      <div className="bg-[#FEA1A1] h-20 text-white font-bold items-center flex text-2xl px-5">
        Ai Recipe
      </div>
      <div className="p-5">
        {" "}
        <div>あなたの登録したレシピ</div>
        <div>{params.userId}</div>
      </div>
    </div>
  );
}
